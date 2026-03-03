<?php
declare(strict_types=1);

$status = isset($_GET['status']) ? strtolower((string)$_GET['status']) : 'erro';
$success = $status === 'sucesso';
$message = isset($_GET['msg']) ? trim((string)$_GET['msg']) : '';

$title = $success ? 'Formulario enviado com sucesso' : 'Nao foi possivel enviar';
$defaultMessage = $success
    ? 'Recebemos sua solicitacao. Em breve entraremos em contato.'
    : 'Houve um erro no envio. Tente novamente em alguns minutos.';

$displayMessage = $message !== '' ? $message : $defaultMessage;
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title; ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../style/style.css">
    <link rel="icon" href="../imagens/icon.png" type="image/png">
</head>
<body class="narrow">
<div class="page">
    <main class="centralizarX">
        <span id="titulo">Formulario para Automacao</span>
        <hr>
        <section class="status-card <?php echo $success ? 'success' : 'error'; ?>">
            <h1><?php echo $title; ?></h1>
            <p><?php echo htmlspecialchars($displayMessage, ENT_QUOTES, 'UTF-8'); ?></p>
            <a class="btn-status" href="../paginas/formAutomacao.php">Voltar ao formulario</a>
        </section>
    </main>
</div>
</body>
</html>
