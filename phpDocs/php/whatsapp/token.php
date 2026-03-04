<?php
declare(strict_types=1);

require __DIR__ . '/_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    error_response('Metodo nao permitido.', 405);
}

$input = read_json_body();
$boleto = $input['boleto'] ?? null;
if (!is_array($boleto)) {
    error_response('Dados do boleto ausentes.');
}

$tipoEmissao = trim((string)($input['tipoEmissao'] ?? $input['tipo_emissao'] ?? ''));
if ($tipoEmissao === '') {
    error_response('Tipo de emissao nao informado.');
}

$contrato = trim((string)($input['contrato'] ?? ($boleto['contrato'] ?? '')));
if ($contrato === '') {
    error_response('Contrato nao informado.');
}

$celular = normalize_digits((string)($input['celular'] ?? ''));

try {
    $tokenInfo = save_token($config, [
        'boleto' => $boleto,
        'tipo_emissao' => $tipoEmissao,
        'contrato' => $contrato,
        'celular' => $celular,
    ]);
} catch (Throwable $e) {
    error_response('Nao foi possivel gerar o token.', 500);
}

$token = $tokenInfo['token'] ?? '';
$message = "Olá, gostaria de receber meu boleto!\nCódigo {$token}";
$botNumber = normalize_digits((string)($config['bot_number'] ?? ''));
$waUrl = $botNumber !== ''
    ? 'https://wa.me/' . $botNumber . '?text=' . rawurlencode($message)
    : '';

json_response([
    'ok' => true,
    'token' => $token,
    'expires_at' => $tokenInfo['expires_at'] ?? null,
    'message' => $message,
    'whatsapp_url' => $waUrl,
]);
