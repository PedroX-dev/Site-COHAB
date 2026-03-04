<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sitemap COHAB</title>
  <style>
    :root {
      --bg-1: #f1f6ff;
      --bg-2: #e7f0ff;
      --ink: #00244F;
      --accent: #033981;
      --accent-2: #076ADE;
      --branch: #086BC7;
      --card: #ffffff;
      --shadow: 0 12px 30px rgba(0, 36, 79, 0.12);
      --accent-soft: rgba(3, 57, 129, 0.1);
      --accent-soft-strong: rgba(3, 57, 129, 0.18);
      --accent-2-soft: rgba(7, 106, 222, 0.14);
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      color: var(--ink);
      background: radial-gradient(900px 400px at 10% 10%, rgba(7, 106, 222, 0.16) 0%, transparent 65%),
                  radial-gradient(700px 500px at 90% 15%, rgba(3, 57, 129, 0.12) 0%, transparent 60%),
                  linear-gradient(160deg, var(--bg-1), var(--bg-2));
      font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
    }

    .wrap {
      max-width: 1100px;
      margin: 0 auto;
      padding: 40px 24px 64px;
      position: relative;
    }

    .wrap::before,
    .wrap::after {
      content: "";
      position: absolute;
      border-radius: 999px;
      background: var(--accent-soft);
      filter: blur(0.5px);
      z-index: 0;
    }

    .wrap::before {
      width: 220px;
      height: 220px;
      top: -40px;
      right: -40px;
    }

    .wrap::after {
      width: 180px;
      height: 180px;
      bottom: -20px;
      left: -20px;
      background: var(--accent-2-soft);
    }

    header {
      position: relative;
      z-index: 1;
      display: grid;
      gap: 10px;
      margin-bottom: 32px;
    }

    h1 {
      margin: 0;
      font-family: "Copperplate", "Palatino Linotype", serif;
      font-size: clamp(28px, 3vw, 40px);
      letter-spacing: 1px;
      color: var(--accent);
    }

    p {
      margin: 0;
      max-width: 640px;
      font-size: 1.05rem;
      line-height: 1.5;
    }

    .tree-card {
      position: relative;
      z-index: 1;
      background: var(--card);
      border-radius: 18px;
      padding: 28px;
      box-shadow: var(--shadow);
      overflow: hidden;
    }

    .tree {
      list-style: none;
      margin: 0;
      padding-left: 0;
    }

    .tree ul {
      list-style: none;
      margin: 8px 0 0 0;
      padding-left: 26px;
      position: relative;
    }

    .tree li {
      position: relative;
      padding-left: 18px;
      margin: 8px 0;
      animation: fadeUp 0.5s ease both;
    }

    .tree li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.9rem;
      width: 12px;
      border-top: 2px solid var(--branch);
    }

    .tree li::after {
      content: "";
      position: absolute;
      left: 0;
      top: -0.4rem;
      bottom: -0.4rem;
      border-left: 2px solid var(--branch);
    }

    .tree li:last-child::after {
      bottom: 0.9rem;
    }

    .node {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border-radius: 999px;
      background: var(--accent-soft);
      color: var(--accent);
      text-decoration: none;
      font-weight: 600;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }

    .node:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 18px var(--accent-soft-strong);
    }

    .node.section {
      background: var(--accent-2-soft);
      color: var(--accent-2);
      cursor: default;
    }

    .node small {
      font-size: 0.75rem;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      opacity: 0.7;
    }

    @keyframes fadeUp {
      from {
        opacity: 0;
        transform: translateY(6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 720px) {
      .tree-card {
        padding: 20px;
      }

      .tree ul {
        padding-left: 18px;
      }

      .node {
        padding: 6px 10px;
        font-size: 0.95rem;
      }
    }
  </style>
    <link rel="icon" href="../imagens/icon.png" type="image/png">
</head>
<body>
  <div class="wrap">
    <header>
      <h1>Sitemap COHAB</h1>
      <p>Mapa do site em formato de ramificação para navegar rapidamente pelas áreas principais.</p>
    </header>

    <section class="tree-card">
      <ul class="tree">
          <span class="node section"><small>Menu</small>Principal</span>
        <li><a class="node" href="paginaInicial.php" target="_blank">Página Inicial</a></li>
        <li><a class="node" href="paginaMutuarios.php" target="_blank">Página Mutuarios</a></li>
        <li><a class="node" href="paginaPrefeituras.php" target="_blank">Página Prefeituras</a></li>
          <ul>
            <li><a class="node" href="pesquisa.php" target="_blank">Pesquisa</a></li>
            <li><a class="node" href="../sitemap/sitemap.xml" target="_blank">Sitemap XML</a></li>
          </ul>
        </li>

        <li>
          <span class="node section"><small>Menu</small>Atendimento</span>
          <ul>
            <li><a class="node" href="../MenuHorizontal/Atendimento/cadastro.php" target="_blank">Cadastro</a></li>
            <li><a class="node" href="../MenuHorizontal/Atendimento/cohabMaisPerto.php" target="_blank">Cohab Mais Perto</a></li>
            <li><a class="node" href="../MenuHorizontal/Atendimento/comoParticipar.php" target="_blank">Como Participar</a></li>
            <li><a class="node" href="../MenuHorizontal/Atendimento/faleConosco.php" target="_blank">Fale Conosco</a></li>
            <li><a class="node" href="../MenuHorizontal/Atendimento/imoveis.php" target="_blank">Imoveis</a></li>
            <li><a class="node" href="../MenuHorizontal/Atendimento/ouvidoria.php" target="_blank">Ouvidoria</a></li>
            <li><a class="node" href="../MenuHorizontal/Atendimento/perguntas.php" target="_blank">Perguntas</a></li>
          </ul>
        </li>

        <li>
          <span class="node section"><small>Menu</small>Governança</span>
          <ul>
            <li><a class="node" href="../MenuHorizontal/Governanca/acionistas.php" target="_blank">Acionistas</a></li>
            <li><a class="node" href="../MenuHorizontal/Governanca/cartaAnual.php" target="_blank">Carta Anual</a></li>
            <li><a class="node" href="../MenuHorizontal/Governanca/dividendos.php" target="_blank">Dividendos</a></li>
            <li><a class="node" href="../MenuHorizontal/Governanca/estrategia.php" target="_blank">Estratégia</a></li>
            <li><a class="node" href="../MenuHorizontal/Governanca/etica.php" target="_blank">Ética</a></li>
            <li><a class="node" href="../MenuHorizontal/Governanca/integridade.php" target="_blank">Integridade</a></li>
            <li><a class="node" href="../MenuHorizontal/Governanca/lgpd.php" target="_blank">LGPD</a></li>
            <li><a class="node" href="../MenuHorizontal/Governanca/relatorioADM.php" target="_blank">Relatorio ADM</a></li>
            <li><a class="node" href="../MenuHorizontal/Governanca/relatorioAUD.php" target="_blank">Relatorio AUD</a></li>
          </ul>
        </li>

        <li>
          <span class="node section"><small>Menu</small>Institucional</span>
          <ul>
            <li><a class="node" href="../MenuHorizontal/Institucional/conselhos.php" target="_blank">Conselhos</a></li>
            <li><a class="node" href="../MenuHorizontal/Institucional/estrutura.php" target="_blank">Estrutura</a></li>
            <li><a class="node" href="../MenuHorizontal/Institucional/historia.php" target="_blank">História</a></li>
            <li><a class="node" href="../MenuHorizontal/Institucional/legislacao.php" target="_blank">Legislação</a></li>
            <li><a class="node" href="../MenuHorizontal/Institucional/noticias.php" target="_blank">Notícias</a></li>
            <li><a class="node" href="../MenuHorizontal/Institucional/informacoes.php" target="_blank">Informações</a></li>
            <li><a class="node" href="../MenuHorizontal/Institucional/planejamento.php" target="_blank">Planejamento</a></li>
            <li><a class="node" href="../MenuHorizontal/Institucional/quemEquem.php" target="_blank">Quem é Quem</a></li>
          </ul>
        </li>

        <li>
          <span class="node section"><small>Menu</small>Licitacoes</span>
          <ul>
            <li><a class="node" href="../MenuHorizontal/Licitacoes/contratos.php" target="_blank">Contratos</a></li>
            <li><a class="node" href="../MenuHorizontal/Licitacoes/dataroom.php" target="_blank">Data Room</a></li>
            <li><a class="node" href="../MenuHorizontal/Licitacoes/licitacoes.php" target="_blank">Licitações</a></li>
          </ul>
        </li>

        <li>
          <span class="node section"><small>Menu</small>Mutuarios</span>
          <ul>
            <li><a class="node" href="../MenuHorizontal/Mutuarios/bonus.php" target="_blank">Bônus</a></li>
            <li><a class="node" href="../MenuHorizontal/Mutuarios/contrato.php" target="_blank">Contrato</a></li>
            <li><a class="node" href="../MenuHorizontal/Mutuarios/escrituras.php" target="_blank">Escrituras</a></li>
            <li><a class="node" href="../MenuHorizontal/Mutuarios/liquidacao.php" target="_blank">Liquidacao</a></li>
            <li><a class="node" href="../MenuHorizontal/Mutuarios/manual.php" target="_blank">Manual</a></li>
            <li><a class="node" href="../MenuHorizontal/Mutuarios/plantas.php" target="_blank">Plantas</a></li>
            <li><a class="node" href="../MenuHorizontal/Mutuarios/seguros.php" target="_blank">Seguros</a></li>
            <li><a class="node" href="../MenuHorizontal/Mutuarios/transferenciaFincan.php" target="_blank">Transferência de Financiamento</a></li>
          </ul>
        </li>

        <li>
          <span class="node section"><small>Menu</small>Transparência</span>
          <ul>
            <li><a class="node" href="../MenuHorizontal/Transparencia/dados.php" target="_blank">Dados</a></li>
            <li><a class="node" href="../MenuHorizontal/Transparencia/documentos.php" target="_blank">Documentos</a></li>
            <li><a class="node" href="../MenuHorizontal/Transparencia/informacoes.php" target="_blank">Informações</a></li>
            <li><a class="node" href="../MenuHorizontal/Transparencia/prestacaoCohab.php" target="_blank">Prestacao COHAB</a></li>
            <li><a class="node" href="../MenuHorizontal/Transparencia/prestacaoFEH.php" target="_blank">Prestacao FEH</a></li>
            <li><a class="node" href="../MenuHorizontal/Transparencia/remuneracao.php" target="_blank">Remuneração</a></li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
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
