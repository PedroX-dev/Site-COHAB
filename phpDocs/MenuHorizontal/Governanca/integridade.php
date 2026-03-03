<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Programa de Identidade</title>
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
<main id="justificar">
        <span id="titulo">Programa de Integridade</span>
        <hr>
        <p>
            Nosso Programa de Integridade está alinhado à legislação a que a Cohab Minas está submetida, às diretrizes da Política Mineira de Promoção da Integridade e às melhores práticas de Governança, Riscos e Compliance. O Programa de Integridade da Cohab Minas tem como objetivo principal promover uma cultura de ética e de conformidade, mitigando riscos de corrupção, garantindo a transparência e a responsabilidade nos negócios. Os objetivos específicos do Programa de Integridade incluem:
        </p>
        <p>
            <ul>
                <li><b>Promover uma cultura ética:</b> Estabelecer valores e comportamentos éticos como parte da identidade da Cohab Minas, promovendo a integridade em todos os níveis e áreas da empresa.</li> 
                <li><b>Prevenir a corrupção e fraudes:</b> Implementar políticas e controles que reduzam a probabilidade de ocorrência de corrupção, suborno, lavagem de dinheiro e outras formas de fraude.</li>
                <li><b>Garantir a conformidade legal e regulatória:</b> Assegurar que a empresa cumpra todas as leis, regulamentos e padrões éticos relevantes para suas operações, evitando penalidades legais e danos à reputação.</li>
                <li><b>Proteger a reputação da empresa:</b> Manter a imagem positiva da organização perante toda sociedade, demonstrando compromisso com a integridade e a ética.</li>
                <li><b>Melhorar a eficiência e a qualidade:</b> Reduzir desperdícios e ineficiências associadas a práticas antiéticas, promovendo uma cultura de responsabilidade e excelência operacional.</li>
                <li><b>Engajar os colaboradores:</b> Envolver os funcionários no processo de integridade, fornecendo treinamento, comunicação eficaz e canal de denúncias para relatar violações ou preocupações éticas.</li>
                <li><b>Minimizar riscos financeiros e legais:</b> Identificar e mitigar riscos que possam afetar a estabilidade financeira e legal da Cohab Minas, protegendo seus ativos e interesses.</li>
                <li><b>Aumentar a confiança do mercado:</b> Construir confiança entre mutuários, acionistas e parceiros comerciais, destacando o compromisso da empresa com altos padrões éticos e de integridade.</li>
            </ul>
        </p>
        <p>
            Esses objetivos são essenciais para o desenvolvimento e a manutenção do Programa de Integridade eficaz, que contribua para a sustentabilidade e o sucesso de longo prazo da Cohab Minas.
            Organizamos as nossas diretrizes de compliance nos pilares abaixo , que representam a visão de futuro da Cohab Minas para seu ambiente de integridade:
        </p>
            <img src="imagens/Imagem_integridade.jpeg" alt="Imagem_integridade">
        <p>
            <ul>
                <li><b>Comprometimento da Alta Administração:</b> A alta administração e a liderança da Cohab Minas atuam como modelos de ética e integridade, reconhecendo seu papel essencial na condução das atividades com responsabilidade.</li>
                <li><b>Avaliação de Riscos de Compliance:</b> A Cohab Minas tem implementado mecanismos de avaliações periódicas dos riscos de compliance, focando na prevenção de fraudes, corrupção e conflitos de interesse, assegurando que esses riscos sejam tratados e monitorados de forma eficaz.</li>
                <li><b>Políticas e Controles Internos:</b> A Cohab Minas mantém um conjunto de políticas, procedimentos e controles internos que orientam nossos colaboradores a operar em conformidade com as leis e regulamentos, além de nossos compromissos com todas as partes interessadas.</li>
                <li><b>Promoção da Cultura de Compliance:</b> A comunicação clara e os treinamentos regulares na Cohab Minas, aliados ao exemplo da alta administração, são fundamentais para promover e sustentar uma cultura de compliance, por isso, a Cohab aumentará o investimento no treinamento contínuo de nossos colaboradores.</li>
                <li><b>Canais de Consulta e Denúncia:</b> A Cohab Minas está sempre disponível para receber consultas e denúncias, sejam anônimas ou identificadas, tratando cada caso com seriedade e eficiência.</li>
                <li><b>Educação através de Medidas Disciplinares:</b> A Cohab Minas acredita que as medidas disciplinares devem servir como ferramenta educativa, e a responsabilização é essencial para garantir a eficácia e a efetividade dessas medidas.</li>
                <li><b>Transparência nas Diretrizes de Compliance:</b> As diretrizes de compliance da Cohab Minas são disponibilizadas publicamente, orientando também nossos parceiros a adotarem essas diretrizes como referência.</li>
            </ul>
        </p>
        <br>
            <span id="titulo">Plano de Integridade</span>
            <hr>
        <p>
            O <b>Plano de Integridade da Cohab Minas</b>, uma iniciativa estratégica que visa promover uma cultura de ética, 
            transparência e conformidade em todas as suas operações. Ele estabelece diretrizes e ações para prevenir e combater práticas de corrupção, 
            fraudes e conflitos de interesse, garantindo que todos os colaboradores e parceiros atuem de acordo com normas éticas e legais. 
            O plano é fundamentado em pilares como o comprometimento da alta administração, avaliação de riscos, políticas internas, capacitação e canais de denúncia, 
            fortalecendo assim a integridade organizacional e a confiança da sociedade.
            Caso deseje saber mais sobre o Programa, acesso-o abaixo pelo link:
            <ul>
                <li><a href="http://www.cohab.mg.gov.br/wp-content/uploads/2024/11/Plano-de-Integridade-versao-final.pdf" target="_blank">Plano de Integridade</a></li>
            </ul>
        </p>
        <br>
        <span id="titulo">Código de Conduta e Integridade</span>
        <hr>
        <p>
            <h5> Código de Conduta e Integridade </h5>
            O Código de Conduta e Integridade da Cohab Minas representa a Política Anticorrupção, que estabelece princípios éticos e diretrizes para orientar as ações de todos os colaboradores, gestores e parceiros da Companhia. Focado na transparência, respeito e responsabilidade, o documento promove um ambiente de trabalho íntegro e compromissado com a boa governança, prevenindo conflitos de interesse e atos lesivos à administração pública. Ele é uma referência para a construção de relacionamentos éticos e responsáveis com a sociedade e demais stakeholders.
        </p>    
        <p>
            A Cohab Minas estabelece, por meio do seu Código de Conduta e Integridade as diretrizes éticas e de combate à corrupção, à fraude e a outras irregularidades, bem como os procedimentos que devem ser observados e cumpridos por seus colaboradores, administradores, conselheiros, acionistas, fornecedores, prestadores de serviços e por qualquer outra parte que mantenha relação contratual com a Companhia.
        </p>
        <p>
            É vedada a obtenção de qualquer tipo de vantagem indevida em razão do exercício de cargo, mandato, função, emprego ou atividade na Cohab Minas, bem como a prática de qualquer ação ou omissão que viole os deveres de honestidade, imparcialidade, legalidade e lealdade à Companhia, ou que enseje perda patrimonial, desvio, apropriação, malbaratamento ou dilapidação de seus bens ou haveres.
            <ul>
                <li><a href="http://www.cohab.mg.gov.br/wp-content/uploads/2024/03/Codigo-de-Conduta-e-Integridade-Cohab-Minas-3-versao-03-2023.pdf" target="_blank">Código de Conduta e Integridade</a></li>
            </ul>
            <br>
        </p>
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









