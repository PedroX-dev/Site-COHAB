<?php
declare(strict_types=1);

require __DIR__ . '/_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    error_response('Metodo nao permitido.', 405);
}

$token = trim((string)($_GET['token'] ?? ''));
if ($token === '') {
    error_response('Token nao informado.', 400);
}

$info = find_token($config, $token);
if (!$info) {
    error_response('Token nao encontrado.', 404);
}

$expiresAt = (int)($info['expires_at'] ?? 0);
if ($expiresAt > 0 && $expiresAt < time()) {
    error_response('Token expirado.', 410);
}

$boleto = $info['boleto'] ?? null;
if (!is_array($boleto)) {
    error_response('Dados do boleto invalidos.', 422);
}

$tipoEmissao = (string)($info['tipo_emissao'] ?? '');
if ($tipoEmissao === '') {
    error_response('Tipo de emissao ausente.', 422);
}

$pdfBase = (string)($config['pdf_base'] ?? '');
if ($pdfBase === '') {
    error_response('PDF base nao configurado.', 500);
}

$contrato = (string)($boleto['contrato'] ?? '');
$tipoContrato = '';
if ($contrato !== '' && strlen($contrato) >= 3) {
    $tipoContrato = substr($contrato, 0, 3);
}

$url = $pdfBase;
$query = [
    'tipoEmissao' => $tipoEmissao,
];
if ($tipoContrato !== '' && ctype_digit($tipoContrato)) {
    $query['type'] = $tipoContrato;
}
if (strpos($url, '?') !== false) {
    $url .= '&' . http_build_query($query);
} else {
    $url .= '?' . http_build_query($query);
}

try {
    $fields = build_pdf_fields($boleto, $tipoEmissao);
    $pdf = fetch_pdf($url, $fields);
    mark_token_used($config, $token);
} catch (Throwable $e) {
    error_response('Falha ao gerar o PDF.', 502);
}

header('Content-Type: ' . ($pdf['content_type'] ?? 'application/pdf'));
header('Content-Disposition: inline; filename="boleto.pdf"');
echo $pdf['body'];
exit;
