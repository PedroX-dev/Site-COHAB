<?php
declare(strict_types=1);

require __DIR__ . '/_bootstrap.php';

// Verificacao inicial do webhook (ex.: Meta Cloud API)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $mode = (string)($_GET['hub_mode'] ?? $_GET['hub.mode'] ?? '');
    $challenge = (string)($_GET['hub_challenge'] ?? $_GET['hub.challenge'] ?? '');
    $verifyToken = (string)($_GET['hub_verify_token'] ?? $_GET['hub.verify_token'] ?? '');
    $expected = (string)($config['webhook_verify_token'] ?? '');

    if ($mode === 'subscribe' && $verifyToken !== '' && $verifyToken === $expected) {
        header('Content-Type: text/plain; charset=UTF-8');
        echo $challenge;
        exit;
    }
    http_response_code(403);
    echo 'Forbidden';
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    error_response('Metodo nao permitido.', 405);
}

// Recebe mensagens do provedor. Ainda sem integracao de envio.
$payload = read_json_body();

// Tentativa simples de extrair token do texto
$messageText = '';
if (is_array($payload)) {
    $messageText = (string)(
        $payload['message']['text'] ??
        $payload['entry'][0]['changes'][0]['value']['messages'][0]['text']['body'] ??
        ''
    );
}

$token = '';
if ($messageText !== '') {
    if (preg_match('/\\b([A-Z]{3}-[A-Z0-9]{6,})\\b/', strtoupper($messageText), $matches)) {
        $token = $matches[1];
    }
}

// Apenas valida token (sem enviar PDF por WhatsApp por enquanto)
if ($token !== '') {
    $info = find_token($config, $token);
    if ($info) {
        mark_token_used($config, $token);
    }
}

json_response(['ok' => true]);
