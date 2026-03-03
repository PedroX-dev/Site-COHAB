<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../lib/PHPMailer/Exception.php';
require __DIR__ . '/../lib/PHPMailer/PHPMailer.php';
require __DIR__ . '/../lib/PHPMailer/SMTP.php';

// Configuracoes gerais
$to = 'pedro.lopes@ca.mg.gov.br';
$fromEmail = 'no-reply@cohab.mg.gov.br';
$fromName = 'Formulario de Automacao';
$maxTotalSize = 25 * 1024 * 1024; // 25 MB

// Configuracoes SMTP (preencha com os dados reais)
$smtpHost = 'sandbox.smtp.mailtrap.io';
$smtpPort = 587;
$smtpUser = 'a7f367cc8cb09c';
$smtpPass = 'c978582dba79a3';
$smtpSecure = PHPMailer::ENCRYPTION_STARTTLS; // ou PHPMailer::ENCRYPTION_SMTPS

// Timeouts (evita travar indefinidamente)
set_time_limit(30);
ini_set('default_socket_timeout', '15');

function redirectStatus(string $status, string $message = ''): void {
    $params = ['status' => $status];
    if ($message !== '') {
        $params['msg'] = $message;
    }
    header('Location: formAutomacaoStatus.php?' . http_build_query($params));
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirectStatus('erro', 'Metodo nao permitido.');
}

// Helpers
function field(string $name): string {
    $value = filter_input(INPUT_POST, $name, FILTER_UNSAFE_RAW);
    if ($value === null) {
        return '';
    }
    return trim((string)$value);
}

function safeFilename(string $name): string {
    $base = basename($name);
    $safe = preg_replace('/[^A-Za-z0-9._-]/', '_', $base);
    return $safe ?: 'arquivo';
}

function normalizeText(string $text): string {
    $text = preg_replace("/\r\n|\r|\n/", "\n", $text);
    return trim($text ?? '');
}

if ($smtpHost === 'smtp.seudominio.com' || $smtpUser === 'usuario@seudominio.com' || $smtpPass === 'senha') {
    redirectStatus('erro', 'SMTP nao configurado. Atualize as credenciais no servidor.');
}

$nome = field('nome');
$area = field('area');
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL) ?: '';
$celular = field('celular');
$telefone = field('telefone');
$projeto = field('projeto');
$categoria = field('categoria');
$descricao = field('descricao');
$resultados = field('resultados');
$data = field('data');

if (!$nome || !$area || !$email || !$celular || !$projeto || !$categoria || !$descricao || !$resultados || !$data) {
    redirectStatus('erro', 'Preencha todos os campos obrigatorios.');
}

$subject = 'Formulario de Automacao - ' . $projeto;

$bodyLines = [
    "Nome: {$nome}",
    "Area/Departamento: {$area}",
    "Email: {$email}",
    "Celular: {$celular}",
    "Ramal: {$telefone}",
    "Titulo do Projeto: {$projeto}",
    "Categoria: {$categoria}",
    "Descricao detalhada:",
    normalizeText($descricao),
    "Resultados esperados:",
    normalizeText($resultados),
    "Prazo esperado: {$data}",
];

$bodyText = implode("\n", $bodyLines);

// Arquivos
$allowedMimes = [
    'imagens' => [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/heic',
        'image/heif',
        'image/heic-sequence',
        'image/heif-sequence',
    ],
    'videos' => [
        'video/mp4',
        'video/quicktime',
        'video/x-msvideo',
        'video/x-ms-wmv',
    ],
];

$allowedExtensions = [
    'imagens' => ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic', 'heif'],
    'videos' => ['mp4', 'mov', 'avi', 'wmv'],
];

$totalSize = 0;
$attachments = [];
$hasAnyFile = false;

function normalizeFilesArray(array $fileData): array {
    $items = [];
    if (!isset($fileData['name'])) {
        return $items;
    }

    if (is_array($fileData['name'])) {
        $count = count($fileData['name']);
        for ($i = 0; $i < $count; $i++) {
            $items[] = [
                'name' => $fileData['name'][$i] ?? '',
                'type' => $fileData['type'][$i] ?? '',
                'tmp_name' => $fileData['tmp_name'][$i] ?? '',
                'error' => $fileData['error'][$i] ?? UPLOAD_ERR_NO_FILE,
                'size' => $fileData['size'][$i] ?? 0,
            ];
        }
        return $items;
    }

    $items[] = [
        'name' => $fileData['name'] ?? '',
        'type' => $fileData['type'] ?? '',
        'tmp_name' => $fileData['tmp_name'] ?? '',
        'error' => $fileData['error'] ?? UPLOAD_ERR_NO_FILE,
        'size' => $fileData['size'] ?? 0,
    ];

    return $items;
}

foreach (array_keys($allowedMimes) as $fieldName) {
    if (!isset($_FILES[$fieldName])) {
        continue;
    }

    $fileData = $_FILES[$fieldName];
    $files = normalizeFilesArray($fileData);
    if (count($files) === 0) {
        continue;
    }

    foreach ($files as $file) {
        $error = $file['error'] ?? UPLOAD_ERR_NO_FILE;
        if ($error === UPLOAD_ERR_NO_FILE) {
            continue;
        }
        if ($error !== UPLOAD_ERR_OK) {
            redirectStatus('erro', 'Falha ao enviar arquivos.');
        }

        $tmpName = $file['tmp_name'] ?? '';
        $origName = $file['name'] ?? 'arquivo';
        $size = (int)($file['size'] ?? 0);
        if (!is_uploaded_file($tmpName) || $size <= 0) {
            redirectStatus('erro', 'Arquivo invalido.');
        }

        $hasAnyFile = true;
        $totalSize += $size;
        if ($totalSize > $maxTotalSize) {
            redirectStatus('erro', 'Tamanho total dos arquivos excede o limite.');
        }

        $mime = 'application/octet-stream';
        if (class_exists('finfo')) {
            $finfo = new finfo(FILEINFO_MIME_TYPE);
            $mime = $finfo->file($tmpName) ?: $mime;
        } elseif (function_exists('mime_content_type')) {
            $mime = mime_content_type($tmpName) ?: $mime;
        } else {
            $clientType = (string)($file['type'] ?? '');
            if ($clientType !== '') {
                $mime = $clientType;
            }
        }

        $ext = strtolower(pathinfo($origName, PATHINFO_EXTENSION));
        $mimeOk = in_array($mime, $allowedMimes[$fieldName], true);
        $extOk = in_array($ext, $allowedExtensions[$fieldName] ?? [], true);
        if (!$mimeOk && !$extOk) {
            redirectStatus('erro', 'Tipo de arquivo nao permitido.');
        }

        $attachments[] = [
            'path' => $tmpName,
            'name' => safeFilename($origName),
            'mime' => $mime,
        ];
    }
}

if (!$hasAnyFile) {
    redirectStatus('erro', 'Anexe pelo menos um arquivo de apoio (fotos ou video).');
}

try {
    $mail = new PHPMailer(true);
    $mail->SMTPDebug = 0;
    $mail->Debugoutput = function ($str, $level) {
        $logFile = __DIR__ . '/mailtrap-debug.log';
        $line = '[' . date('c') . "] [{$level}] {$str}\n";
        file_put_contents($logFile, $line, FILE_APPEND);
    };
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->Port = $smtpPort;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUser;
    $mail->Password = $smtpPass;
    $mail->SMTPSecure = $smtpSecure;
    $mail->Timeout = 15;
    $mail->SMTPKeepAlive = false;
    $mail->SMTPAutoTLS = true;
    $mail->CharSet = 'UTF-8';

    $mail->setFrom($fromEmail, $fromName);
    $mail->addAddress($to);
    $mail->addReplyTo($email, $nome);

    $mail->Subject = $subject;
    $mail->Body = $bodyText;
    $mail->isHTML(false);

    foreach ($attachments as $attachment) {
        $mail->addAttachment($attachment['path'], $attachment['name'], PHPMailer::ENCODING_BASE64, $attachment['mime']);
    }

    $mail->send();
    redirectStatus('sucesso');
} catch (Exception $e) {
    redirectStatus('erro', 'Falha ao enviar o email. ' . $e->getMessage());
}
