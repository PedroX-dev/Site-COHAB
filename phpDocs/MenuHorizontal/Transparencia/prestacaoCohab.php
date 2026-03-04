<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prestação de Contas COHAB</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../../style/style.css">
    <link rel="icon" href="../../imagens/icon.png" type="image/png">
</head>
<body class="narrow">
<div class="page">

    <!-- Header -->
        <header class="site-header">
        <div class="header-top">
            <div class="header-left">
                <div id="tema">
                    <a href="#" aria-label="Alternar tema claro e escuro">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-circle-half" id="corTema" viewBox="0 0 16 16" aria-hidden="true">
                            <path class="tema-left" d="M8 1 A7 7 0 0 0 8 15 L8 1 Z"></path>
                            <path class="tema-right" d="M8 1 A7 7 0 0 1 8 15 L8 1 Z"></path>
                            <circle class="tema-ring" cx="8" cy="8" r="7" fill="none" stroke-width="1"></circle>
                        </svg>
                    </a>
                </div>
                <div class="header-social">
                                        <div class="redes-sociais">
                        <a href="https://www.instagram.com/cohabminas/" target="_blank" rel="noopener"><img src="../../imagens/redesSociais/instagram.png" alt="Instagram"></a>
                    </div>
                </div>
                                <nav class="header-menu header-menu-left" aria-label="Menu principal esquerdo">
                    <ul class="header-menu-list">
                        <li class="header-menu-item">
                            <button class="menu-all-toggle header-menu-toggle" type="button" aria-expanded="false" aria-controls="menu-completo">
                                <span class="header-menu-label">Menu <i class="bi bi-chevron-down"></i></span>
                            </button>
                            <ul class="submenu">
                                <li><a href="#" data-open-menu-overlay="true">Todos Serviços da Cohab Minas</i></a></li>
                            </ul>
                        </li>
                        <li class="header-menu-item">
                            <a href="#">Sobre a Cohab <i class="bi bi-chevron-down"></i></a>
                            <ul class="submenu">
                                <li><a href="../../MenuHorizontal/Institucional/historia.php">História</a></li>
                                <li><a href="../../MenuHorizontal/Institucional/quemEquem.php">Quem é quem</a></li>
                                <li><a href="../../MenuHorizontal/Institucional/estrutura.php">Estrutura Organizacional</a></li>
                                <li><a href="../../MenuHorizontal/Institucional/conselhos.php">Conselhos</a></li>
                                <li><a href="../../MenuHorizontal/Institucional/planejamento.php">Planejamento Estratégico</a></li>
                                <li><a href="../../MenuHorizontal/Institucional/legislacao.php">Legislação</a></li>
                                <li><a href="../../MenuHorizontal/Institucional/noticias.php">Notícias</a></li>
                                <li><a href="../../MenuHorizontal/Institucional/informacoes.php"> Informações Relevantes</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="header-logos">
                <a href="../../paginas/paginaInicial.php">
                    <img src="../../imagens/logoClaro.svg" alt="logo cohab" id="logo-site" data-light="../../imagens/logoClaro.svg" data-dark="../../imagens/logoEscuro.svg">
                </a>
                <span class="logo-separator" aria-hidden="true">|</span>
                <a href="https://www.mg.gov.br/" target="_blank">
                    <img src="../../imagens/logoGoverno.svg" alt="logo governo" id="logo-governo" data-light="../../imagens/logoGoverno.svg" data-dark="../../imagens/logoGovernoEscuro.svg">
                </a>
            </div>
            <div class="header-right">
                <nav class="header-menu header-menu-right" aria-label="Menu principal direito">
                    <ul class="header-menu-list">
                        <li class="header-menu-item">
                            <a href="#">Mutuários <i class="bi bi-chevron-down"></i></a>
                            <ul class="submenu">
                            <li><a href="../Mutuarios/segundaViaBoletos.php" target="_blank">2ª Via de Boletos</a></li>
                                <li><a href="../../MenuHorizontal/Mutuarios/escrituras.php">Escrituras</a></li>
                                <li><a href="../../MenuHorizontal/Mutuarios/transferenciaFincan.php">Transferência de Financiamento</a></li>
                                <li><a href="../../MenuHorizontal/Mutuarios/seguros.php">Seguros</a></li>
                                <li><a href="../../MenuHorizontal/Mutuarios/plantas.php">Plantas</a></li>
                                <li><a href="../../MenuHorizontal/Mutuarios/liquidacao.php">Liquidação Antecipada</a></li>
                                <li><a href="../../MenuHorizontal/Mutuarios/bonus.php">Bônus de Adimplência</a></li>
                                <li><a href="../../MenuHorizontal/Mutuarios/manual.php">Manual do Mutuário e da Casa Própria</a></li>
                                <li><a href="../../MenuHorizontal/Mutuarios/contrato.php">Contrato Cedido ao FIDC</a></li>
                            </ul>
                        </li>
                        <li class="header-menu-item">
                            <a href="#">Atendimento Geral <i class="bi bi-chevron-down"></i> </a>
                            <ul class="submenu">
                                <li><a href="../../MenuHorizontal/Atendimento/faleConosco.php">Fale Conosco</a></li>
                                <li><a href="../../MenuHorizontal/Atendimento/perguntas.php">Perguntas Frequentes</a></li>
                                <li><a href="../../MenuHorizontal/Atendimento/imoveis.php">Imóveis à Venda</a></li>
                                <li><a href="../../MenuHorizontal/Atendimento/cohabMaisPerto.php">COHAB Mais Perto</a></li>
                                <li><a href="https://maisperto.cohab.mg.gov.br/" target="_blank">COHAB Mais Perto - Probpms</a></li>
                                <li><a href="#">Sala de Imprensa</a></li>
                                <li><a href="../../MenuHorizontal/Atendimento/reurb.php" target="_blank">REURB</a></li>
                                <li><a href="../../MenuHorizontal/Atendimento/ouvidoria.php">Ouvidoria</a></li>
                                <li><a href="../../MenuHorizontal/Atendimento/consultoria.php">Consultoria</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <div class="header-actions">
                    <form class="menu-search menu-search-collapsed" action="#" method="get" aria-label="Buscar no site">
                        <input type="text" name="q" placeholder="Buscar..." />
                        <button type="submit" aria-label="Pesquisar">
                            <span class="menu-search-icon" aria-hidden="true"><img src="../../imagens/busca.svg" data-light="../../imagens/busca.svg" data-dark="../../imagens/buscaEscuro.svg"></span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </header>

    <div id="menu-completo" class="menu-overlay" aria-hidden="true">
        <div class="menu-overlay-panel" role="dialog" aria-modal="true" aria-label="Menu completo">
            <button class="menu-overlay-close" type="button" aria-label="Fechar menu completo">&times;</button>
            <h2 class="menu-overlay-title">Todos Serviços da Cohab Minas</h2>
            
            <ul class="menu-overlay-list">
                <li><a href="../../MenuHorizontal/Institucional/historia.php"> História</a></li>
                <li><a href="../../MenuHorizontal/Institucional/quemEquem.php"> Quem é quem</a></li>
                <li><a href="../../MenuHorizontal/Institucional/estrutura.php"> Estrutura Organizacional</a></li>
                <li><a href="../../MenuHorizontal/Institucional/conselhos.php"> Conselhos</a></li>
                <li><a href="../../MenuHorizontal/Institucional/planejamento.php"> Planejamento Estratégico</a></li>
                <li><a href="../../MenuHorizontal/Institucional/legislacao.php"> Legislação</a></li>
                <li><a href="../../MenuHorizontal/Institucional/noticias.php"> Notícias</a></li>
                <li><a href="../../MenuHorizontal/Institucional/informacoes.php"> Informações Relevantes</a></li>

                <li><a href="../../MenuHorizontal/Transparencia/informacoes.php"> Informações Classificadas e Desclassificadas</a></li>
                <li><a href="../../MenuHorizontal/Transparencia/remuneracao.php"> Remuneração de Pessoal</a></li>
                <li><a href="../../MenuHorizontal/Transparencia/dados.php"> Dados do Orçamento (Relatório de Investimentos)</a></li>
                <li><a href="../../MenuHorizontal/Transparencia/documentos.php"> Documentos</a></li>
                <li><a href="../../MenuHorizontal/Transparencia/prestacaoCohab.php"> Prestação de Contas COHAB</a></li>
                <li><a href="../../MenuHorizontal/Transparencia/prestacaoFEH.php"> Prestação de Contas FEH</a></li>
                <li><a href="../../MenuHorizontal/Transparencia/informacoes.php"> Acesso a Informação</a></li>

                <li><a href="../../MenuHorizontal/Governanca/integridade.php"> Integridade</a></li>
                <li><a href="../../MenuHorizontal/Governanca/etica.php"> Ética</a></li>
                <li><a href="../../MenuHorizontal/Governanca/lgpd.php"> LGPD</a></li>
                <li><a href="http://www.cohab.mg.gov.br/wp-content/uploads/2025/06/Estatuto-Social-28.04.2025.pdf" target="_blank"> Estatuto Social</a></li>
                <li><a href="http://www.cohab.mg.gov.br/wp-content/uploads/2022/11/Estatuto_UCI_2022_2.pdf" target="_blank"> Estatuto de Auditoria</a></li>
                <li><a href="../../MenuHorizontal/Governanca/estrategia.php"> Estratégias de Negócios</a></li>
                <li><a href="../../MenuHorizontal/Governanca/cartaAnual.php"> Carta Anual de Políticas Públicas e Governança Corporativa</a></li>
                <li><a href="../../MenuHorizontal/Governanca/dividendos.php"> Dividendos</a></li>
                <li><a href="../../MenuHorizontal/Governanca/relatorioADM.php"> Relatório de Administração</a></li>
                <li><a href="../../MenuHorizontal/Governanca/relatorioAUD.php"> Relatório Anual de Auditoria Interna</a></li>
                <li><a href="../../MenuHorizontal/Governanca/acionistas.php"> Acionistas</a></li>
                <li><a href="http://www.cohab.mg.gov.br/wp-content/uploads/2025/07/R-458-2025.pdf" target="_blank"> Políticas</a></li>

                <li><a href="http://www.cohab.mg.gov.br/wp-content/uploads/2025/09/RILC_1_alteracao-1.pdf" target="_blank"> Regulamento de Licitações e Contratos</a></li>
                <li><a href="../../MenuHorizontal/Licitacoes/licitacoes.php"> Licitações</a></li>
                <li><a href="http://www.cohab.mg.gov.br/wp-content/uploads/2025/12/2-PLANO-ANUAL-DE-COMPRAS-3.pdf" target="_blank">PAC - Plano Anual de Compras</a></li>
                <li><a href="../../MenuHorizontal/Licitacoes/dataroom.php"> Data Room</a></li>
                <li><a href="#"> Licitantes e/ou Contratados Sancionados</a></li>
                <li><a href="../../MenuHorizontal/Licitacoes/contratos.php"> Contratos</a></li>

                <li><a href="../Mutuarios/segundaViaBoletos.php" target="_blank"> 2ª Via de Boletos</a></li>
                <li><a href="../../MenuHorizontal/Mutuarios/escrituras.php"> Escrituras</a></li>
                <li><a href="../../MenuHorizontal/Mutuarios/transferenciaFincan.php"> Transferência de Financiamento</a></li>
                <li><a href="../../MenuHorizontal/Mutuarios/seguros.php"> Seguros</a></li>
                <li><a href="../../MenuHorizontal/Mutuarios/plantas.php"> Plantas</a></li>
                <li><a href="../../MenuHorizontal/Mutuarios/liquidacao.php"> Liquidação Antecipada</a></li>
                <li><a href="../../MenuHorizontal/Mutuarios/bonus.php"> Bônus de Adimplência</a></li>
                <li><a href="../../MenuHorizontal/Mutuarios/manual.php"> Manual do Mutuário e da Casa Própria</a></li>
                <li><a href="../../MenuHorizontal/Mutuarios/contrato.php"> Contrato Cedido ao FIDC</a></li>

                <li><a href="../../MenuHorizontal/Atendimento/faleConosco.php"> Fale Conosco</a></li>
                <li><a href="../../MenuHorizontal/Atendimento/perguntas.php"> Perguntas Frequentes</a></li>
                <li><a href="../../MenuHorizontal/Atendimento/imoveis.php"> Imóveis à Venda</a></li>
                <li><a href="../../MenuHorizontal/Atendimento/cohabMaisPerto.php"> COHAB Mais Perto</a></li>
                <li><a href="https://maisperto.cohab.mg.gov.br/" target="_blank"> COHAB Mais Perto - Probpms</a></li>
                <li><a href="#"> Sala de Imprensa</a></li>
                <li><a href="../../MenuHorizontal/Atendimento/reurb.php" target="_blank"> REURB</a></li>
                <li><a href="../../MenuHorizontal/Atendimento/ouvidoria.php"> Ouvidoria</a></li>
                <li><a href="../../MenuHorizontal/Atendimento/consultoria.php"> Consultoria</a></li>
            </ul>
        </div>
    </div>

    <nav class="menu-data" aria-hidden="true">
        <ul class="menu-principal">
            <li class="menu-item">
                <a href="#">Sobre a Cohab</a>
                <ul class="submenu">
                    <li><a href="../../MenuHorizontal/Institucional/historia.php"> História</a></li>
                    <li><a href="../../MenuHorizontal/Institucional/quemEquem.php"> Quem é quem</a></li>
                    <li><a href="../../MenuHorizontal/Institucional/estrutura.php"> Estrutura Organizacional</a></li>
                    <li><a href="../../MenuHorizontal/Institucional/conselhos.php"> Conselhos</a></li>
                    <li><a href="../../MenuHorizontal/Institucional/planejamento.php"> Planejamento Estratégico</a></li>
                    <li><a href="../../MenuHorizontal/Institucional/legislacao.php"> Legislação</a></li>
                    <li><a href="../../MenuHorizontal/Institucional/noticias.php"> Notícias</a></li>
                    <li><a href="../../MenuHorizontal/Institucional/informacoes.php"> Informações Relevantes</a></li>
                </ul>
            </li>

            <li class="menu-item">
                <a href="#">Transparência</a>
                <ul class="submenu">
                    <li><a href="../../MenuHorizontal/Transparencia/informacoes.php"> Informações Classificadas e Desclassificadas</a></li>
                    <li><a href="../../MenuHorizontal/Transparencia/remuneracao.php"> Remuneração de Pessoal</a></li>
                    <li><a href="../../MenuHorizontal/Transparencia/dados.php"> Dados do Orçamento (Relatório de Investimentos)</a></li>
                    <li><a href="../../MenuHorizontal/Transparencia/documentos.php"> Documentos</a></li>
                    <li><a href="../../MenuHorizontal/Transparencia/prestacaoCohab.php"> Prestação de Contas COHAB</a></li>
                    <li><a href="../../MenuHorizontal/Transparencia/prestacaoFEH.php"> Prestação de Contas FEH</a></li>
                    <li><a href="../../MenuHorizontal/Transparencia/informacoes.php"> Acesso a Informação</a></li>
                </ul>
            </li>

            <li class="menu-item">
                <a href="#">Governança</a>
                <ul class="submenu">
                    <li class="submenu-item has-submenu">
                        <a href="#">Cohab Íntegra <span class="submenu-arrow" aria-hidden="true">&gt;</span></a>
                        <ul class="submenu submenu-nested">
                            <li><a href="../../MenuHorizontal/Governanca/integridade.php">Integridade</a></li>
                            <li><a href="../../MenuHorizontal/Governanca/etica.php">Ética</a></li>
                        </ul>
                    </li>
                    <li><a href="../../MenuHorizontal/Governanca/lgpd.php"> LGPD</a></li>
                    <li><a href="http://www.cohab.mg.gov.br/wp-content/uploads/2025/06/Estatuto-Social-28.04.2025.pdf" target="_blank"> Estatuto Social</a></li>
                    <li><a href="http://www.cohab.mg.gov.br/wp-content/uploads/2022/11/Estatuto_UCI_2022_2.pdf" target="_blank"> Estatuto de Auditoria</a></li>
                    <li><a href="../../MenuHorizontal/Governanca/estrategia.php"> Estratégias de Negócios</a></li>
                    <li><a href="../../MenuHorizontal/Governanca/cartaAnual.php"> Carta Anual de Políticas Públicas e Governança Corporativa</a></li>
                    <li><a href="../../MenuHorizontal/Governanca/dividendos.php"> Dividendos</a></li>
                    <li><a href="../../MenuHorizontal/Governanca/relatorioADM.php"> Relatório de Administração</a></li>
                    <li><a href="../../MenuHorizontal/Governanca/relatorioAUD.php"> Relatório Anual de Auditoria Interna</a></li>
                    <li><a href="../../MenuHorizontal/Governanca/acionistas.php"> Acionistas</a></li>
                    <li><a href="http://www.cohab.mg.gov.br/wp-content/uploads/2025/07/R-458-2025.pdf" target="_blank"> Políticas</a></li>
                </ul>
            </li>

            <li class="menu-item menu-item-long">
                <a href="#">Licitações e Contratos</a>
                <ul class="submenu">
                    <li><a href="http://www.cohab.mg.gov.br/wp-content/uploads/2025/09/RILC_1_alteracao-1.pdf" target="_blank"> Regulamento de Licitações e Contratos</a></li>
                    <li><a href="../../MenuHorizontal/Licitacoes/licitacoes.php"> Licitações</a></li>
                    <li><a href="http://www.cohab.mg.gov.br/wp-content/uploads/2025/12/2-PLANO-ANUAL-DE-COMPRAS-3.pdf" target="_blank">PAC - Plano Anual de Compras</a></li>
                    <li><a href="../../MenuHorizontal/Licitacoes/dataroom.php"> Data Room</a></li>
                    <li><a href="#"> Licitantes e/ou Contratados Sancionados</a></li>
                    <li><a href="../../MenuHorizontal/Licitacoes/contratos.php"> Contratos</a></li>
                </ul>
            </li>

            <li class="menu-item">
                <a href="#">Mutuários</a>
                <ul class="submenu">
                    <li><a href="../Mutuarios/segundaViaBoletos.php" target="_blank"> 2ª Via de Boletos</a></li>
                    <li><a href="../../MenuHorizontal/Mutuarios/escrituras.php"> Escrituras</a></li>
                    <li><a href="../../MenuHorizontal/Mutuarios/transferenciaFincan.php"> Transferência de Financiamento</a></li>
                    <li><a href="../../MenuHorizontal/Mutuarios/seguros.php"> Seguros</a></li>
                    <li><a href="../../MenuHorizontal/Mutuarios/plantas.php"> Plantas</a></li>
                    <li><a href="../../MenuHorizontal/Mutuarios/liquidacao.php"> Liquidação Antecipada</a></li>
                    <li><a href="../../MenuHorizontal/Mutuarios/bonus.php"> Bônus de Adimplência</a></li>
                    <li><a href="../../MenuHorizontal/Mutuarios/manual.php"> Manual do Mutuário e da Casa Própria</a></li>
                    <li><a href="../../MenuHorizontal/Mutuarios/contrato.php"> Contrato Cedido ao FIDC</a></li>
                </ul>
            </li>

            <li class="menu-item">
                <a href="#">Atendimento Geral</a>
                <ul class="submenu">
                    <li><a href="../../MenuHorizontal/Atendimento/faleConosco.php"> Fale Conosco</a></li>
                    <li><a href="../../MenuHorizontal/Atendimento/perguntas.php"> Perguntas Frequentes</a></li>
                    <li><a href="../../MenuHorizontal/Atendimento/imoveis.php"> Imóveis à Venda</a></li>
                    <li><a href="../../MenuHorizontal/Atendimento/cohabMaisPerto.php"> COHAB Mais Perto</a></li>
                    <li><a href="https://maisperto.cohab.mg.gov.br/" target="_blank"> COHAB Mais Perto - Probpms</a></li>
                    <li><a href="#"> Sala de Imprensa</a></li>
                    <li><a href="../../MenuHorizontal/Atendimento/reurb.php" target="_blank"> REURB</a></li>
                    <li><a href="../../MenuHorizontal/Atendimento/ouvidoria.php"> Ouvidoria</a></li>
                    <li><a href="../../MenuHorizontal/Atendimento/consultoria.php"> Consultoria</a></li>
                </ul>
            </li>
        </ul>
    </nav>
<main>
        <span id="titulo">Prestação de Contas COHAB</span>
        <hr>
            <div class="anos-carousel">
                <div class="ano-conteudo">
                    <div class="ano-header">
                        <button class="ano-prev" aria-label="Ano anterior">‹</button>
                        <h5 id="ano-titulo" aria-live="polite"></h5>
                        <button class="ano-next" aria-label="Próximo ano">›</button>
                    </div>
                    <ul id="ano-lista"></ul>
                </div>
            </div>
        <hr>

    </main>

    <!-- Footer -->
    <footer>
        <div class="footer-inner">
            <div id="footer-logo">
            <img src="../../imagens/logoRodape.svg" alt="Logo Cohab" id="logo-rodape" data-light="../../imagens/logoRodapeX.svg" data-dark="../../imagens/logoRodapeX.svg">
            </div>
            <div id="footer-links">
                <div id="footer-conteudo1">
                    <u>Ínicio</u>
                    <a href="../../paginas/paginaInicial.php">Home</a>
                    <a href="../../paginas/pesquisa.php">Pesquisa</a>
                    <a href="../Institucional/noticias.php">Notícias</a>
                </div>
                <div id="footer-conteudo2">
                    <u>Sobre nós</u>
                    <a href="../Institucional/historia.php">Conheça a COHAB Minas</a>
                    <a href="../Atendimento/faleConosco.php">Contato</a>
                    <a href="../../paginas/sitemap.php" target="_blank">Mapa do Site</a>
                </div>
                <div id="footer-conteudo3">
                    <u>Suporte</u>
                    <a href="../Atendimento/perguntas.php">Perguntas Frequentes/FAQ</a>
                    <a href="../Atendimento/faleConosco.php">Telefones/E-mails</a>
                    <a href="../Atendimento/faleConosco.php">Chat</a>
                </div>
            </div>
        </div>
        <div id="footer-fim">
                <div class="footer-fim-conteudo">
                    <details class="footer-meta-details">
                    <summary>Atualizações e Responsáveis</summary>
                    <div class="footer-meta-content">
                        <span>Ultima atualizacao: <strong id="ultima-atualizacao">--/--/----</strong></span>
                        <span>Historico: <strong id="historico-data">--/--/----</strong> - Resolução de problemas de responsatividade do site.</span>
                        <span>Responsavel pelo conteudo: <strong id="responsavel-conteudo">Pedro Henrique dos Santos Souza Lopes</strong></span>
                    </div>
                    </details>
                    <p>&copy; 2025 Cohab. Todos os direitos reservados.</p>
                </div>
            </div>
    </footer>
</div>

<script src="../../script/script.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<!-- VLibras -->
    <div vw class="enabled">
        <div vw-access-button class="active"></div>
        <div vw-plugin-wrapper>
        <div class="vw-plugin-top-wrapper"></div>
        </div>
    </div>
    <script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
    <script>
        new window.VLibras.Widget('https://vlibras.gov.br/app');
    </script>
</body>
</html>









