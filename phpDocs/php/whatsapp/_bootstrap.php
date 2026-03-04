<?php
declare(strict_types=1);

$config = require __DIR__ . '/config.php';

function json_response(array $data, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function error_response(string $message, int $status = 400): void {
    json_response(['ok' => false, 'message' => $message], $status);
}

function read_json_body(): array {
    $raw = file_get_contents('php://input') ?: '';
    if ($raw !== '') {
        $decoded = json_decode($raw, true);
        if (is_array($decoded)) {
            return $decoded;
        }
    }
    return $_POST ?? [];
}

function normalize_digits(string $value): string {
    return preg_replace('/\D+/', '', $value) ?? '';
}

function ensure_store_file(string $path): void {
    $dir = dirname($path);
    if (!is_dir($dir)) {
        if (!mkdir($dir, 0775, true) && !is_dir($dir)) {
            throw new RuntimeException('Nao foi possivel criar o diretorio de armazenamento.');
        }
    }
    if (!file_exists($path)) {
        file_put_contents($path, json_encode(['tokens' => []], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }
}

function with_store(string $path, callable $handler) {
    ensure_store_file($path);
    $fp = fopen($path, 'c+');
    if ($fp === false) {
        throw new RuntimeException('Nao foi possivel abrir o arquivo de armazenamento.');
    }

    if (!flock($fp, LOCK_EX)) {
        fclose($fp);
        throw new RuntimeException('Nao foi possivel bloquear o arquivo de armazenamento.');
    }

    $contents = stream_get_contents($fp) ?: '';
    $data = json_decode($contents, true);
    if (!is_array($data)) {
        $data = ['tokens' => []];
    }
    if (!isset($data['tokens']) || !is_array($data['tokens'])) {
        $data['tokens'] = [];
    }

    $result = $handler($data);

    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);

    return $result;
}

function cleanup_expired(array &$data, int $now): void {
    foreach ($data['tokens'] as $token => $info) {
        $expires = (int)($info['expires_at'] ?? 0);
        if ($expires > 0 && $expires < $now) {
            unset($data['tokens'][$token]);
        }
    }
}

function generate_token(string $prefix): string {
    $random = strtoupper(bin2hex(random_bytes(4)));
    return $prefix !== '' ? $prefix . '-' . $random : $random;
}

function save_token(array $config, array $payload): array {
    $now = time();
    $ttl = (int)($config['token_ttl_seconds'] ?? 900);
    $prefix = (string)($config['token_prefix'] ?? '');
    $storePath = (string)($config['store_path'] ?? '');

    if ($storePath === '') {
        throw new RuntimeException('Caminho de armazenamento nao configurado.');
    }

    return with_store($storePath, function (&$data) use ($payload, $now, $ttl, $prefix) {
        cleanup_expired($data, $now);
        $token = '';
        do {
            $token = generate_token($prefix);
        } while (isset($data['tokens'][$token]));

        $data['tokens'][$token] = [
            'token' => $token,
            'created_at' => $now,
            'expires_at' => $now + $ttl,
            'status' => 'active',
            'celular' => $payload['celular'] ?? '',
            'contrato' => $payload['contrato'] ?? '',
            'tipo_emissao' => $payload['tipo_emissao'] ?? '',
            'boleto' => $payload['boleto'] ?? [],
        ];

        return $data['tokens'][$token];
    });
}

function find_token(array $config, string $token): ?array {
    $storePath = (string)($config['store_path'] ?? '');
    if ($storePath === '' || $token === '') {
        return null;
    }

    return with_store($storePath, function (&$data) use ($token) {
        return $data['tokens'][$token] ?? null;
    });
}

function mark_token_used(array $config, string $token): void {
    $storePath = (string)($config['store_path'] ?? '');
    if ($storePath === '' || $token === '') {
        return;
    }

    with_store($storePath, function (&$data) use ($token) {
        if (isset($data['tokens'][$token])) {
            $data['tokens'][$token]['used_at'] = time();
            $data['tokens'][$token]['status'] = 'used';
        }
        return null;
    });
}

function build_pdf_fields(array $boleto, string $tipoEmissao): array {
    $fields = [];
    $add = function (string $name, $value) use (&$fields) {
        $fields[] = [$name, $value ?? ''];
    };

    $texto0 = $boleto['texto'][0] ?? ($boleto['texto']['0'] ?? '');
    $texto1 = $boleto['texto'][1] ?? ($boleto['texto']['1'] ?? '');

    $add('contrato', $boleto['contrato'] ?? '');
    $add('nome', $boleto['nome'] ?? '');
    $add('bairro', $boleto['bairro'] ?? '');
    $add('endereco', $boleto['endereco'] ?? '');
    $add('cep', $boleto['cep'] ?? '');
    $add('municipio', $boleto['municipio'] ?? '');
    $add('uf', $boleto['uf'] ?? '');
    $add('valor_total', $boleto['valor_total'] ?? '');
    $add('texto[]', $texto0);
    $add('texto[]', $texto1);
    $add('data_validade', $boleto['data_validade'] ?? '');
    $add('data_documento', $boleto['data_documento'] ?? '');
    $add('especie_doc', $boleto['especie_doc'] ?? '');
    $add('data_processamento', $boleto['data_processamento'] ?? '');
    $add('codigo_cedente', $boleto['codigo_cedente'] ?? ($boleto['codigoCedente'] ?? ''));
    $add('moeda', $boleto['moeda'] ?? '');
    $add('num_rec', $boleto['num_rec'] ?? '');
    $add('linha_digitavel', $boleto['linha_digitavel'] ?? '');

    if ((int)$tipoEmissao === 2) {
        $prestacoes = $boleto['prestacoes'] ?? [];
        if (is_array($prestacoes)) {
            foreach ($prestacoes as $item) {
                if (!is_array($item)) {
                    continue;
                }
                $add('prt[]', $item['prt'] ?? '');
                $add('vencimento[]', $item['vencimento'] ?? '');
                $add('encargo[]', $item['encargo'] ?? '');
                $add('dif_prt[]', $item['dif_prt'] ?? '');
                $add('fgts[]', $item['fgts'] ?? '');
                $add('acres_abat[]', $item['acres_abat'] ?? '');
                $add('onus_atraso[]', $item['onus_atraso'] ?? '');
                $add('total[]', $item['total'] ?? '');
            }
        }
    } else {
        $dados = $boleto['dadosImpressao'] ?? [];
        if (is_array($dados)) {
            foreach ($dados as $item) {
                if (!is_array($item)) {
                    continue;
                }
                $add('conteudo[]', $item['conteudo'] ?? '');
                $add('linha[]', $item['linha'] ?? '');
                $add('coluna[]', $item['coluna'] ?? '');
                $add('fonte[]', $item['fonte'] ?? '');
            }
        }
    }

    $add('codbarra', $boleto['codbarra'] ?? '');

    return $fields;
}

function build_query_from_fields(array $fields): string {
    $pairs = [];
    foreach ($fields as $field) {
        if (!is_array($field) || count($field) < 2) {
            continue;
        }
        [$name, $value] = $field;
        $pairs[] = rawurlencode((string)$name) . '=' . rawurlencode((string)$value);
    }
    return implode('&', $pairs);
}

function fetch_pdf(string $url, array $fields): array {
    $ch = curl_init($url);
    if ($ch === false) {
        throw new RuntimeException('Nao foi possivel iniciar requisicao para gerar o PDF.');
    }

    $queryString = build_query_from_fields($fields);

    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT => 20,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/x-www-form-urlencoded; charset=UTF-8',
            'Accept: application/pdf',
        ],
        CURLOPT_POSTFIELDS => $queryString,
    ]);

    $body = curl_exec($ch);
    $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $contentType = (string)curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($body === false || $status < 200 || $status >= 300) {
        $detail = $error ?: 'Falha ao gerar PDF.';
        throw new RuntimeException($detail);
    }

    return [
        'body' => $body,
        'content_type' => $contentType ?: 'application/pdf',
    ];
}
