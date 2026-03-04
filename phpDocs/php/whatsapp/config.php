<?php
declare(strict_types=1);

return [
    // Numero do bot WhatsApp (formato internacional, apenas digitos)
    'bot_number' => '553135014600',

    // Prefixo e validade do token
    'token_prefix' => 'BOL',
    'token_ttl_seconds' => 15 * 60,

    // Arquivo de armazenamento simples (JSON)
    'store_path' => __DIR__ . '/../../dados/whatsapp_tokens.json',

    // Endpoint de geracao do PDF da Elogica
    'pdf_base' => 'https://segundaviacohabminas.elogica.info/pdf/',

    // Verificacao de webhook (quando integrar com o provedor)
    'webhook_verify_token' => 'CHANGE_ME',
];
