document.addEventListener('DOMContentLoaded', () => {

  const getSiteRoot = () => {
    const path = window.location.pathname || '/';
    const lower = path.toLowerCase();
    const marker = '/menuhorizontal/';
    const idx = lower.indexOf(marker);
    const rootPath = idx !== -1
      ? path.slice(0, idx + 1)
      : (path.endsWith('/') ? path : path.replace(/[^/]+$/, ''));
    return new URL(rootPath || '/', window.location.href);
  };

  const ORIG_STORAGE_KEY = 'cohab-origem';
  const ORIG_PAGES = {
    mutuarios: 'paginaMutuarios.html',
    prefeituras: 'paginaPrefeituras.html',
    inicial: 'paginaInicial.html',
  };

  const normalizeOrigem = (value) => {
    const raw = (value || '').toString().trim().toLowerCase();
    if (!raw) return '';
    if (raw === 'mutuarios' || raw === 'mutuario') return 'mutuarios';
    if (raw === 'prefeituras' || raw === 'prefeitura') return 'prefeituras';
    if (raw === 'inicial' || raw === 'geral' || raw === 'acesso-geral') return 'inicial';
    return '';
  };

  const inferOrigemFromPath = () => {
    const path = (window.location.pathname || '').toLowerCase();
    if (path.endsWith('/paginamutuarios.html')) return 'mutuarios';
    if (path.endsWith('/paginaprefeituras.html')) return 'prefeituras';
    if (path.endsWith('/paginainicial.html')) return 'inicial';
    return '';
  };

  const definirOrigem = () => {
    const params = new URLSearchParams(window.location.search || '');
    const fromParam = normalizeOrigem(params.get('orig'));
    if (fromParam) {
      localStorage.setItem(ORIG_STORAGE_KEY, fromParam);
      return;
    }
    if (!localStorage.getItem(ORIG_STORAGE_KEY)) {
      const inferred = inferOrigemFromPath();
      if (inferred) localStorage.setItem(ORIG_STORAGE_KEY, inferred);
    }
  };

  const atualizarLinkLogo = () => {
    const logoImg = document.getElementById('logo-site');
    const logoLink = logoImg?.closest('a');
    if (!logoLink) return;
    const origem = normalizeOrigem(localStorage.getItem(ORIG_STORAGE_KEY));
    if (!origem) return;
    const root = getSiteRoot();
    const alvo = ORIG_PAGES[origem] || ORIG_PAGES.inicial;
    logoLink.href = new URL(alvo, root).toString();
  };

  const filtroContainer = document.createElement('div');
  filtroContainer.id = 'filtro-site';
  while (document.body.firstChild) {
    filtroContainer.appendChild(document.body.firstChild);
  }
  document.body.appendChild(filtroContainer);

  // Tema (texto claro/escuro)
  const tema = document.getElementById('tema');
  const temaLabel = tema?.querySelector('.label');
  const temaBotao = tema?.querySelector('a');
  const logos = Array.from(document.querySelectorAll('img[data-light][data-dark]'));
  let temaAtual = 'claro';
  const TEMA_STORAGE_KEY = 'cohab-tema';

  const carregarTema = () => {
    const salvo = localStorage.getItem(TEMA_STORAGE_KEY);
    if (salvo === 'claro' || salvo === 'escuro') {
      temaAtual = salvo;
    }
  };

  const salvarTema = () => {
    localStorage.setItem(TEMA_STORAGE_KEY, temaAtual);
  };

  const atualizarTemaTexto = () => {
    if (!temaLabel) return;
    temaLabel.innerHTML = `Tema <span class="tema-claro ${temaAtual === 'claro' ? 'ativo' : ''}">Claro</span>/<span class="tema-escuro ${temaAtual === 'escuro' ? 'ativo' : ''}">Escuro</span>`;
  };

  const atualizarLogos = () => {
    const usarEscuro =
      temaAtual === 'escuro' || document.body.classList.contains('tema-contraste');

    logos.forEach((img) => {
      const claro = img.dataset.light;
      const escuro = img.dataset.dark;
      if (usarEscuro && escuro) {
        img.src = escuro;
      } else if (claro) {
        img.src = claro;
      }
    });
  };

  const aplicarTema = () => {
    document.body.classList.toggle('tema-escuro', temaAtual === 'escuro');
    atualizarLogos();
    atualizarTemaTexto();
  };

  temaBotao?.addEventListener('click', (e) => {
    e.preventDefault();
    temaAtual = temaAtual === 'claro' ? 'escuro' : 'claro';
    aplicarTema();
    salvarTema();
  });

  carregarTema();
  aplicarTema();

  definirOrigem();
  atualizarLinkLogo();

  // Menu completo (overlay)
  const menuOverlay = document.getElementById('menu-completo');
  const menuToggle = document.querySelector('.menu-all-toggle');
  const menuClose = menuOverlay?.querySelector('.menu-overlay-close');

  const montarMenuOverlayColunas = () => {
    if (!menuOverlay) return;
    const menuPrincipal = document.querySelector('.menu-principal');
    if (!menuPrincipal) return;

    const tituloOverlay = menuOverlay.querySelector('.menu-overlay-title');
    let colunas = menuOverlay.querySelector('.menu-overlay-columns');

    if (!colunas) {
      colunas = document.createElement('div');
      colunas.className = 'menu-overlay-columns';
      tituloOverlay?.insertAdjacentElement('afterend', colunas);
    }

    const listaAntiga = menuOverlay.querySelector('.menu-overlay-list');
    if (listaAntiga) listaAntiga.remove();

    colunas.innerHTML = '';

    const itens = Array.from(menuPrincipal.querySelectorAll(':scope > .menu-item'));
    itens.forEach((item, index) => {
      const titulo = item.querySelector(':scope > a')?.textContent?.trim();
      const submenu = item.querySelector(':scope > .submenu');
      if (!titulo || !submenu) return;

      const section = document.createElement('section');
      section.className = 'menu-overlay-column';

      const h3 = document.createElement('h3');
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'menu-overlay-toggle';
      toggle.setAttribute('aria-expanded', 'false');
      const titleSpan = document.createElement('span');
      titleSpan.textContent = titulo;
      const icon = document.createElement('i');
      icon.className = 'bi bi-caret-down-fill';
      icon.setAttribute('aria-hidden', 'true');
      toggle.appendChild(titleSpan);
      toggle.appendChild(icon);
      h3.appendChild(toggle);
      section.appendChild(h3);

      const ul = document.createElement('ul');
      ul.className = 'menu-overlay-group';
      ul.id = `menu-overlay-group-${index}`;
      toggle.setAttribute('aria-controls', ul.id);

      const itensSubmenu = Array.from(submenu.querySelectorAll(':scope > li'));
      itensSubmenu.forEach((li) => {
        const nested = li.querySelector(':scope > .submenu');
        if (nested) {
          const nestedLinks = Array.from(nested.querySelectorAll('a'));
          nestedLinks.forEach((link) => {
            const label = link.textContent?.trim();
            if (!label) return;
            const itemLi = document.createElement('li');
            const a = document.createElement('a');
            a.href = link.getAttribute('href') || '#';
            a.textContent = label;
            const target = link.getAttribute('target');
            const rel = link.getAttribute('rel');
            if (target) a.target = target;
            if (rel) a.rel = rel;
            itemLi.appendChild(a);
            ul.appendChild(itemLi);
          });
          return;
        }

        const link = li.querySelector(':scope > a');
        const label = link?.textContent?.trim();
        if (!link || !label) return;
        const itemLi = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.getAttribute('href') || '#';
        a.textContent = label;
        const target = link.getAttribute('target');
        const rel = link.getAttribute('rel');
        if (target) a.target = target;
        if (rel) a.rel = rel;
        itemLi.appendChild(a);
        ul.appendChild(itemLi);
      });

      section.appendChild(ul);
      colunas.appendChild(section);
    });

    const toggles = Array.from(menuOverlay.querySelectorAll('.menu-overlay-toggle'));
    const prefersMobileOverlay = () => window.matchMedia && window.matchMedia('(max-width: 900px)').matches;

    const syncAccordionState = () => {
      const mobile = prefersMobileOverlay();
      toggles.forEach((btn) => {
        const section = btn.closest('.menu-overlay-column');
        if (!section) return;
        if (mobile) {
          btn.setAttribute('aria-expanded', 'false');
          section.classList.remove('is-open');
        } else {
          btn.setAttribute('aria-expanded', 'true');
          section.classList.add('is-open');
        }
      });
    };

    toggles.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (!prefersMobileOverlay()) return;
        const section = btn.closest('.menu-overlay-column');
        if (!section) return;
        const isOpen = section.classList.contains('is-open');
        section.classList.toggle('is-open', !isOpen);
        btn.setAttribute('aria-expanded', String(!isOpen));
      });
    });

    syncAccordionState();
    if (window.matchMedia) {
      const mq = window.matchMedia('(max-width: 900px)');
      if (mq.addEventListener) {
        mq.addEventListener('change', syncAccordionState);
      } else if (mq.addListener) {
        mq.addListener(syncAccordionState);
      }
    }
  };

  montarMenuOverlayColunas();

  const abrirMenuCompleto = () => {
    if (!menuOverlay || !menuToggle) return;
    menuOverlay.classList.add('aberto');
    menuOverlay.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-overlay-open');
  };

  const fecharMenuCompleto = () => {
    if (!menuOverlay || !menuToggle) return;
    menuOverlay.classList.remove('aberto');
    menuOverlay.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-overlay-open');
  };

  const menuOverlayTriggers = document.querySelectorAll('[data-open-menu-overlay=\"true\"]');
  menuOverlayTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      abrirMenuCompleto();
    });
  });

  menuToggle?.addEventListener('click', (e) => {
    e.preventDefault();
    if (menuOverlay?.classList.contains('aberto')) {
      fecharMenuCompleto();
    } else {
      abrirMenuCompleto();
    }
  });

  menuClose?.addEventListener('click', fecharMenuCompleto);

  menuOverlay?.addEventListener('click', (e) => {
    if (e.target === menuOverlay) fecharMenuCompleto();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharMenuCompleto();
  });

  
  // Acessibilidade (menu)
  const CONTRASTE_STORAGE_KEY = 'cohab-contraste';
  const contrasteBotao = document.createElement('button');
  contrasteBotao.type = 'button';
  contrasteBotao.className = 'contraste-toggle';
  contrasteBotao.setAttribute('aria-pressed', 'false');
  contrasteBotao.setAttribute('aria-label', 'Ativar alto contraste');
  contrasteBotao.innerHTML = `
    <span class="contraste-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M12 3a9 9 0 0 1 0 18"></path>
      </svg>
    </span>
    <span class="label">Alto contraste</span>
  `;

  const FONTE_STORAGE_KEY = 'cohab-fonte';
  const NEGRITO_STORAGE_KEY = 'cohab-negrito';
  const ESPACO_LETRAS_STORAGE_KEY = 'cohab-espaco-letras';
  const ESPACO_LINHAS_STORAGE_KEY = 'cohab-espaco-linhas';
  const FONTE_ESTILO_STORAGE_KEY = 'cohab-fonte-estilo';
  const DALTONISMO_STORAGE_KEY = 'cohab-daltonismo';
  const INTENSIDADE_STORAGE_KEY = 'cohab-intensidade-cores';
  const LEITOR_STORAGE_KEY = 'cohab-leitor-ao-clicar';
  const MODO_LEITURA_STORAGE_KEY = 'cohab-modo-leitura';

  const fonteMaisBotao = document.createElement('button');
  fonteMaisBotao.type = 'button';
  fonteMaisBotao.className = 'acessibilidade-botao fonte-mais';
  fonteMaisBotao.setAttribute('aria-label', 'Aumentar tamanho da fonte');
  fonteMaisBotao.innerHTML = '<span class="fonte-icone" aria-hidden="true">+</span><span class="label">Aumentar Fonte</span>';

  const fonteMenosBotao = document.createElement('button');
  fonteMenosBotao.type = 'button';
  fonteMenosBotao.className = 'acessibilidade-botao fonte-menos';
  fonteMenosBotao.setAttribute('aria-label', 'Diminuir tamanho da fonte');
  fonteMenosBotao.innerHTML = '<span class="fonte-icone" aria-hidden="true">-</span><span class="label">Diminuir Fonte</span>';

  const fonteControls = document.createElement('div');
  fonteControls.className = 'acessibilidade-fonte';
  fonteControls.appendChild(fonteMaisBotao);
  fonteControls.appendChild(fonteMenosBotao);

  const negritoBotao = document.createElement('button');
  negritoBotao.type = 'button';
  negritoBotao.className = 'acessibilidade-botao toggle-negrito';
  negritoBotao.setAttribute('aria-pressed', 'false');
  negritoBotao.setAttribute('aria-label', 'Letras destacadas');
  negritoBotao.textContent = 'Letras destacadas';

  const espacoLetrasBotao = document.createElement('button');
  espacoLetrasBotao.type = 'button';
  espacoLetrasBotao.className = 'acessibilidade-botao toggle-espaco-letras';
  espacoLetrasBotao.setAttribute('aria-pressed', 'false');
  espacoLetrasBotao.setAttribute('aria-label', 'Espacamento entre letras');
  espacoLetrasBotao.textContent = 'Espacamento entre letras';

  const espacoLinhasBotao = document.createElement('button');
  espacoLinhasBotao.type = 'button';
  espacoLinhasBotao.className = 'acessibilidade-botao toggle-espaco-linhas';
  espacoLinhasBotao.setAttribute('aria-pressed', 'false');
  espacoLinhasBotao.setAttribute('aria-label', 'Espacamento entre linhas');
  espacoLinhasBotao.textContent = 'Espacamento entre linhas';

  const fonteEstiloBotao = document.createElement('button');
  fonteEstiloBotao.type = 'button';
  fonteEstiloBotao.className = 'acessibilidade-botao toggle-fonte-estilo';
  fonteEstiloBotao.setAttribute('aria-pressed', 'false');
  fonteEstiloBotao.setAttribute('aria-label', 'Fonte acessivel');
  fonteEstiloBotao.textContent = 'Fonte acessivel';

  const daltonismoSection = document.createElement('div');
  daltonismoSection.className = 'acessibilidade-daltonismo';

  const daltonismoLabel = document.createElement('span');
  daltonismoLabel.className = 'acessibilidade-subtitulo';
  daltonismoLabel.textContent = 'Daltonismo';

  const daltonismoBotoesWrap = document.createElement('div');
  daltonismoBotoesWrap.className = 'acessibilidade-daltonismo-botoes';

  const criarBotaoDaltonismo = (modo, texto) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'acessibilidade-botao daltonismo-botao';
    botao.dataset.daltonismo = modo;
    botao.setAttribute('aria-pressed', 'false');
    botao.setAttribute('aria-label', `Modo daltonico: ${texto}`);
    botao.textContent = texto;
    daltonismoBotoesWrap.appendChild(botao);
    return botao;
  };

  const daltonismoNormalBotao = criarBotaoDaltonismo('normal', 'Normal');
  const daltonismoDeuteranopiaBotao = criarBotaoDaltonismo('deuteranopia', 'Deuteranopia');
  const daltonismoProtanopiaBotao = criarBotaoDaltonismo('protanopia', 'Protanopia');
  const daltonismoTritanopiaBotao = criarBotaoDaltonismo('tritanopia', 'Tritanopia');

  daltonismoSection.appendChild(daltonismoLabel);
  daltonismoSection.appendChild(daltonismoBotoesWrap);

  const daltonismoBotoes = [
    daltonismoNormalBotao,
    daltonismoDeuteranopiaBotao,
    daltonismoProtanopiaBotao,
    daltonismoTritanopiaBotao,
  ];

  const intensidadeSection = document.createElement('div');
  intensidadeSection.className = 'acessibilidade-intensidade';

  const intensidadeLabel = document.createElement('span');
  intensidadeLabel.className = 'acessibilidade-subtitulo';
  intensidadeLabel.textContent = 'Intensidade de cores';

  const intensidadeBotoesWrap = document.createElement('div');
  intensidadeBotoesWrap.className = 'acessibilidade-intensidade-botoes';

  const criarBotaoIntensidade = (modo, texto) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'acessibilidade-botao intensidade-botao';
    botao.dataset.intensidade = modo;
    botao.setAttribute('aria-pressed', 'false');
    botao.setAttribute('aria-label', `Intensidade de cores: ${texto}`);
    botao.textContent = texto;
    intensidadeBotoesWrap.appendChild(botao);
    return botao;
  };

  const intensidadeNormalBotao = criarBotaoIntensidade('normal', 'Normal');
  const intensidadeSaturadaBotao = criarBotaoIntensidade('saturada', 'Saturada');
  const intensidadePretoBrancoBotao = criarBotaoIntensidade('preto-branco', 'Preto e branco');

  intensidadeSection.appendChild(intensidadeLabel);
  intensidadeSection.appendChild(intensidadeBotoesWrap);

  const intensidadeBotoes = [
    intensidadeNormalBotao,
    intensidadeSaturadaBotao,
    intensidadePretoBrancoBotao,
  ];

  const leituraSection = document.createElement('div');
  leituraSection.className = 'acessibilidade-leitura';

  const leituraLabel = document.createElement('span');
  leituraLabel.className = 'acessibilidade-subtitulo';
  leituraLabel.textContent = 'Leitura';

  const leituraBotoesWrap = document.createElement('div');
  leituraBotoesWrap.className = 'acessibilidade-leitura-botoes';

  const criarBotaoLeitura = (classe, texto, aria) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = `acessibilidade-botao leitura-botao ${classe}`;
    botao.setAttribute('aria-label', aria || texto);
    botao.textContent = texto;
    leituraBotoesWrap.appendChild(botao);
    return botao;
  };

  const leituraPaginaBotao = criarBotaoLeitura('leitura-pagina', 'Ler pagina', 'Ler pagina atual');
  const leituraSelecaoBotao = criarBotaoLeitura('leitura-selecao', 'Ler seleção', 'Ler texto selecionado');
  const leituraPausarBotao = criarBotaoLeitura('leitura-pausar', 'Pausar', 'Pausar leitura');
  const leituraPararBotao = criarBotaoLeitura('leitura-parar', 'Parar', 'Parar leitura');
  const leituraCliqueBotao = criarBotaoLeitura('leitura-clique', 'Ler ao clicar', 'Alternar leitura ao clicar');
  leituraCliqueBotao.setAttribute('aria-pressed', 'false');

  const modoLeituraBotao = criarBotaoLeitura('modo-leitura', 'Modo leitura', 'Alternar modo leitura');
  modoLeituraBotao.setAttribute('aria-pressed', 'false');

  leituraSection.appendChild(leituraLabel);
  leituraSection.appendChild(leituraBotoesWrap);

  const acessibilidadeWidget = document.createElement('div');
  acessibilidadeWidget.className = 'acessibilidade-widget';

  const acessibilidadeToggle = document.createElement('button');
  acessibilidadeToggle.type = 'button';
  acessibilidadeToggle.className = 'acessibilidade-toggle';
  acessibilidadeToggle.setAttribute('aria-expanded', 'false');
  acessibilidadeToggle.setAttribute('aria-controls', 'acessibilidade-menu');
  acessibilidadeToggle.setAttribute('aria-label', 'Abrir menu de acessibilidade');
  acessibilidadeToggle.innerHTML = `
    <span class="acessibilidade-label">Opções de Acessibilidade</span>
    <span class="acessibilidade-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="4" r="2"></circle>
        <path d="M4 7h16"></path>
        <path d="M12 7v6"></path>
        <path d="M8 20l4-7 4 7"></path>
      </svg>
    </span>
  `;

  const acessibilidadeMenu = document.createElement('div');
  acessibilidadeMenu.className = 'acessibilidade-menu';
  acessibilidadeMenu.id = 'acessibilidade-menu';
  acessibilidadeMenu.appendChild(fonteControls);
  acessibilidadeMenu.appendChild(negritoBotao);
  acessibilidadeMenu.appendChild(espacoLetrasBotao);
  acessibilidadeMenu.appendChild(espacoLinhasBotao);
  acessibilidadeMenu.appendChild(fonteEstiloBotao);
  acessibilidadeMenu.appendChild(daltonismoSection);
  acessibilidadeMenu.appendChild(intensidadeSection);
  acessibilidadeMenu.appendChild(leituraSection);
  acessibilidadeMenu.appendChild(contrasteBotao);

  acessibilidadeWidget.appendChild(acessibilidadeToggle);
  acessibilidadeWidget.appendChild(acessibilidadeMenu);
  document.body.appendChild(acessibilidadeWidget);

  const daltonismoFiltros = document.createElement('div');
  daltonismoFiltros.className = 'daltonismo-filtros';
  daltonismoFiltros.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" aria-hidden="true" focusable="false">
      <filter id="daltonismo-protanopia">
        <feColorMatrix type="matrix" values="0.56667 0.43333 0 0 0
          0.55833 0.44167 0 0 0
          0 0.24167 0.75833 0 0
          0 0 0 1 0" />
      </filter>
      <filter id="daltonismo-deuteranopia">
        <feColorMatrix type="matrix" values="0.625 0.375 0 0 0
          0.7 0.3 0 0 0
          0 0.3 0.7 0 0
          0 0 0 1 0" />
      </filter>
      <filter id="daltonismo-tritanopia">
        <feColorMatrix type="matrix" values="0.95 0.05 0 0 0
          0 0.43333 0.56667 0 0
          0 0.475 0.525 0 0
          0 0 0 1 0" />
      </filter>
    </svg>
  `;
  document.body.appendChild(daltonismoFiltros);

  const atualizarPosicaoAcessibilidade = () => {
    const vwButton = document.querySelector('.vw-access-button');
    if (!vwButton) {
      acessibilidadeWidget.style.right = '24px';
      acessibilidadeWidget.style.bottom = '24px';
      return;
    }
    const rect = vwButton.getBoundingClientRect();
    const spacing = 12;
    const bottom = Math.max(window.innerHeight - rect.top + spacing, 24);
    const right = Math.max(window.innerWidth - rect.right, 16);
    acessibilidadeWidget.style.right = `${right}px`;
    acessibilidadeWidget.style.bottom = `${bottom}px`;
  };

  let contrasteAtivo = localStorage.getItem(CONTRASTE_STORAGE_KEY) === '1';
  let negritoAtivo = localStorage.getItem(NEGRITO_STORAGE_KEY) === '1';
  let espacoLetrasAtivo = localStorage.getItem(ESPACO_LETRAS_STORAGE_KEY) === '1';
  let espacoLinhasAtivo = localStorage.getItem(ESPACO_LINHAS_STORAGE_KEY) === '1';
  let fonteEstiloAtivo = localStorage.getItem(FONTE_ESTILO_STORAGE_KEY) === '1';

  const DALTONISMO_CLASSES = {
    protanopia: 'daltonismo-protanopia',
    deuteranopia: 'daltonismo-deuteranopia',
    tritanopia: 'daltonismo-tritanopia',
  };

  const DALTONISMO_MODOS = ['normal', 'deuteranopia', 'protanopia', 'tritanopia'];
  let daltonismoAtual = localStorage.getItem(DALTONISMO_STORAGE_KEY) || 'normal';
  if (!DALTONISMO_MODOS.includes(daltonismoAtual)) {
    daltonismoAtual = 'normal';
  }

  const INTENSIDADE_CLASSES = {
    saturada: 'intensidade-saturada',
    'preto-branco': 'intensidade-preto-branco',
  };

  const INTENSIDADE_MODOS = ['normal', 'saturada', 'preto-branco'];
  let intensidadeAtual = localStorage.getItem(INTENSIDADE_STORAGE_KEY) || 'normal';
  if (!INTENSIDADE_MODOS.includes(intensidadeAtual)) {
    intensidadeAtual = 'normal';
  }

  let lerAoClicar = localStorage.getItem(LEITOR_STORAGE_KEY) === '1';
  let modoLeituraAtivo = localStorage.getItem(MODO_LEITURA_STORAGE_KEY) === '1';
  let leituraPausada = false;
  let leituraAtiva = false;
  let falaAtual = null;
  let vozPreferida = null;

  const FONTE_MIN = 90;
  const FONTE_MAX = 140;
  const FONTE_STEP = 10;
  let fontePercent = parseInt(localStorage.getItem(FONTE_STORAGE_KEY), 10);
  if (Number.isNaN(fontePercent)) {
    fontePercent = 100;
  }

  const atualizarFonte = () => {
    document.documentElement.style.fontSize = `${fontePercent}%`;
    const noMin = fontePercent <= FONTE_MIN;
    const noMax = fontePercent >= FONTE_MAX;
    fonteMenosBotao.disabled = noMin;
    fonteMenosBotao.setAttribute('aria-disabled', noMin ? 'true' : 'false');
    fonteMaisBotao.disabled = noMax;
    fonteMaisBotao.setAttribute('aria-disabled', noMax ? 'true' : 'false');
  };

  const atualizarTextoAcessibilidade = () => {
    document.body.classList.toggle('texto-negrito', negritoAtivo);
    document.body.classList.toggle('espaco-letras', espacoLetrasAtivo);
    document.body.classList.toggle('espaco-linhas', espacoLinhasAtivo);
    document.body.classList.toggle('fonte-acessivel', fonteEstiloAtivo);
    negritoBotao.setAttribute('aria-pressed', negritoAtivo ? 'true' : 'false');
    espacoLetrasBotao.setAttribute('aria-pressed', espacoLetrasAtivo ? 'true' : 'false');
    espacoLinhasBotao.setAttribute('aria-pressed', espacoLinhasAtivo ? 'true' : 'false');
    fonteEstiloBotao.setAttribute('aria-pressed', fonteEstiloAtivo ? 'true' : 'false');
  };

  const atualizarDaltonismo = () => {
    Object.values(DALTONISMO_CLASSES).forEach((classe) => {
      document.body.classList.remove(classe);
    });
    const classeAtiva = DALTONISMO_CLASSES[daltonismoAtual];
    if (classeAtiva) {
      document.body.classList.add(classeAtiva);
    }

    daltonismoBotoes.forEach((botao) => {
      const ativo = botao.dataset.daltonismo === daltonismoAtual;
      botao.setAttribute('aria-pressed', ativo ? 'true' : 'false');
    });

    atualizarFiltrosVisuais();
  };

  const atualizarIntensidade = () => {
    Object.values(INTENSIDADE_CLASSES).forEach((classe) => {
      document.body.classList.remove(classe);
    });
    const classeAtiva = INTENSIDADE_CLASSES[intensidadeAtual];
    if (classeAtiva) {
      document.body.classList.add(classeAtiva);
    }

    intensidadeBotoes.forEach((botao) => {
      const ativo = botao.dataset.intensidade === intensidadeAtual;
      botao.setAttribute('aria-pressed', ativo ? 'true' : 'false');
    });

    atualizarFiltrosVisuais();
  };

  const atualizarFiltrosVisuais = () => {
    const filtros = [];
    const filtroDaltonismo = DALTONISMO_CLASSES[daltonismoAtual]
      ? `url('#${DALTONISMO_CLASSES[daltonismoAtual]}')`
      : '';
    const filtroIntensidade = intensidadeAtual === 'saturada'
      ? 'saturate(1.35)'
      : intensidadeAtual === 'preto-branco'
        ? 'grayscale(1)'
        : '';

    if (filtroDaltonismo) filtros.push(filtroDaltonismo);
    if (filtroIntensidade) filtros.push(filtroIntensidade);

    const valorFiltro = filtros.length ? filtros.join(' ') : 'none';
    filtroContainer.style.filter = valorFiltro;
    filtroContainer.style.webkitFilter = valorFiltro;
  };

  const atualizarContraste = () => {
    document.body.classList.toggle('tema-contraste', contrasteAtivo);
    contrasteBotao.setAttribute('aria-pressed', contrasteAtivo ? 'true' : 'false');
    contrasteBotao.setAttribute('aria-label', contrasteAtivo ? 'Desativar alto contraste' : 'Ativar alto contraste');
    atualizarLogos();
  };

  const atualizarModoLeitura = () => {
    document.body.classList.toggle('modo-leitura', modoLeituraAtivo);
    modoLeituraBotao.setAttribute('aria-pressed', modoLeituraAtivo ? 'true' : 'false');
  };

  const atualizarLeitorClique = () => {
    leituraCliqueBotao.setAttribute('aria-pressed', lerAoClicar ? 'true' : 'false');
  };

  const selecionarVozPreferida = () => {
    const vozes = window.speechSynthesis?.getVoices?.() || [];
    vozPreferida = vozes.find((voz) => voz.lang && voz.lang.toLowerCase().startsWith('pt-br'))
      || vozes.find((voz) => voz.lang && voz.lang.toLowerCase().startsWith('pt'))
      || vozes[0] || null;
  };

  const limparTexto = (texto) => texto.replace(/\s+/g, ' ').trim();

  const obterTextoElemento = (el) => {
    if (!el) return '';
    const ignorar = el.closest('header, nav, footer, .menu, .acessibilidade-widget, .redes-sociais, .busca');
    if (ignorar) return '';
    return limparTexto(el.textContent || '');
  };

  const obterTextoPagina = () => {
    const main = document.querySelector('main');
    const base = main || document.querySelector('#filtro-site') || document.body;
    return limparTexto(base.textContent || '');
  };

  const finalizarLeitura = () => {
    leituraAtiva = false;
    leituraPausada = false;
    leituraPausarBotao.textContent = 'Pausar';
    leituraPausarBotao.setAttribute('aria-label', 'Pausar leitura');
  };

  const falarTexto = (texto) => {
    const textoLimpo = limparTexto(texto);
    if (!textoLimpo || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    selecionarVozPreferida();

    falaAtual = new SpeechSynthesisUtterance(textoLimpo);
    if (vozPreferida) {
      falaAtual.voice = vozPreferida;
    }
    falaAtual.lang = vozPreferida?.lang || 'pt-BR';
    falaAtual.rate = 1;
    falaAtual.onend = finalizarLeitura;
    falaAtual.onerror = finalizarLeitura;

    leituraAtiva = true;
    leituraPausada = false;
    leituraPausarBotao.textContent = 'Pausar';
    leituraPausarBotao.setAttribute('aria-label', 'Pausar leitura');

    window.speechSynthesis.speak(falaAtual);
  };

  const lerSelecao = () => {
    const selecao = window.getSelection?.();
    const texto = selecao ? selecao.toString() : '';
    if (texto.trim().length < 2) return;
    falarTexto(texto);
  };

  const lerPagina = () => {
    const texto = obterTextoPagina();
    if (texto.length < 2) return;
    falarTexto(texto);
  };

  const toggleAcessibilidadeMenu = () => {
    const aberto = acessibilidadeWidget.classList.toggle('aberto');
    acessibilidadeToggle.setAttribute('aria-expanded', aberto ? 'true' : 'false');
  };

  atualizarContraste();
  atualizarFonte();
  atualizarTextoAcessibilidade();
  atualizarDaltonismo();
  atualizarIntensidade();
  atualizarModoLeitura();
  atualizarLeitorClique();
  atualizarPosicaoAcessibilidade();

  selecionarVozPreferida();
  if (window.speechSynthesis) {
    window.speechSynthesis.addEventListener('voiceschanged', selecionarVozPreferida);
  }

  contrasteBotao.addEventListener('click', () => {
    contrasteAtivo = !contrasteAtivo;
    localStorage.setItem(CONTRASTE_STORAGE_KEY, contrasteAtivo ? '1' : '0');
    atualizarContraste();
  });

  negritoBotao.addEventListener('click', () => {
    negritoAtivo = !negritoAtivo;
    localStorage.setItem(NEGRITO_STORAGE_KEY, negritoAtivo ? '1' : '0');
    atualizarTextoAcessibilidade();
  });

  espacoLetrasBotao.addEventListener('click', () => {
    espacoLetrasAtivo = !espacoLetrasAtivo;
    localStorage.setItem(ESPACO_LETRAS_STORAGE_KEY, espacoLetrasAtivo ? '1' : '0');
    atualizarTextoAcessibilidade();
  });

  espacoLinhasBotao.addEventListener('click', () => {
    espacoLinhasAtivo = !espacoLinhasAtivo;
    localStorage.setItem(ESPACO_LINHAS_STORAGE_KEY, espacoLinhasAtivo ? '1' : '0');
    atualizarTextoAcessibilidade();
  });

  fonteEstiloBotao.addEventListener('click', () => {
    fonteEstiloAtivo = !fonteEstiloAtivo;
    localStorage.setItem(FONTE_ESTILO_STORAGE_KEY, fonteEstiloAtivo ? '1' : '0');
    atualizarTextoAcessibilidade();
  });

  fonteMaisBotao.addEventListener('click', () => {
    if (fontePercent >= FONTE_MAX) return;
    fontePercent += FONTE_STEP;
    localStorage.setItem(FONTE_STORAGE_KEY, String(fontePercent));
    atualizarFonte();
  });

  fonteMenosBotao.addEventListener('click', () => {
    if (fontePercent <= FONTE_MIN) return;
    fontePercent -= FONTE_STEP;
    localStorage.setItem(FONTE_STORAGE_KEY, String(fontePercent));
    atualizarFonte();
  });

  leituraPaginaBotao.addEventListener('click', () => {
    lerPagina();
  });

  leituraSelecaoBotao.addEventListener('click', () => {
    lerSelecao();
  });

  leituraPausarBotao.addEventListener('click', () => {
    if (!window.speechSynthesis) return;
    if (!leituraAtiva) return;
    if (leituraPausada) {
      window.speechSynthesis.resume();
      leituraPausada = false;
      leituraPausarBotao.textContent = 'Pausar';
      leituraPausarBotao.setAttribute('aria-label', 'Pausar leitura');
      return;
    }
    window.speechSynthesis.pause();
    leituraPausada = true;
    leituraPausarBotao.textContent = 'Continuar';
    leituraPausarBotao.setAttribute('aria-label', 'Continuar leitura');
  });

  leituraPararBotao.addEventListener('click', () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    finalizarLeitura();
  });

  leituraCliqueBotao.addEventListener('click', () => {
    lerAoClicar = !lerAoClicar;
    localStorage.setItem(LEITOR_STORAGE_KEY, lerAoClicar ? '1' : '0');
    atualizarLeitorClique();
  });

  modoLeituraBotao.addEventListener('click', () => {
    modoLeituraAtivo = !modoLeituraAtivo;
    localStorage.setItem(MODO_LEITURA_STORAGE_KEY, modoLeituraAtivo ? '1' : '0');
    atualizarModoLeitura();
  });

  document.addEventListener('click', (e) => {
    if (!lerAoClicar) return;
    if (acessibilidadeWidget.contains(e.target)) return;
    const alvo = e.target.closest('p, li, h1, h2, h3, h4, h5, h6, blockquote, figcaption, td, th') || e.target;
    const texto = obterTextoElemento(alvo);
    if (texto.length < 2) return;
    falarTexto(texto);
  });

  daltonismoBotoes.forEach((botao) => {
    botao.addEventListener('click', () => {
      daltonismoAtual = botao.dataset.daltonismo || 'normal';
      localStorage.setItem(DALTONISMO_STORAGE_KEY, daltonismoAtual);
      atualizarDaltonismo();
    });
  });

  intensidadeBotoes.forEach((botao) => {
    botao.addEventListener('click', () => {
      intensidadeAtual = botao.dataset.intensidade || 'normal';
      localStorage.setItem(INTENSIDADE_STORAGE_KEY, intensidadeAtual);
      atualizarIntensidade();
    });
  });

  acessibilidadeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleAcessibilidadeMenu();
  });

  document.addEventListener('click', (e) => {
    if (!acessibilidadeWidget.contains(e.target)) {
      acessibilidadeWidget.classList.remove('aberto');
      acessibilidadeToggle.setAttribute('aria-expanded', 'false');
    }
  });

  window.addEventListener('resize', atualizarPosicaoAcessibilidade);

  // Menu Scroll (carrossel horizontal)
  const menu = document.querySelector('.menuScroll');
  const menuScrollable = menu?.querySelector('.menuScroll-wrapper');
  const menuTrack = menuScrollable?.querySelector('.menuScroll-track');

  if (menu && menuScrollable && menuTrack) {
    const baseCards = Array.from(menuTrack.children);

    if (baseCards.length) {
      // Garante largura mí­nima antes de duplicar para o loop.
      while (menuTrack.scrollWidth < menuScrollable.clientWidth * 2) {
        baseCards.forEach((card) => menuTrack.appendChild(card.cloneNode(true)));
      }

      // Duplica o conjunto final para permitir o deslocamento contí­nuo.
      menuTrack.innerHTML += menuTrack.innerHTML;
    }

    // Controlar o loop via scrollLeft para não travar no final.
    menuTrack.style.animation = 'none';

    const halfWidth = menuTrack.scrollWidth / 2;
    const speed = 0.6; // pixels por frame (~36px/s em 60fps)
    let autoScrollId = null;

    const startAutoScroll = () => {
      if (autoScrollId || !halfWidth) return;
      const step = () => {
        menuScrollable.scrollLeft += speed;
        if (menuScrollable.scrollLeft >= halfWidth) {
          menuScrollable.scrollLeft -= halfWidth;
        }
        autoScrollId = requestAnimationFrame(step);
      };
      autoScrollId = requestAnimationFrame(step);
    };

    const stopAutoScroll = () => {
      if (!autoScrollId) return;
      cancelAnimationFrame(autoScrollId);
      autoScrollId = null;
    };

    startAutoScroll();

    let wheelTimeout;
    menuScrollable.addEventListener('wheel', (e) => {
      e.preventDefault(); // evita scroll da pagina
      stopAutoScroll();

      menuScrollable.scrollLeft += e.deltaY || e.deltaX; // rolagem horizontal controlada
      if (menuScrollable.scrollLeft >= halfWidth) {
        menuScrollable.scrollLeft -= halfWidth;
      }

      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        startAutoScroll();
      }, 600);
    }, { passive: false });
  }

  // Carrossel de notí­cias
  const newsSection = document.querySelector('.news-section');
  const track = newsSection?.querySelector('.news-track');
  const dotsContainer = newsSection?.querySelector('.news-dots');
  const prevBtn = newsSection?.querySelector('.news-prev');
  const nextBtn = newsSection?.querySelector('.news-next');
  const newsWindow = newsSection?.querySelector('.news-window');

  if (newsSection && track && dotsContainer && prevBtn && nextBtn && newsWindow) {
    const cards = Array.from(track.children);
    const cardsPerPageDesktop = 3;
    const cardsPerPageMobile = 2;

    const getCardsPerPage = () => window.innerWidth <= 768 ? cardsPerPageMobile : cardsPerPageDesktop;
    const getGap = () => {
      const styles = getComputedStyle(track);
      const gapValue = parseFloat(styles.columnGap || styles.gap || '0');
      return Number.isFinite(gapValue) ? gapValue : 0;
    };
    const pageCount = () => Math.ceil(cards.length / getCardsPerPage());

    let pageIndex = 0;

    // cria dots
    const renderDots = () => {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < pageCount(); i += 1) {
        const dot = document.createElement('button');
        if (i === pageIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    };

    const goTo = (i) => {
      pageIndex = (i + pageCount()) % pageCount();
      const cardWidth = cards[0].getBoundingClientRect().width;
      const gap = getGap();
      const cPerPage = getCardsPerPage();
      const pageWidth = cPerPage * cardWidth + gap * (cPerPage - 1); // largura do grupo visí­vel
      const step = cPerPage * (cardWidth + gap); // deslocamento para avançar por cartões
      const windowWidth = newsWindow.clientWidth;
      const centerOffset = Math.max((windowWidth - pageWidth) / 2, 0);
      track.style.transform = `translateX(${centerOffset - pageIndex * step}px)`;
      dotsContainer.querySelectorAll('button').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === pageIndex);
      });
    };
    
    const next = () => goTo(pageIndex + 1);
    const prev = () => goTo(pageIndex - 1);

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    let auto = setInterval(next, 1500);

    window.addEventListener('resize', () => { renderDots(); goTo(pageIndex); });

    renderDots();
    goTo(0);
  }

  // --- Carrossel COHAB  ---
const titulo = document.getElementById('ano-titulo');
const lista = document.getElementById('ano-lista');
const prev1 = document.querySelector('.ano-prev');
const next1 = document.querySelector('.ano-next');
const anoBox = document.querySelector('.ano-conteudo');

if (titulo && lista && prev1 && next1) { 
  let idx = 0;
  const anos = [
    { ano: 2024, itens: [
      { texto: 'Balancetes do mês de Dezembro exercício findo;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/Balancetes-do-mes-de-Dezembro-exercicio-findo.pdf' },
      { texto: 'Demonstração do do Valor adicional;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/Demonstracao-do-Valor-adicional.pdf' },
      { texto: 'Demonstração dos Fluxos de Caixa;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/Demonstracao-dos-Fluxos-de-Caixa.pdf' },
      { texto: 'Notas Explicativas das Demonstrações Contábeis;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/Notas-Explicativas-das-Demonstracoes-Contabeis.pdf' },
      { texto: 'Relatório de Auditoria Independente;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/Relatorio-de-Auditoria-Independente.pdf' },
      { texto: 'Parecer do Conselho Fiscal;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/Parecer-do-Conselho-Fiscal.pdf' },
      { texto: 'Demonstração do Resultado do exercício Findo;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/Demonstracao-do-Resultado-do-Exercicio-Findo.pdf' },
      { texto: 'Balanço Patrimonial;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/Balanco-Patrimonial.pdf' },
      { texto: 'Demonstração das Mutações do Patrimônio Líquido.', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/Demonstracao-das-Mutacoes-do-Patrimonio-Liquido.pdf' },
      { texto: 'Despesas com Publicidade;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/07/nao_publicidade.pdf' },
      { texto: 'Relação de Bens Adquiridos', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/07/nao_bens_adquiridos.pdf' }
    ]},
    { ano: 2023, itens: [ 
      { texto: 'Balancetes do mês de Dezembro exercício findo;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2024/07/2023_Balancete.pdf' },
      { texto: 'Demonstração do Valor adicional;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2024/07/2023_Demonstracao-do-Valor-Adicional.pdf' },
      { texto: 'Demonstração dos Fluxos de Caixa;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2024/07/2023_Demonstracao-de-Fluxo-de-Caixa.pdf' },
      { texto: 'Notas Explicativas das Demonstrações Contábeis;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2024/07/2023_Notas-Explicativas-das-Demonstracoes-Contabeis.pdf' },
      { texto: 'Relatório de Auditoria Independente;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2024/07/2023_Relatorio-de-Auditoria-Independente.pdf' },
      { texto: 'Parecer do Conselho Fiscal;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2024/07/2023_Parecer-do-Conselho-Fiscal.pdf' },
      { texto: 'Demonstração do Resultado do exercício Findo;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2024/07/2023_Demonstracao-do-Resultado-do-Exercicio.pdf' },
      { texto: 'Balanço Patrimonial;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2024/07/2023_Balanco-Patrimonial.pdf' },
      { texto: 'Demonstração das Mutações do Patrimônio Líquido.', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2024/07/2023_Demonstracao-das-Mutacoes-do-Patrimonio-Liquido.pdf' },
      { texto: 'Despesas com Publicidade;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/07/nao_publicidade.pdf' },
      { texto: 'Relação de Bens Adquiridos', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/07/nao_bens_adquiridos.pdf' }
    ]},
    { ano: 2022, itens: [
      { texto: 'Balancetes do mês de Dezembro exercício findo;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/9_Balancete.pdf' },
      { texto: 'Demonstração do Valor adicional;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/7_Demonstracao-do-Valor-Adicional.pdf' },
      { texto: 'Demonstração dos Fluxos de Caixa;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/6_Demonstracao-de-Fluxo-de-Caixa.pdf' },
      { texto: 'Notas Explicativas das Demonstrações Contábeis;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/8_Notas-Explicativas-das-Demonstra%C3%A7%C3%B5es-Contabeis.pdf' },
      { texto: 'Relatório de Auditoria Independente;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/14_Relatorio-de-Auditoria-Independente.pdf' },
      { texto: 'Parecer do Conselho Fiscal;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/12_Parecer-do-Conselho-Fiscal.pdf' },
      { texto: 'Demonstração do Resultado do exercício Findo;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/5_Demonstracao-do-Resultado-do-Exercicio.pdf' },
      { texto: 'Balanço Patrimonial;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/3_Balan%C3%A7o-Patrimonial.pdf' },
      { texto: 'Demonstração das Mutações do Patrimônio Líquido.', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/4_Demonstracao-das-Mutacoes-do-Patrimonio-Liquido-1.pdf' },
      { texto: 'Despesas com Publicidade;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/CohabMinas-Publicidade_2022.xlsx' },
      { texto: 'Relação de Bens Adquiridos', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/07/nao_bens_adquiridos.pdf' }
     ]},
    { ano: 2021, itens: [
      { texto: 'Balancetes do mês de Dezembro exercício findo;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/Balancetes-do-m%C3%AAs-de-Dezembro-exerc%C3%ADcio-findo-2021.pdf' },
      { texto: 'Demonstração do Valor adicional;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/Demonstra%C3%A7%C3%A3o-do-Valor-adicionado-2021.pdf' },
      { texto: 'Demonstração dos Fluxos de Caixa;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/Demonstra%C3%A7%C3%A3o-dos-Fluxos-de-Caixa-2021.pdf' },
      { texto: 'Demonstrações Financeiras ;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/Demonstra%C3%A7%C3%B5es-Financeiras-2021.pdf' },
      { texto: 'Notas Explicativas às Demonstrações Financeiras;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/Notas-Explicativas-%C3%A0s-Demonstra%C3%A7%C3%B5es-Financeiras-2021.pdf' },
      { texto: 'Relatório de Auditoria Independente;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/Parecer-da-auditoria-independente-2021.pdf' },
      { texto: 'Parecer do Conselho Fiscal;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/Relat%C3%B3rio-do-Conselho-Fiscal-2021.pdf' },
      { texto: 'Demonstração do Resultado do exercício Findo;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/DRE-2021.pdf' },
      { texto: 'Despesas com Publicidade;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/07/nao_publicidade.pdf' },
      { texto: 'Relação de Bens Adquiridos', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/07/nao_bens_adquiridos.pdf' }
     ]},
    { ano: 2020, itens: [
      { texto: 'Balancetes do mês de Dezembro exercício findo;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2021/06/Balancetes-do-mes-de-Dezembro-exercicio-findo.pdf' },
      { texto: 'Demonstração do Valor adicional;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2021/06/Demonstra%C3%A7%C3%A3o-do-Valor-adicionado.pdf' },
      { texto: 'Demonstração dos Fluxos de Caixa;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2021/06/Demonstra%C3%A7%C3%A3o-dos-Fluxos-de-Caixa.pdf' },
      { texto: 'Demonstrações Financeiras ;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2021/06/Demonstra%C3%A7%C3%B5es-Financeiras-e-Notas-Explicativas.pdf' },
      { texto: 'Parecer da Auditoria Independente ;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2021/06/Parecer-da-auditoria-independente.pdf' },
      { texto: 'Parecer do Conselho Fiscal ;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2021/06/Parecer-do-Conselho-Fiscal.pdf' },
      { texto: 'Ata da Assembleia Geral Ordinária Sobre Atos dos Administradores e Demonstrações ;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2021/06/Ata-da-assembleia-geral-ordin%C3%A1ria-sobre-atos-dos-administradores-e-demonstra%C3%A7%C3%B5es.pdf' },
      { texto: 'Despesas com Publicidade;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/07/nao_publicidade.pdf' },
      { texto: 'Relação de Bens Adquiridos', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/07/nao_bens_adquiridos.pdf' }
     ]},
  ];

  function render() {
  const atual = anos[idx];
  titulo.textContent = atual.ano;
  lista.innerHTML = atual.itens
    .map(item => `
      <li>
        <a href="${item.href}"
           target="_blank"
           rel="noopener noreferrer">
          ${item.texto}
        </a>
      </li>`)
    .join('');
}

  const trocar = (direcao) => {
  if (!anoBox) { render(); return; }
  const fadeClass = direcao === 'next' ? 'fade-out-next' : 'fade-out-prev';
  const enterClass = direcao === 'next' ? 'enter-next' : 'enter-prev';

  anoBox.classList.remove('fade-out-next', 'fade-out-prev', 'enter-next', 'enter-prev');
  anoBox.classList.add(fadeClass);

  setTimeout(() => {
    render();
    anoBox.classList.remove('fade-out-next', 'fade-out-prev', 'enter-next', 'enter-prev');
    void anoBox.offsetWidth; // reflow
    anoBox.classList.add(enterClass);
  }, 140);
};

  prev1.addEventListener('click', () => { idx = (idx - 1 + anos.length) % anos.length; trocar('prev'); });
  next1.addEventListener('click', () => { idx = (idx + 1) % anos.length; trocar('next'); });

  render();
}

// --- Carrossel FEH ---
const titulo2 = document.getElementById('ano2-titulo');
const cta = document.getElementById('ano2-cta');
const prev2 = document.querySelector('.ano-prev');
const next2 = document.querySelector('.ano-next');
const anoBox2 = document.querySelector('.ano2-conteudo');

if (titulo2 && cta && prev2 && next2) { 
  let idx2 = 0;
  const anos2 = [
    { ano: 2024, texto: 'Acessar 2024', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/11/Documentacao-Prestacao-de-contas-do-FEH.pdf' },
    { ano: 2023, texto: 'Acessar 2023', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/11/Prestacao-de-Contas-2023.pdf' },
    { ano: 2022, texto: 'Acessar 2022', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/11/Prestacao-de-Contas-2022.pdf' },
    { ano: 2021, texto: 'Acessar 2021', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/11/Prestacao-de-Contas-2021.pdf' },
    { ano: 2020, texto: 'Acessar 2020', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/11/Prestacao-de-Contas-2020.pdf' },
  ];

  function renderAnoBtn() {
    const atual = anos2[idx2];
    titulo2.textContent = atual.ano;
    cta.innerHTML = `
      <a class="btn-ano"
         href="${atual.href}"
         target="_blank"
         rel="noopener noreferrer">
        ${atual.texto}
      </a>
    `;
  }

  const trocar2 = (direcao) => {
    if (!anoBox2) { renderAnoBtn(); return; }
    const fadeClass = direcao === 'next' ? 'fade-out-next' : 'fade-out-prev';
    const enterClass = direcao === 'next' ? 'enter-next' : 'enter-prev';

    anoBox2.classList.remove('fade-out-next','fade-out-prev','enter-next','enter-prev');
    anoBox2.classList.add(fadeClass);

    setTimeout(() => {
      renderAnoBtn();
      anoBox2.classList.remove('fade-out-next','fade-out-prev','enter-next','enter-prev');
      void anoBox2.offsetWidth; // reflow
      anoBox2.classList.add(enterClass);
    }, 140);
  };

  prev2.addEventListener('click', () => { idx2 = (idx2 - 1 + anos2.length) % anos2.length; trocar2('prev'); });
  next2.addEventListener('click', () => { idx2 = (idx2 + 1) % anos2.length; trocar2('next'); });

  renderAnoBtn();
}

// --- Listas suspensas Estratégia ---
const estrContainer = document.getElementById('estrategia-accordion');

if (estrContainer) {
  const estrAnos = [
    { ano: 2025, itens: [
      { texto: 'Plano de Negócios', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/3-Plano-de-Negocios-2025.pdf' },
      { texto: 'Estratégia Corporativa de longo prazo 2025-2029', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/2-Estrategias-de-Longo-Prazo-2025-2029.pdf' },

    ]},
    { ano: 2024, itens: [
      { texto: 'Indicadores e Metas Estratégicas', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/1-Relatorio-de-Indicadores-e-Metas-2024.pdf' },
      { texto: 'Plano de Negócios', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2024/01/Plano-de-Neg%C3%B3cios-COHAB-2024.pdf' },
      { texto: 'Estratégia Corporativa de longo prazo 2024-2028', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2024/01/Estrat%C3%A9gia-de-Longo-Prazo-2024-a-2028.pdf' },
    ]},
    { ano: 2023, itens: [
      { texto: 'Indicadores e Metas Estratégicas', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2024/01/Indicadores-e-Metas-2023.pdf' },
      { texto: 'Plano de Negócios', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/Plano-de-Neg%C3%B3cios-COHAB-2023.pdf' },
      { texto: 'Estratégia Corporativa de longo prazo 2023-2027', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/Estrat%C3%A9gias-de-Longo-Prazo-2023-a-2027.pdf' },
    ]},
    { ano: 2022, itens: [
      { texto: 'Indicadores e Metas Estratégicas', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/Indicadores-e-Metas-2022.pdf' },
      
    ]},
    { ano: 2021, itens: [
      { texto: 'Indicadores e Metas Estratégicas', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/Indicadores-e-Metas-2021..pdf' },
      
    ]},
    { ano: 2020, itens: [
      { texto: 'Indicadores e Metas Estratégicas', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2021/11/Pauta.pdf' },
      
    ]},
    { ano: 'Extras', itens: [
      { texto: 'Estratégia Corporativa de longo prazo 2019-2023 e Plano de negócios 2022', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2022/10/Plano_de_Negocios_Cohab_Minas.pdf' },
      
    ]},
    
  ];

  const construirItens = (itens) => itens.map((item) => `
      <li>
        <a href="${item.href}"
           target="_blank"
           rel="noopener noreferrer">
          ${item.texto}
        </a>
      </li>`).join('');

  estrContainer.innerHTML = estrAnos.map((registro) => `
    <details class="estrategia-card">
      <summary>
        <span class="estrategia-year">${registro.ano}</span>
        <span class="estrategia-chevron" aria-hidden="true">&#9662;</span>
      </summary>
      <ul class="estrategia-lista">
        ${construirItens(registro.itens)}
      </ul>
    </details>
  `).join('');
}

// Carta Anual
function montarAccordionPorAno(containerId, dados) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = dados.map((registro) => `
    <details class="estrategia-card">
      <summary>
        <span class="estrategia-year">${registro.ano}</span>
        <span class="estrategia-chevron" aria-hidden="true">&#9662;</span>
      </summary>
      <ul class="estrategia-lista">
        ${registro.itens.map((i) => `
          <li>
            <a href="${i.href}" target="_blank" rel="noopener noreferrer">
              ${i.texto}
            </a>
          </li>`).join('')}
      </ul>
    </details>
  `).join('');
}
const dadosPagina = [
{ ano: 2025, itens: [
  { texto: 'Carta Anual de Políticas Públicas e Governança Corporativa', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/5-Carta-Anual-de-Politicas-Publicas-e-Governanca-Corporativa-2024-2025.pdf' },
]},
{ ano: 2024, itens: [
  { texto: 'Carta Anual de Políticas Públicas e Governança Corporativa', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2024/08/Carta_Anual_de_Pol%C3%ADticas_Publicas_e_Governanca_Corporativa_2024_ano_base_2023.pdf' }
]},
{ ano: 2023, itens: [
  { texto: 'Carta Anual de Políticas Públicas e Governança Corporativa', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/08/carta_anual_2023.pdf' }
]},
{ ano: '2022 / 2021', itens: [
  { texto: 'Carta Anual de Políticas Públicas e Governança Corporativa', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2022/10/2021_2022-Carta_Anual_Pol%C3%ADticas_Publicas_e_Governanca.pdf' }
]},
{ ano: 2020, itens: [
  { texto: 'Carta Anual de Políticas Públicas e Governança Corporativa', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2021/09/Carta-Anual-de-Pol%C3%ADticas-P%C3%BAblicas-2020.pdf' }
]},
{ ano: 2019, itens: [
  { texto: 'Carta Anual de Políticas Públicas e Governança Corporativa', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2021/09/Carta-Anual-de-Politicas-P%C3%BAblicas-e-Governan%C3%A7a-Corporativa-Cohab-2019.pdf' }
]},
];

montarAccordionPorAno('accordionAnual', dadosPagina);

// Relatório de Administração
function montarAccordionRelatorioADM(containerId, dados) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = dados.map((registro) => `
    <details class="estrategia-card">
      <summary>
        <span class="estrategia-year">${registro.ano}</span>
        <span class="estrategia-chevron" aria-hidden="true">&#9662;</span>
      </summary>
      <ul class="estrategia-lista">
        ${registro.itens.map((i) => `
          <li>
            <a href="${i.href}" target="_blank" rel="noopener noreferrer">
              ${i.texto}
            </a>
          </li>`).join('')}
      </ul>
    </details>
  `).join('');
}
const dadosPaginaRelatorioADM = [
{ ano: '2024-2025', itens: [
  { texto: 'Relatório Anual de Administração Integrado', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/4-Relatorio-da-Administracao-2024.pdf' },
]},
{ ano: '2022-2023', itens: [
  { texto: 'Relatório Anual de Administração Integrado', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/08/Relatorio_Anual_Administra%C3%A7%C3%A3o_Integrado-2022-2023.pdf' }
]},
{ ano: '2021-2022', itens: [
  { texto: 'Relatório Anual de Administração Integrado', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/08/Relatorio_Anual_Administra%C3%A7%C3%A3o_Integrado-2021-2022.pdf' }
]},
{ ano: '2020-2021', itens: [
  { texto: 'Relatório Anual de Administração Integrado', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/08/Relatorio_Anual_Administra%C3%A7%C3%A3o_Integrado-2020-2021.pdf' }
]},
{ ano: '2019-2020', itens: [
  { texto: 'Relatório Anual de Administração Integrado', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/08/Relatorio_Anual_Administra%C3%A7%C3%A3o_Integrado-2019-2020.pdf' }
]},
];
montarAccordionRelatorioADM('accordionRelatorioADM', dadosPaginaRelatorioADM);

// Relatório de Auditoria
function montarAccordionRelatorioAUD(containerId, dados) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = dados.map((registro) => `
    <details class="estrategia-card">
      <summary>
        <span class="estrategia-year">${registro.ano}</span>
        <span class="estrategia-chevron" aria-hidden="true">&#9662;</span>
      </summary>
      <ul class="estrategia-lista">
        ${registro.itens.map((i) => `
          <li>
            <a href="${i.href}" target="_blank" rel="noopener noreferrer">
              ${i.texto}
            </a>
          </li>`).join('')}
      </ul>
    </details>
  `).join('');
}
const dadosPaginaRelatorioAUD = [
{ ano: 2024, itens: [
  { texto: 'Relatório Anual de Auditoria Interna', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/06/Auditoria_2023_Relatorio.pdf' },
]},
{ ano: 2023, itens: [
  { texto: 'Relatório Anual de Auditoria Interna', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/06/Auditoria_2024_Relatorio.pdf' }
]},
{ ano: 2022, itens: [
  { texto: 'Relatório Anual de Auditoria Interna', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/07/Audit_2022_relatorio.pdf' }
]},
{ ano: 2021, itens: [
  { texto: 'Relatório Anual de Auditoria Interna', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2022/04/UCI_21.pdf' }
]},
{ ano: 2020, itens: [
  { texto: 'Relatório Anual de Auditoria Interna', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2021/09/anual-atividades-2020.pdf' }
]},
{ ano: 2019, itens: [
  { texto: 'Relatório Anual de Auditoria Interna', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2021/09/anual-atividades-2019.pdf' }
]},
];
montarAccordionRelatorioAUD('accordionRelatorioAUD', dadosPaginaRelatorioAUD);

// Campo de dependentes (cadastro)
const dependentesRadios = document.querySelectorAll('input[name="dependentes"]');
const dependentesLabel = document.querySelector('label[for="dependentes-quantidade"]');
const dependentesInput = document.getElementById('dependentes-quantidade');

if (dependentesRadios.length && dependentesInput && dependentesLabel) {
  const toggleDependentes = () => {
    const marcado = document.querySelector('input[name="dependentes"]:checked');
    const mostrar = marcado && marcado.value === 'sim';

    dependentesLabel.classList.toggle('hidden', !mostrar);
    dependentesInput.classList.toggle('hidden', !mostrar);
    dependentesInput.required = !!mostrar;
    if (!mostrar) dependentesInput.value = '';
  };

  dependentesRadios.forEach((radio) => {
    radio.addEventListener('change', toggleDependentes);
  });

  toggleDependentes();
}

// Campo de residencia no imovel (cadastro)
const residenciaRadios = document.querySelectorAll('input[name="reside_imovel"]');
const residenciaLabel = document.querySelector('label[for="tempo-residencia"]');
const residenciaInput = document.getElementById('tempo-residencia');

if (residenciaRadios.length && residenciaInput && residenciaLabel) {
  const toggleResidencia = () => {
    const marcado = document.querySelector('input[name="reside_imovel"]:checked');
    const mostrar = marcado && marcado.value === 'sim';

    residenciaLabel.classList.toggle('hidden', !mostrar);
    residenciaInput.classList.toggle('hidden', !mostrar);
    residenciaInput.required = !!mostrar;
    if (!mostrar) residenciaInput.value = '';
  };

  residenciaRadios.forEach((radio) => {
    radio.addEventListener('change', toggleResidencia);
  });

  toggleResidencia();
}

// Cidades (dropdown customizado + validacao)
const cidadesInput = document.getElementById('cidade-interesse');
const cidadesList = document.getElementById('cidade-interesse-list');
const cadastroForm = document.querySelector('.cadastro-form');

if (cidadesInput && cidadesList && Array.isArray(window.cidadesInteresse)) {
  const normalizarCidade = (texto) => texto
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');

  const cidadesNormalizadas = window.cidadesInteresse.map((c) => ({
    original: c,
    normalizada: normalizarCidade(c),
  }));
  const cidadesSet = new Set(cidadesNormalizadas.map((c) => c.normalizada));

  const criarItem = (cidade) => {
    const item = document.createElement('div');
    item.className = 'combo-item';
    item.setAttribute('role', 'option');
    item.textContent = cidade.original;
    item.dataset.valor = cidade.original;
    item.addEventListener('mousedown', (e) => {
      e.preventDefault();
      cidadesInput.value = cidade.original;
      cidadesInput.setCustomValidity('');
      fecharLista();
    });
    return item;
  };

  const abrirLista = () => {
    cidadesList.classList.add('aberto');
  };

  const fecharLista = () => {
    cidadesList.classList.remove('aberto');
  };

  const filtrarLista = () => {
    const termo = normalizarCidade(cidadesInput.value);
    cidadesList.innerHTML = '';
    const filtradas = termo
      ? cidadesNormalizadas.filter((c) => c.normalizada.includes(termo))
      : cidadesNormalizadas;

    const fragment = document.createDocumentFragment();
    filtradas.forEach((cidade) => fragment.appendChild(criarItem(cidade)));
    cidadesList.appendChild(fragment);
  };

  const validarCidade = () => {
    const valor = normalizarCidade(cidadesInput.value);
    if (valor && !cidadesSet.has(valor)) {
      cidadesInput.setCustomValidity('Selecione uma cidade da lista.');
    } else {
      cidadesInput.setCustomValidity('');
    }
  };

  filtrarLista();

  cidadesInput.addEventListener('focus', () => {
    filtrarLista();
    abrirLista();
  });
  cidadesInput.addEventListener('click', () => {
    filtrarLista();
    abrirLista();
  });
  cidadesInput.addEventListener('input', () => {
    filtrarLista();
    abrirLista();
    validarCidade();
  });

  document.addEventListener('click', (e) => {
    if (!cidadesList.contains(e.target) && e.target !== cidadesInput) {
      fecharLista();
    }
  });

  cadastroForm?.addEventListener('submit', (e) => {
    validarCidade();
    if (!cadastroForm.checkValidity()) {
      e.preventDefault();
      cadastroForm.reportValidity();
    }
  });
}

// Quem e quem / Conselhos (popup)
const pathLower = window.location.pathname.toLowerCase();
const isQuemEquem = pathLower.includes('quemequem.html') || pathLower.includes('conselhos.html');
  const mainQuemEquem = isQuemEquem ? document.getElementById('justificar') : null;
  const listaQuemEquem = mainQuemEquem?.querySelector('p');
  
  if (mainQuemEquem) {
    let section = mainQuemEquem.querySelector('.quem-equem');
    if (!section && listaQuemEquem) {
      section = document.createElement('section');
      section.className = 'quem-equem';
  
      const listWrap = document.createElement('div');
      listWrap.className = 'quem-equem-list';
  
      const preview = document.createElement('aside');
      preview.className = 'quem-equem-preview';
      preview.setAttribute('aria-live', 'polite');
      preview.innerHTML = `
        <div class="pessoa-placeholder">Passe o mouse ou clique em um nome para ver a respectiva pessoa!</div>
        <div class="pessoa-popup" aria-hidden="true">
          <img class="pessoa-foto" alt="">
          <div class="pessoa-nome"></div>
        </div>
      `;
  
      mainQuemEquem.insertBefore(section, listaQuemEquem);
      section.appendChild(listWrap);
      listWrap.appendChild(listaQuemEquem);
      section.appendChild(preview);
    }

    if (!section) return;

  const listContainer = section.querySelector('.quem-equem-list p')
    || section.querySelector('.quem-equem-content')
    || section.querySelector('.quem-equem-list');
  if (listContainer) {
    const nodes = Array.from(listContainer.childNodes);
    nodes.forEach((node) => {
      if (node.nodeType !== Node.TEXT_NODE) return;
      const text = node.textContent.trim();
      if (!text) return;
      const lower = text.toLowerCase();
      if (lower.startsWith('e-mail') || lower.startsWith('telefone')) return;
      if (text.includes(':')) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pessoa-link';
      btn.textContent = text;
      node.replaceWith(btn);
    });
  }

    const popup = section.querySelector('.pessoa-popup');
    const foto = popup?.querySelector('.pessoa-foto');
    const nomeEl = popup?.querySelector('.pessoa-nome');
    const placeholder = section.querySelector('.pessoa-placeholder');
    const previewBox = section.querySelector('.quem-equem-preview');
  const links = section.querySelectorAll('.pessoa-link');

  const getInitials = (nome) => {
    const words = nome.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
    if (!words.length) return '?';
    const first = words[0][0] || '';
    const last = words.length > 1 ? words[words.length - 1][0] : '';
    return (first + last).toUpperCase() || '?';
  };

  const toBase64 = (value) => btoa(unescape(encodeURIComponent(value)));

  const avatarFor = (nome) => {
    const initials = getInitials(nome);
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="360" height="360">
        <rect width="100%" height="100%" fill="#dbe6f5"/>
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
              font-family="Arial, sans-serif" font-size="120" font-weight="700"
              fill="#033981">${initials}</text>
      </svg>
    `;
    return `data:image/svg+xml;base64,${toBase64(svg)}`;
  };

  let abrirDireita = true;

    let popupFixado = false;

    const esconderPopup = () => {
      if (popupFixado) return;
      if (!popup) return;
      popup.classList.remove('ativo', 'from-left', 'from-right');
      popup.setAttribute('aria-hidden', 'true');
      placeholder?.classList.remove('hidden');
      previewBox?.classList.remove('popup-ativo');
    };

    const abrirPopup = (btn, origem) => {
      if (!popup || !foto || !nomeEl) return;
      const nome = (btn.dataset.nome || btn.textContent || '').trim();
      if (!nome) return;
      if (popupFixado && origem === 'hover') return;

      const fotoSrc = (btn.dataset.foto || btn.dataset.photo || '').trim();
      const src = fotoSrc || avatarFor(nome);
    foto.src = src;
    foto.alt = `Foto de ${nome}`;
    nomeEl.textContent = nome;

    popup.classList.remove('from-left', 'from-right', 'ativo');
      popup.classList.add(abrirDireita ? 'from-right' : 'from-left');
      popup.classList.add('ativo');
      popup.setAttribute('aria-hidden', 'false');
      placeholder?.classList.add('hidden');
      previewBox?.classList.add('popup-ativo');
      abrirDireita = !abrirDireita;
    };

    links.forEach((btn) => {
      const hoverHandler = () => abrirPopup(btn, 'hover');
      btn.addEventListener('mouseenter', hoverHandler);
      btn.addEventListener('focus', hoverHandler);
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        popupFixado = true;
        abrirPopup(btn, 'click');
      });
      btn.addEventListener('mouseleave', esconderPopup);
      btn.addEventListener('blur', esconderPopup);
    });

    section.addEventListener('mouseleave', esconderPopup);
    document.addEventListener('click', (e) => {
      if (!popupFixado) return;
      if (section.contains(e.target)) return;
      popupFixado = false;
      if (!popup) return;
      popup.classList.remove('ativo', 'from-left', 'from-right');
      popup.setAttribute('aria-hidden', 'true');
      placeholder?.classList.remove('hidden');
      previewBox?.classList.remove('popup-ativo');
    });
  }

  // Busca (sugestoes + pagina de resultados)
  const buscaForm = document.querySelector('.menu-search') || document.querySelector('.busca');
  const buscaInput = buscaForm?.querySelector('input[name="q"]');

    if (buscaForm && buscaInput) {
      const menuSearch = document.querySelector('.menu-search');
      if (menuSearch) {
        const searchButton = menuSearch.querySelector('button[type="submit"], button');
        const openSearch = () => {
          menuSearch.classList.add('menu-search-open');
          document.body.classList.add('search-open');
        };
        const closeSearch = () => {
          menuSearch.classList.remove('menu-search-open');
          document.body.classList.remove('search-open');
        };

        menuSearch.classList.add('menu-search-collapsed');

        searchButton?.addEventListener('focus', openSearch);
        searchButton?.addEventListener('click', (event) => {
          if (!menuSearch.classList.contains('menu-search-open')) {
            event.preventDefault();
            event.stopPropagation();
            openSearch();
            buscaInput.focus();
            return;
          }
        });

        buscaInput.addEventListener('focus', openSearch);
        menuSearch.addEventListener('click', (event) => {
          event.stopPropagation();
        });

        document.addEventListener('click', (event) => {
          if (menuSearch.classList.contains('menu-search-open') && !event.target.closest('.menu-search')) {
            closeSearch();
          }
        });
      }

    const normalizeText = (text) => (text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const tokensFrom = (text) => normalizeText(text).split(' ').filter(Boolean);

    const matchesTokens = (haystack, tokens) => tokens.every((token) => haystack.includes(token));

    const siteRoot = getSiteRoot();
    const searchPageUrl = new URL('pesquisa.html', siteRoot).toString();

    const SEARCH_PAGES = [
      'paginaInicial.html',
      'MenuHorizontal/Transparencia/remuneracao.html',
      'MenuHorizontal/Transparencia/prestacaoFEH.html',
      'MenuHorizontal/Transparencia/prestacaoCohab.html',
      'MenuHorizontal/Transparencia/informacoes.html',
      'MenuHorizontal/Transparencia/documentos.html',
      'MenuHorizontal/Transparencia/dados.html',
      'MenuHorizontal/Mutuarios/transferenciaFincan.html',
      'MenuHorizontal/Mutuarios/seguros.html',
      'MenuHorizontal/Mutuarios/plantas.html',
      'MenuHorizontal/Mutuarios/manual.html',
      'MenuHorizontal/Mutuarios/liquidacao.html',
      'MenuHorizontal/Mutuarios/escrituras.html',
      'MenuHorizontal/Mutuarios/segundaViaBoletos.html',
      'MenuHorizontal/Mutuarios/contrato.html',
      'MenuHorizontal/Mutuarios/bonus.html',
      'MenuHorizontal/Atendimento/perguntas.html',
      'MenuHorizontal/Atendimento/ouvidoria.html',
      'MenuHorizontal/Atendimento/imoveis.html',
      'MenuHorizontal/Licitacoes/licitacoes.html',
      'MenuHorizontal/Licitacoes/dataroom.html',
      'MenuHorizontal/Licitacoes/contratos.html',
      'MenuHorizontal/Atendimento/faleConosco.html',
      'MenuHorizontal/Atendimento/comoParticipar.html',
      'MenuHorizontal/Atendimento/cohabMaisPerto.html',
      'MenuHorizontal/Atendimento/cadastro.html',
      'MenuHorizontal/Institucional/quemEquem.html',
      'MenuHorizontal/Institucional/planejamento.html',
      'MenuHorizontal/Institucional/noticias.html',
      'MenuHorizontal/Institucional/legislacao.html',
      'MenuHorizontal/Institucional/conselhos.html',
      'MenuHorizontal/Institucional/historia.html',
      'MenuHorizontal/Institucional/estrutura.html',
      'MenuHorizontal/Governanca/relatorioAUD.html',
      'MenuHorizontal/Governanca/etica.html',
      'MenuHorizontal/Governanca/relatorioADM.html',
      'MenuHorizontal/Governanca/estrategia.html',
      'MenuHorizontal/Governanca/lgpd.html',
      'MenuHorizontal/Governanca/dividendos.html',
      'MenuHorizontal/Governanca/integridade.html',
      'MenuHorizontal/Governanca/cartaAnual.html',
      'MenuHorizontal/Institucional/informacoes.html',
      'MenuHorizontal/Governanca/acionistas.html'
    ];

    const menuLinks = Array.from(document.querySelectorAll('.header-menu .submenu a[href]'))
      .map((link) => {
        const label = (link.textContent || '').trim();
        const href = link.getAttribute('href') || '';
        const parentMenu = link.closest('.header-menu-item');
        const section = parentMenu?.querySelector(':scope > a')?.textContent?.trim() || '';
        return {
          label,
          href,
          absolute: link.href || '',
          section
        };
      })
      .filter((item) => item.label && item.href && item.href !== '#');

    buscaForm.setAttribute('autocomplete', 'off');
    buscaForm.style.position = 'relative';

    const sugestoes = document.createElement('div');
    sugestoes.className = 'busca-sugestoes';
    sugestoes.setAttribute('role', 'listbox');
    sugestoes.setAttribute('aria-label', 'Sugestoes de busca');
    buscaForm.appendChild(sugestoes);

    const status = document.createElement('div');
    status.className = 'busca-status';
    status.setAttribute('aria-live', 'polite');
    buscaForm.appendChild(status);

    let indexPromise = null;
    let pageIndex = [];

    const buildBlocks = (doc) => {
      const root = doc.querySelector('main') || doc.body;
      const title = (doc.querySelector('title')?.textContent || '').trim();
      const nodes = root ? Array.from(root.querySelectorAll('h1,h2,h3,h4,p,li,td,dd,dt')) : [];
      let currentHeading = title;
      const blocks = [];

      nodes.forEach((node) => {
        const tag = node.tagName.toLowerCase();
        const text = (node.textContent || '').replace(/\s+/g, ' ').trim();
        if (!text) return;
        if (tag.startsWith('h')) {
          currentHeading = text;
          return;
        }
        blocks.push({
          heading: currentHeading,
          text,
          normalized: normalizeText(text)
        });
      });

      return { title: title || currentHeading || 'Sem titulo', blocks };
    };

    const loadIndex = async () => {
      if (indexPromise) return indexPromise;
      status.textContent = 'Carregando resultados...';

      indexPromise = Promise.all(SEARCH_PAGES.map(async (path) => {
        const url = new URL(path, siteRoot).toString();
        try {
          const response = await fetch(url, { cache: 'no-store' });
          if (!response.ok) return null;
          const html = await response.text();
          const doc = new DOMParser().parseFromString(html, 'text/html');
          const { title, blocks } = buildBlocks(doc);
          return {
            path,
            url,
            title,
            normalizedTitle: normalizeText(title),
            blocks
          };
        } catch (err) {
          return null;
        }
      }));

      const loaded = (await indexPromise).filter(Boolean);
      pageIndex = loaded;
      status.textContent = '';
      return loaded;
    };

    const makeSnippet = (text, queryNorm) => {
      const normalized = normalizeText(text);
      const index = normalized.indexOf(queryNorm);
      if (index < 0) {
        return text.length > 160 ? `${text.slice(0, 160)}...` : text;
      }
      const start = Math.max(index - 45, 0);
      const end = Math.min(index + queryNorm.length + 60, text.length);
      const prefix = start > 0 ? '...' : '';
      const suffix = end < text.length ? '...' : '';
      return `${prefix}${text.slice(start, end)}${suffix}`;
    };

    const findContentMatches = async (queryNorm, tokens) => {
      const pages = await loadIndex();
      const results = [];

      pages.forEach((page) => {
        if (!matchesTokens(page.normalizedTitle, tokens)) {
          const block = page.blocks.find((b) => matchesTokens(b.normalized, tokens));
          if (!block) return;
          results.push({
            title: page.title,
            url: page.url,
            location: block.heading || page.title,
            snippet: makeSnippet(block.text, queryNorm)
          });
        } else {
          results.push({
            title: page.title,
            url: page.url,
            location: 'Titulo da pagina',
            snippet: `Pagina: ${page.title}`
          });
        }
      });

      return results;
    };

    const clearSugestoes = () => {
      sugestoes.innerHTML = '';
      sugestoes.classList.remove('aberto');
    };

    const addGroupLabel = (text) => {
      const label = document.createElement('div');
      label.className = 'busca-sugestao-grupo';
      label.textContent = text;
      sugestoes.appendChild(label);
    };

    const addSuggestionItem = (config) => {
      const item = document.createElement('a');
      item.className = 'busca-sugestao-item';
      item.href = config.href;
      if (config.target) item.target = config.target;
      if (config.rel) item.rel = config.rel;

      const title = document.createElement('div');
      title.className = 'busca-sugestao-titulo';
      title.textContent = config.title;

      const subtitle = document.createElement('div');
      subtitle.className = 'busca-sugestao-subtitulo';
      subtitle.textContent = config.subtitle;

      item.appendChild(title);
      item.appendChild(subtitle);

      if (config.snippet) {
        const snippet = document.createElement('div');
        snippet.className = 'busca-sugestao-snippet';
        snippet.textContent = config.snippet;
        item.appendChild(snippet);
      }

      sugestoes.appendChild(item);
    };

    const showSugestoes = async () => {
      const rawQuery = buscaInput.value;
      const queryNorm = normalizeText(rawQuery);
      const tokens = tokensFrom(rawQuery);

      if (!queryNorm || queryNorm.length < 2) {
        clearSugestoes();
        return;
      }

      sugestoes.innerHTML = '';

      const menuMatches = menuLinks.filter((item) => matchesTokens(normalizeText(item.label), tokens));

      if (menuMatches.length) {
        addGroupLabel('Menu principal');
        menuMatches.slice(0, 6).forEach((item) => {
          addSuggestionItem({
            href: item.absolute || item.href,
            title: item.label,
            subtitle: item.section ? `Local: ${item.section}` : 'Menu principal'
          });
        });
      }

      const contentMatches = await findContentMatches(queryNorm, tokens);

      if (contentMatches.length) {
        addGroupLabel('Conteudo das paginas');
        contentMatches.slice(0, 6).forEach((item) => {
          addSuggestionItem({
            href: item.url,
            title: item.title,
            subtitle: `Local: ${item.location}`,
            snippet: item.snippet
          });
        });
      }

      addGroupLabel('Pesquisa completa');
      addSuggestionItem({
        href: `${searchPageUrl}?q=${encodeURIComponent(rawQuery)}`,
        title: 'Ver toda pesquisa',
        subtitle: 'Abrir pagina de resultados'
      });

      sugestoes.classList.add('aberto');
    };

    buscaInput.addEventListener('input', () => {
      showSugestoes();
    });

    buscaInput.addEventListener('focus', () => {
      showSugestoes();
    });

    document.addEventListener('click', (event) => {
      if (!buscaForm.contains(event.target)) {
        clearSugestoes();
      }
    });

    buscaForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const query = buscaInput.value.trim();
      if (!query) return;
      const currentParams = new URLSearchParams(window.location.search);
      const currentQuery = (currentParams.get('q') || '').trim();
      const isSearchPage = window.location.pathname.toLowerCase().includes('pesquisa.html');
      if (isSearchPage && currentQuery === query) return;
      window.location.href = `${searchPageUrl}?q=${encodeURIComponent(query)}`;
    });

    const resultsContainer = document.getElementById('pesquisa-resultados');
    if (resultsContainer) {
      const params = new URLSearchParams(window.location.search);
      const query = params.get('q') || '';
      const titulo = document.getElementById('pesquisa-titulo');
      const resumo = document.getElementById('pesquisa-termo');

      if (titulo) titulo.textContent = 'Resultados da pesquisa';
      if (resumo) resumo.textContent = query ? `Termo: ${query}` : 'Digite um termo para pesquisar.';
      buscaInput.value = query;

      if (query) {
        resultsContainer.innerHTML = '<div class="busca-loading">Buscando resultados...</div>';
        findContentMatches(normalizeText(query), tokensFrom(query)).then((results) => {
          if (!results.length) {
            resultsContainer.innerHTML = '<div class="busca-empty">Nenhum resultado encontrado.</div>';
            return;
          }
          resultsContainer.innerHTML = '';
          results.forEach((item) => {
            const card = document.createElement('a');
            card.className = 'busca-resultado';
            card.href = item.url;
            card.innerHTML = `
              <div class="busca-resultado-titulo">${item.title}</div>
              <div class="busca-resultado-local">Local: ${item.location}</div>
              <div class="busca-resultado-snippet">${item.snippet}</div>
            `;
            resultsContainer.appendChild(card);
          });
        });
      }
    }
  }

  // Breadcrumbs
  const breadcrumbHeader = document.querySelector('.site-header');
  const breadcrumbMain = document.querySelector('main');
  const breadcrumbPath = window.location.pathname || '';
  const breadcrumbIsMenu = breadcrumbPath.toLowerCase().includes('/menuhorizontal/');

  if (breadcrumbHeader && breadcrumbMain && breadcrumbIsMenu && !document.querySelector('.breadcrumbs')) {
    const normalizePath = (value) => decodeURIComponent(value || '')
      .toLowerCase()
      .replace(/\/index\.html$/, '/')
      .replace(/\/$/, '');

    const currentPath = normalizePath(breadcrumbPath);

    const linkData = Array.from(breadcrumbHeader.querySelectorAll('.header-menu .submenu a[href]'))
      .map((link) => {
        const href = link.getAttribute('href') || '';
        if (!href || href === '#') return null;
        const url = new URL(href, window.location.href);
        const section = link.closest('.header-menu-item')?.querySelector(':scope > a')?.textContent?.trim() || '';
        return {
          label: (link.textContent || '').trim(),
          section,
          path: normalizePath(url.pathname)
        };
      })
      .filter(Boolean);

    let currentEntry = linkData.find((item) => item.path === currentPath);
    if (!currentEntry) {
      currentEntry = linkData.find((item) => currentPath.endsWith(item.path) || item.path.endsWith(currentPath));
    }

    const titleNode = document.querySelector('#titulo, h1');
    const pageLabel = currentEntry?.label || (titleNode?.textContent || '').trim() || document.title || 'Pagina';
    const sectionLabel = currentEntry?.section || '';

    const siteRoot = getSiteRoot();
    const homeUrl = new URL('paginaInicial.html', siteRoot).toString();

    const nav = document.createElement('nav');
    nav.className = 'breadcrumbs';
    nav.setAttribute('aria-label', 'Breadcrumb');
    const list = document.createElement('ol');

    const addItem = (label, href) => {
      const li = document.createElement('li');
      if (href) {
        const a = document.createElement('a');
        a.href = href;
        a.textContent = label;
        li.appendChild(a);
      } else {
        const span = document.createElement('span');
        span.textContent = label;
        li.appendChild(span);
      }
      list.appendChild(li);
    };

    addItem('Inicio', homeUrl);
    if (sectionLabel && sectionLabel != pageLabel) addItem(sectionLabel);
    addItem(pageLabel);

    nav.appendChild(list);

    const bar = document.createElement('div');
    bar.className = 'breadcrumbs-bar';
    bar.appendChild(nav);
    breadcrumbHeader.insertAdjacentElement('afterend', bar);

  }

  const header = document.querySelector('.site-header');
  const contentMarker = document.querySelector('#conteudo');
  if (header && contentMarker) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            header.classList.add('header-hidden-after-hero');
          } else {
            header.classList.remove('header-hidden-after-hero');
          }
        });
      },
      {
        root: null,
        threshold: 0,
      }
    );

    observer.observe(contentMarker);
  }

  // Acessos rapidos: mostrar avisos automaticamente, um por vez
  (function () {
    const items = Array.from(document.querySelectorAll('.acesso-rapido'));
    const container = document.querySelector('.acessos-rapidos');
    if (!items.length || !container) {
      return;
    }

    const intervalMs = 1500;
    const resumeDelayMs = 1000;
    let currentIndex = 0;
    let timerId = null;
    let resumeTimerId = null;
    let manualItem = null;

    const clearTipClasses = () => {
      items.forEach((item) => item.classList.remove('is-tip'));
    };

    const showCurrent = () => {
      clearTipClasses();
      const item = manualItem || items[currentIndex];
      if (!item) {
        return;
      }
      item.classList.add('is-tip');
    };

    const advance = () => {
      currentIndex = (currentIndex + 1) % items.length;
      showCurrent();
    };

    const stopCycle = () => {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
    };

    const startCycle = () => {
      if (timerId) {
        return;
      }
      timerId = window.setInterval(advance, intervalMs);
    };

    const pauseCycle = (item) => {
      manualItem = item;
      if (resumeTimerId) {
        clearTimeout(resumeTimerId);
        resumeTimerId = null;
      }
      stopCycle();
      if (item) {
        const idx = items.indexOf(item);
        if (idx >= 0) {
          currentIndex = idx;
        }
      }
      showCurrent();
    };

    const scheduleResume = () => {
      if (resumeTimerId) {
        clearTimeout(resumeTimerId);
      }
      resumeTimerId = window.setTimeout(() => {
        manualItem = null;
        showCurrent();
        startCycle();
      }, resumeDelayMs);
    };

    showCurrent();
    startCycle();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopCycle();
        return;
      }
      startCycle();
      showCurrent();
    });

    items.forEach((item) => {
      item.addEventListener('mouseenter', () => pauseCycle(item));
      item.addEventListener('mouseleave', scheduleResume);
      item.addEventListener('focusin', () => pauseCycle(item));
      item.addEventListener('focusout', scheduleResume);
      item.addEventListener('pointerdown', () => pauseCycle(item));
      item.addEventListener('pointerup', scheduleResume);
      item.addEventListener('pointercancel', scheduleResume);
      item.addEventListener('touchend', scheduleResume, { passive: true });
    });
})();

// Segunda via de boletos (Mutuarios) - integracao Elógica
(() => {
  const form = document.getElementById('boleto-form');
  if (!form) return;

  const API_BASE = 'https://apisegundaviacohabmg.elogica.info';
  const PDF_BASE = 'MenuHorizontal/Mutuarios/segundaViaBoletos.htmlpdf/';
  const INFORME_BASE = 'MenuHorizontal/Mutuarios/segundaViaBoletos.htmlinforme/?contrato=';

  const tipoRadios = Array.from(document.querySelectorAll('input[name="tipo-acesso"]'));
  const contratoInput = document.getElementById('contrato');
  const cpfInput = document.getElementById('cpf');
  const labelContrato = document.getElementById('label-contrato');
  const labelCpf = document.getElementById('label-cpf');
  const celularInput = document.getElementById('celular');

  const emissaoSection = document.getElementById('emissao-section');
  const emissaoOpcoes = document.getElementById('emissao-opcoes');
  const emissaoNota = document.getElementById('emissao-nota');
  const emissaoOverlay = document.getElementById('emissao-overlay');
  const emissaoConfirmar = document.getElementById('emissao-confirmar');
  const emissaoCancelar = document.getElementById('emissao-cancelar');

  const statusCard = document.getElementById('boleto-status');
  const statusText = document.getElementById('boleto-status-text');
  const contratosLista = document.getElementById('contratos-lista');
  const contratosOpcoes = document.getElementById('contratos-opcoes');

  const dadosCard = document.getElementById('mutuario-dados');
  const dadosContrato = document.getElementById('dados-contrato');
  const dadosNome = document.getElementById('dados-nome');
  const dadosNascimento = document.getElementById('dados-nascimento');
  const dadosTipo = document.getElementById('dados-tipo');
  const dadosCpf = document.getElementById('dados-cpf');
  const dadosVencimento = document.getElementById('dados-vencimento');
  const dadosEndereco = document.getElementById('dados-endereco');
  const dadosEmail = document.getElementById('dados-email');
  const btnInforme = document.getElementById('btn-informe');

  const prestacoesForm = document.getElementById('prestacoes-form');
  const prestacoesBody = document.getElementById('prestacoes-body');
  const prestacoesTodos = document.getElementById('prestacoes-todos');
  const prestacoesContrato = document.getElementById('prestacoes-contrato');
  const prestacoesAcordo = document.getElementById('prestacoes-acordo');
  const btnGerarBoleto = document.getElementById('btn-gerar-boleto');
  const valTot = document.getElementById('val-tot');

  const resultCard = document.getElementById('boleto-result');
  const resumoText = document.getElementById('boleto-resumo');
  const linhaDigitavelInput = document.getElementById('linha-digitavel');
  const btnCopiarLinha = document.getElementById('btn-copiar-linha');
  const whatsappBtn = document.getElementById('btn-whatsapp');
  const downloadBtn = document.getElementById('btn-download');
  const printBtn = document.getElementById('btn-print');
  const inlineBtn = document.getElementById('btn-inline');
  const viewerSection = document.getElementById('boleto-visualizacao');
  const pdfFrame = document.getElementById('boleto-pdf');

  const stepper = document.getElementById('boleto-stepper');
  const stepPrev = document.getElementById('step-prev');
  const stepNext = document.getElementById('step-next');
  const stepTitle = document.getElementById('step-title');
  const stepperNav = stepper ? stepper.querySelector('.stepper-nav') : null;
  const stepPanels = stepper ? Array.from(stepper.querySelectorAll('.step-panel')) : [];
  let currentStep = 0;

  const state = {
    contrato: '',
    tipoEmissao: '',
    celular: '',
    prestacoes: [],
    boleto: null,
    pendingContrato: '',
    emissaoPopupShown: false
  };

  const apenasDigitos = (valor) => valor.replace(/\D/g, '');

  const formatarCpf = (valor) => {
    const digitos = apenasDigitos(valor).slice(0, 11);
    if (digitos.length <= 3) return digitos;
    if (digitos.length <= 6) return `${digitos.slice(0, 3)}.${digitos.slice(3)}`;
    if (digitos.length <= 9) return `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6)}`;
    return `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6, 9)}-${digitos.slice(9, 11)}`;
  };

  const formatarCelular = (valor) => {
    const digitos = apenasDigitos(valor).slice(0, 11);
    if (digitos.length <= 2) return digitos ? `(${digitos}` : '';
    if (digitos.length <= 6) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
    if (digitos.length <= 10) return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
  };

  const formatarContrato = (valor) => {
    const digitos = apenasDigitos(valor).slice(0, 20);
    if (!digitos) return '';
    let resultado = digitos.slice(0, 3);
    if (digitos.length > 3) resultado += `.${digitos.slice(3, 6)}`;
    if (digitos.length > 6) resultado += `.${digitos.slice(6, 10)}`;
    if (digitos.length > 10) resultado += `.${digitos.slice(10, 19)}`;
    if (digitos.length > 19) resultado += `-${digitos.slice(19, 20)}`;
    return resultado;
  };

  const formatarMoeda = (valor) => {
    const numero = Number.isFinite(valor) ? valor : 0;
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numero);
  };

  const parseNumero = (valor) => {
    if (typeof valor === 'number') return valor;
    if (!valor) return 0;
    const texto = valor.toString().trim();
    if (!texto) return 0;
    if (texto.includes(',')) {
      return parseFloat(texto.replace(/\./g, '').replace(',', '.')) || 0;
    }
    if (texto.includes('.')) {
      return parseFloat(texto.replace(/[^0-9.-]/g, '')) || 0;
    }
    return parseFloat(texto) || 0;
  };

  const mostrarStatus = (mensagem) => {
    statusText.textContent = mensagem;
    statusCard.classList.remove('hidden');
  };

  const limparStatus = () => {
    statusText.textContent = '';
    statusCard.classList.add('hidden');
  };

  const mostrarResultado = () => {
    if (stepper) {
      unlockStep(4, true);
      return;
    }
    if (resultCard) {
      resultCard.classList.remove('hidden');
    }
  };

  const esconderResultado = () => {
    if (!stepper && resultCard) {
      resultCard.classList.add('hidden');
    }
    viewerSection.classList.add('hidden');
    pdfFrame.removeAttribute('src');
  };

  const isStepLocked = (index) => {
    if (!stepPanels[index]) return true;
    return stepPanels[index].classList.contains('step-locked');
  };

  const getNextUnlockedIndex = (from) => {
    for (let i = from + 1; i < stepPanels.length; i += 1) {
      if (!isStepLocked(i)) return i;
    }
    return null;
  };

  const getPrevUnlockedIndex = (from) => {
    for (let i = from - 1; i >= 0; i -= 1) {
      if (!isStepLocked(i)) return i;
    }
    return null;
  };

  const updateStepper = () => {
    if (!stepper || !stepPanels.length) return;
    if (stepperNav) {
      const desbloqueados = stepPanels.filter((panel) => !panel.classList.contains('step-locked')).length;
      stepperNav.classList.toggle('stepper-nav--hidden', desbloqueados <= 1);
    }
    stepPanels.forEach((panel, index) => {
      panel.classList.toggle('is-active', index === currentStep);
    });
    if (stepTitle) {
      stepTitle.textContent = stepPanels[currentStep]?.dataset.title || '';
    }
    if (stepPrev) {
      stepPrev.disabled = getPrevUnlockedIndex(currentStep) === null;
    }
    if (stepNext) {
      stepNext.disabled = getNextUnlockedIndex(currentStep) === null;
    }
  };

  const setStep = (index) => {
    if (!stepper || index === null || index === undefined) return;
    if (!stepPanels[index] || isStepLocked(index)) return;
    currentStep = index;
    updateStepper();
  };

  const unlockStep = (index, move = false) => {
    if (!stepper || !stepPanels[index]) return;
    stepPanels[index].classList.remove('step-locked');
    if (move) {
      currentStep = index;
    }
    updateStepper();
  };

  const lockStepsFrom = (index) => {
    if (!stepper || !stepPanels.length) return;
    for (let i = index; i < stepPanels.length; i += 1) {
      stepPanels[i].classList.add('step-locked');
    }
    if (currentStep >= index) {
      const fallback = getPrevUnlockedIndex(index) ?? 0;
      currentStep = fallback;
    }
    updateStepper();
  };

  const abrirEmissaoPopup = () => {
    if (!emissaoOverlay) return;
    document.body.classList.add('emissao-popup-active');
    emissaoOverlay.setAttribute('aria-hidden', 'false');
  };

  const fecharEmissaoPopup = () => {
    if (!emissaoOverlay) return;
    document.body.classList.remove('emissao-popup-active');
    emissaoOverlay.setAttribute('aria-hidden', 'true');
  };

  const definirVisibilidade = (campo, label, visivel) => {
    campo.classList.toggle('hidden', !visivel);
    label.classList.toggle('hidden', !visivel);
    campo.required = visivel;
    if (!visivel) campo.value = '';
  };

  const limparFluxo = () => {
    state.contrato = '';
    state.tipoEmissao = '';
    state.prestacoes = [];
    state.boleto = null;
    state.pendingContrato = '';
    state.emissaoPopupShown = false;
    fecharEmissaoPopup();
    emissaoSection.classList.add('hidden');
    emissaoOpcoes.innerHTML = '';
    emissaoNota.textContent = '';
    contratosOpcoes.innerHTML = '';
    if (prestacoesTodos) prestacoesTodos.checked = false;
    prestacoesBody.innerHTML = '<tr><td colspan="11" class="text-center text-muted">Nenhuma prestação carregada.</td></tr>';
    prestacoesContrato.value = '';
    prestacoesAcordo.value = '';
    if (btnGerarBoleto) btnGerarBoleto.disabled = true;
    if (valTot) valTot.textContent = 'R$ 0,00';
    esconderResultado();
    lockStepsFrom(1);
  };

  const atualizarTipo = () => {
    const selecionado = form.querySelector('input[name="tipo-acesso"]:checked');
    const tipo = selecionado ? selecionado.value : 'contrato';
    const isContrato = tipo === 'contrato';
    definirVisibilidade(contratoInput, labelContrato, isContrato);
    definirVisibilidade(cpfInput, labelCpf, !isContrato);
  };

  const mostrarContratos = (contratos) => {
    contratosOpcoes.innerHTML = '';
    contratos.forEach((contrato) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'cpf-card';
      const row = document.createElement('div');
      row.className = 'cpf-row';
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'cpf-input';
      input.value = contrato;
      input.readOnly = true;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'cpf-button';
      button.textContent = 'Selecionar';
      button.addEventListener('click', () => {
        contratoInput.value = contrato;
        atualizarTipo();
        setStep(0);
        iniciarContrato(contrato);
      });
      row.appendChild(input);
      row.appendChild(button);
      wrapper.appendChild(row);
      contratosOpcoes.appendChild(wrapper);
    });
    unlockStep(1, true);
  };

  const aplicarOpcoesEmissao = (opcoes) => {
    emissaoOpcoes.innerHTML = '';
    emissaoSection.classList.remove('hidden');
    let selecionado = state.tipoEmissao;

    opcoes.forEach((opcao, index) => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'tipo-emissao';
      input.value = opcao.value;
      if (selecionado && selecionado === opcao.value) {
        input.checked = true;
      }
      if (!selecionado && opcoes.length === 1 && index === 0) {
        input.checked = true;
        selecionado = opcao.value;
      }
      input.addEventListener('change', () => {
        state.tipoEmissao = input.value;
      });
      label.appendChild(input);
      label.appendChild(document.createTextNode(` ${opcao.label}`));
      emissaoOpcoes.appendChild(label);
    });

    state.tipoEmissao = selecionado || '';
    emissaoNota.textContent = opcoes.length === 1
      ? 'Tipo de emissao definido automaticamente.'
      : 'Selecione o tipo de emissao e clique em continuar.';
  };

  const obterTipoEmissaoSelecionado = () => {
    const selecionado = emissaoOpcoes.querySelector('input[name="tipo-emissao"]:checked');
    return selecionado ? selecionado.value : '';
  };

  const carregarContrato = async (contrato) => {
    mostrarStatus('Carregando dados do mutuário...');
    const mutuario = await fetchJson(`${API_BASE}/autenticacao/${encodeURIComponent(contrato)}`);
    preencherDadosMutuario(mutuario);

    const dataPrestacoes = new URLSearchParams();
    dataPrestacoes.set('contrato', contrato);
    dataPrestacoes.set('tipoEmissao', state.tipoEmissao);

    const prestacoes = await fetchJson(`${API_BASE}/lista-prestacoes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/json'
      },
      body: dataPrestacoes.toString()
    });

    if (Array.isArray(prestacoes) && prestacoes.length > 1) {
      state.tipoEmissao = '2';
      const radio = emissaoOpcoes.querySelector('input[value="2"]');
      if (radio) radio.checked = true;
    }

    state.prestacoes = Array.isArray(prestacoes) ? prestacoes : [];
    renderPrestacoes(state.prestacoes);
    unlockStep(3, true);
    mostrarStatus('Selecione a(s) prestação(ões) para gerar o boleto.');
    state.pendingContrato = '';
  };

  const fetchJson = async (url, options) => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Falha na resposta da API (${response.status}).`);
    }
    return response.json();
  };

  const preencherDadosMutuario = (json) => {
    const endereco = json.localidade
      ? `${json.localidade.endereco || ''} ${json.localidade.bairro || ''}, ${json.localidade.municipio || ''} - ${json.localidade.uf || ''}`.trim()
      : '';
    dadosContrato.value = json.dados?.resultado || '';
    dadosNome.value = json.nome || '';
    dadosNascimento.value = json.dtnasc || '';
    dadosTipo.value = json.tipo_pessoa?.descricao || '';
    dadosCpf.value = json.cnpj_cpf || '';
    dadosVencimento.value = json.vencimento || '';
    dadosEndereco.value = endereco;
    dadosEmail.value = json.email || 'Ainda nao informado';
    prestacoesContrato.value = json.dados?.resultado || state.contrato;
    if (btnInforme) {
      btnInforme.disabled = false;
    }
    unlockStep(2);
  };

  const renderPrestacoes = (prestacoes) => {
    prestacoesBody.innerHTML = '';
    if (!prestacoes.length) {
      prestacoesBody.innerHTML = '<tr><td colspan="11" class="text-center text-muted">Nenhuma prestação encontrada.</td></tr>';
      return;
    }

    prestacoes.forEach((item) => {
      const tr = document.createElement('tr');
      const tdCheck = document.createElement('td');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'prt[]';
      checkbox.value = item.prt;
      checkbox.dataset.total = item.somatorio;
      checkbox.dataset.acordo = item.acordo;
      checkbox.dataset.conjugado = item.conjugado || '';
      tdCheck.appendChild(checkbox);
      tr.appendChild(tdCheck);

      const criarCelula = (texto, classe) => {
        const td = document.createElement('td');
        if (classe) td.className = classe;
        td.textContent = texto || '';
        tr.appendChild(td);
      };

      criarCelula(item.prestacao, 'text-center');
      criarCelula(item.vencimento, 'text-center');
      criarCelula(item.encargo, 'text-right');
      criarCelula(item.fgts, 'text-right d-none d-lg-table-cell');
      criarCelula(item.mora, 'text-right d-none d-md-table-cell');
      criarCelula(item.acres_abat, 'text-right d-none d-lg-table-cell');
      criarCelula(item.atualizacao, 'text-right d-none d-md-table-cell');
      criarCelula(item.juros_rem, 'text-right d-none d-md-table-cell');
      criarCelula(item.multa, 'text-right d-none d-md-table-cell');
      criarCelula(item.total, 'text-right');

      prestacoesBody.appendChild(tr);

      checkbox.addEventListener('change', () => {
        if (checkbox.dataset.conjugado) {
          const conjugado = checkbox.dataset.conjugado;
          const checked = checkbox.checked;
          prestacoesBody.querySelectorAll('input[name="prt[]"]').forEach((cb) => {
            if (cb.dataset.conjugado === conjugado) {
              cb.checked = checked;
            }
          });
        }
        atualizarTotais();
      });
    });

    atualizarTotais();
  };

  const atualizarTotais = () => {
    const checkboxes = Array.from(prestacoesBody.querySelectorAll('input[name="prt[]"]'));
    let total = 0;
    let acordo = '';
    let algumSelecionado = false;

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        algumSelecionado = true;
        total += parseNumero(checkbox.dataset.total);
        if (checkbox.dataset.acordo) {
          acordo += acordo ? `_${checkbox.dataset.acordo}` : checkbox.dataset.acordo;
        }
      }
    });

    prestacoesAcordo.value = acordo;
    if (valTot) valTot.textContent = formatarMoeda(total);
    if (btnGerarBoleto) btnGerarBoleto.disabled = !algumSelecionado;
  };

  const montarDadosFormBoleto = (formulario, json, tipoEmissao) => {
    const adicionar = (nome, valor) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = nome;
      input.value = valor ?? '';
      formulario.appendChild(input);
    };

    const texto0 = json.texto?.[0] ?? json.texto?.['0'] ?? '';
    const texto1 = json.texto?.[1] ?? json.texto?.['1'] ?? '';

    adicionar('contrato', json.contrato);
    adicionar('nome', json.nome);
    adicionar('bairro', json.bairro);
    adicionar('endereco', json.endereco);
    adicionar('cep', json.cep);
    adicionar('municipio', json.municipio);
    adicionar('uf', json.uf);
    adicionar('valor_total', json.valor_total);
    adicionar('texto[]', texto0);
    adicionar('texto[]', texto1);
    adicionar('data_validade', json.data_validade);
    adicionar('data_documento', json.data_documento);
    adicionar('especie_doc', json.especie_doc);
    adicionar('data_processamento', json.data_processamento);
    adicionar('codigo_cedente', json.codigo_cedente || json.codigoCedente);
    adicionar('moeda', json.moeda);
    adicionar('num_rec', json.num_rec);
    adicionar('linha_digitavel', json.linha_digitavel);

    if (parseInt(tipoEmissao, 10) === 2) {
      (json.prestacoes || []).forEach((item) => {
        adicionar('prt[]', item.prt);
        adicionar('vencimento[]', item.vencimento);
        adicionar('encargo[]', item.encargo);
        adicionar('dif_prt[]', item.dif_prt);
        adicionar('fgts[]', item.fgts);
        adicionar('acres_abat[]', item.acres_abat);
        adicionar('onus_atraso[]', item.onus_atraso);
        adicionar('total[]', item.total);
      });
    } else {
      (json.dadosImpressao || []).forEach((item) => {
        adicionar('conteudo[]', item.conteudo);
        adicionar('linha[]', item.linha);
        adicionar('coluna[]', item.coluna);
        adicionar('fonte[]', item.fonte);
      });
    }

    adicionar('codbarra', json.codbarra);
  };

  const enviarPdf = (acao, target) => {
    if (!state.boleto) return;
    const tipo = parseInt(state.boleto.contrato?.substring(0, 3), 10);
    const url = new URL(PDF_BASE);
    if (acao) url.searchParams.set('acao', acao);
    url.searchParams.set('tipoEmissao', state.tipoEmissao);
    if (!Number.isNaN(tipo)) {
      url.searchParams.set('type', tipo.toString());
    }

    const formPdf = document.createElement('form');
    formPdf.method = 'POST';
    formPdf.action = url.toString();
    formPdf.target = target;
    montarDadosFormBoleto(formPdf, state.boleto, state.tipoEmissao);
    document.body.appendChild(formPdf);
    formPdf.submit();
    setTimeout(() => formPdf.remove(), 800);
  };

  const prepararResultado = (json) => {
    state.boleto = json;
    const linha = (json.linha_digitavel || '').replace(/\s+/g, '');
    linhaDigitavelInput.value = linha;
    resumoText.textContent = linha ? `Linha digitavel: ${linha}` : 'Boleto gerado com sucesso.';
    mostrarResultado();
  };

  tipoRadios.forEach((radio) => radio.addEventListener('change', () => {
    atualizarTipo();
    limparFluxo();
  }));
  atualizarTipo();

  if (cpfInput) {
    cpfInput.addEventListener('input', (event) => {
      event.target.value = formatarCpf(event.target.value);
    });
  }

  if (celularInput) {
    celularInput.addEventListener('input', (event) => {
      event.target.value = formatarCelular(event.target.value);
    });
  }

  if (contratoInput) {
    contratoInput.addEventListener('input', (event) => {
      event.target.value = formatarContrato(event.target.value);
    });
  }

  if (btnCopiarLinha) {
    btnCopiarLinha.addEventListener('click', () => {
      if (!linhaDigitavelInput.value) return;
      linhaDigitavelInput.select();
      document.execCommand('copy');
      mostrarStatus('Linha digitavel copiada!');
    });
  }

  if (emissaoCancelar) {
    emissaoCancelar.addEventListener('click', () => {
      fecharEmissaoPopup();
    });
  }

  if (emissaoConfirmar) {
    emissaoConfirmar.addEventListener('click', async () => {
      const tipoSelecionado = obterTipoEmissaoSelecionado();
      if (!tipoSelecionado) {
        mostrarStatus('Selecione o tipo de emissao para continuar.');
        return;
      }
      state.tipoEmissao = tipoSelecionado;
      fecharEmissaoPopup();
      if (state.pendingContrato) {
        try {
          await carregarContrato(state.pendingContrato);
        } catch (erro) {
          mostrarStatus(erro?.message || 'Nao foi possivel consultar o contrato.');
        }
      }
    });
  }

  if (btnInforme) {
    btnInforme.addEventListener('click', () => {
      if (!state.contrato) {
        mostrarStatus('Selecione um contrato para baixar o informe.');
        return;
      }
      window.open(`${INFORME_BASE}${encodeURIComponent(state.contrato)}`, '_blank', 'noopener');
    });
  }

  if (prestacoesTodos) {
    prestacoesTodos.addEventListener('change', () => {
      const checkboxes = prestacoesBody.querySelectorAll('input[name="prt[]"]');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = prestacoesTodos.checked;
      });
      atualizarTotais();
    });
  }

  if (prestacoesForm) {
    prestacoesForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      limparStatus();
      esconderResultado();

      const selecionados = Array.from(prestacoesBody.querySelectorAll('input[name="prt[]"]')).filter((cb) => cb.checked);
      if (!selecionados.length) {
        mostrarStatus('Selecione ao menos uma prestação para gerar o boleto.');
        return;
      }

      try {
        mostrarStatus('Gerando boleto...');
        const data = new URLSearchParams();
        data.set('contrato', state.contrato);
        data.set('acordo', prestacoesAcordo.value);
        data.set('tipoEmissao', state.tipoEmissao);
        selecionados.forEach((checkbox) => data.append('prt[]', checkbox.value));

        const json = await fetchJson(`${API_BASE}/boleto/gerar-dados/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': 'application/json'
          },
          body: data.toString()
        });

        prepararResultado(json);
        mostrarStatus('Boleto gerado com sucesso.');
      } catch (erro) {
        mostrarStatus(erro?.message || 'Nao foi possivel gerar o boleto.');
      }
    });
  }

  if (inlineBtn) {
    inlineBtn.addEventListener('click', () => {
      if (!state.boleto) {
        mostrarStatus('Gere o boleto antes de visualizar.');
        return;
      }
      enviarPdf('', 'boleto-pdf');
      viewerSection.classList.remove('hidden');
      viewerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      if (!state.boleto) {
        mostrarStatus('Gere o boleto antes de baixar.');
        return;
      }
      enviarPdf('download', '_blank');
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      if (!state.boleto) {
        mostrarStatus('Gere o boleto antes de imprimir.');
        return;
      }
      enviarPdf('', '_blank');
    });
  }

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      if (!state.boleto) {
        mostrarStatus('Gere o boleto antes de enviar via WhatsApp.');
        return;
      }
      if (!state.celular) {
        mostrarStatus('Informe um celular valido para enviar via WhatsApp.');
        return;
      }
      const numero = `55${state.celular}`;
      const linha = (state.boleto.linha_digitavel || '').replace(/\s+/g, '');
      const texto = linha
        ? `Linha digitavel do boleto: ${linha}`
        : 'Boleto gerado. Favor baixar o arquivo.';
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
      window.open(url, '_blank', 'noopener');
    });
  }

  const iniciarContrato = async (contrato) => {
    if (!contrato) {
      mostrarStatus('Informe o numero do contrato.');
      return;
    }

    state.contrato = contrato;
    try {
      mostrarStatus('Verificando contrato...');
      const status = await fetchJson(`${API_BASE}/quitado-tem-acordo/${encodeURIComponent(contrato)}`);
      const opcoes = [];
      if (status.temFidic === 1) {
        opcoes.push({ value: '3', label: 'Imposto de renda' });
      } else if (status.temAcordo === 1) {
        opcoes.push({ value: '2', label: 'Demonstrativo da divida' });
      } else {
        opcoes.push({ value: '1', label: 'Prestação do mes' });
        opcoes.push({ value: '2', label: 'Demonstrativo da divida' });
      }

      aplicarOpcoesEmissao(opcoes);
      const tipoSelecionado = obterTipoEmissaoSelecionado();
      if (!tipoSelecionado) {
        state.pendingContrato = contrato;
        if (!state.emissaoPopupShown) {
          state.emissaoPopupShown = true;
          abrirEmissaoPopup();
        }
        mostrarStatus('Selecione o tipo de emissao para continuar.');
        return;
      }
      state.tipoEmissao = tipoSelecionado;
      await carregarContrato(contrato);
    } catch (erro) {
      mostrarStatus(erro?.message || 'Não foi possivel consultar o contrato.');
    }
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    limparStatus();
    esconderResultado();
    lockStepsFrom(1);
    setStep(0);

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    state.celular = apenasDigitos(celularInput.value);
    const tipoSelecionado = form.querySelector('input[name="tipo-acesso"]:checked')?.value || 'contrato';

    if (tipoSelecionado === 'cpf') {
      const cpf = cpfInput.value.trim();
      if (!cpf) {
        mostrarStatus('Informe o CPF para continuar.');
        return;
      }
      try {
        mostrarStatus('Buscando contratos...');
        const contratos = await fetchJson(`${API_BASE}/lista-contratos-por-cpf/${encodeURIComponent(cpf)}`);
        if (!Array.isArray(contratos) || !contratos.length) {
          mostrarStatus('Nenhum contrato encontrado para este CPF.');
          return;
        }
        if (contratos.length === 1) {
          const contrato = contratos[0].resultado || contratos[0].contrato || '';
          contratoInput.value = contrato;
          atualizarTipo();
          iniciarContrato(contrato);
          return;
        }
        const lista = contratos.map((item) => item.resultado || item.contrato).filter(Boolean);
        mostrarContratos(lista);
        mostrarStatus('Selecione um contrato para continuar.');
        return;
      } catch (erro) {
        mostrarStatus(erro?.message || 'Nao foi possivel buscar contratos.');
        return;
      }
    }

    const contrato = contratoInput.value.trim();
    iniciarContrato(contrato);
  });

  contratoInput.addEventListener('input', () => {
    limparFluxo();
  });
  cpfInput.addEventListener('input', () => {
    limparFluxo();
  });

  if (stepPrev) {
    stepPrev.addEventListener('click', () => {
      setStep(getPrevUnlockedIndex(currentStep));
    });
  }

  if (stepNext) {
    stepNext.addEventListener('click', () => {
      setStep(getNextUnlockedIndex(currentStep));
    });
  }

  updateStepper();
})();

  // Footer
  (function () {
        var lastTarget = document.getElementById('ultima-atualizacao');
        var historyTarget = document.getElementById('historico-data');
        var responsavelTarget = document.getElementById('responsavel-conteudo');
        if (!lastTarget && !historyTarget && !responsavelTarget) return;

        var last = new Date(document.lastModified);
        var formatted = !isNaN(last.getTime()) ? last.toLocaleDateString('pt-BR') : document.lastModified;

        var formatDate = function (value) {
          if (!value) return '';
          if (value instanceof Date && !isNaN(value.getTime())) {
            return value.toLocaleDateString('pt-BR');
          }
          var raw = value.toString().trim();
          if (!raw) return '';
          if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) return raw;
          var parsed = new Date(raw);
          if (!isNaN(parsed.getTime())) {
            return parsed.toLocaleDateString('pt-BR');
          }
          return raw;
        };

        var applyHistory = function (dateText, descricao) {
          if (!historyTarget) return;
          var historySpan = historyTarget.parentElement;
          if (!historySpan) {
            historyTarget.textContent = dateText;
            return;
          }

          historySpan.innerHTML = '';
          historySpan.appendChild(document.createTextNode('Historico: '));

          var strong = document.createElement('strong');
          strong.id = 'historico-data';
          strong.textContent = dateText;
          historySpan.appendChild(strong);

          if (descricao) {
            historySpan.appendChild(document.createTextNode(' - ' + descricao));
          }
        };

        if (lastTarget) lastTarget.textContent = formatted;
        if (historyTarget) historyTarget.textContent = formatted;

        var siteRoot = typeof getSiteRoot === 'function'
          ? getSiteRoot()
          : new URL('./', window.location.href);

        var dataUrl = new URL('atualizacoes.json', siteRoot).toString();

        fetch(dataUrl)
          .then(function (res) {
            if (!res.ok) throw new Error('Falha ao carregar atualizacoes');
            return res.json();
          })
          .then(function (data) {
            if (!data || typeof data !== 'object') return;

            var ultima = formatDate(data.ultima_atualizacao) || formatted;
            if (lastTarget) lastTarget.textContent = ultima;

            var historicoData = formatDate(data.historico && data.historico.data) || '';
            var historicoDescricao = (data.historico && data.historico.descricao) || '';
            if (historyTarget && (historicoData || historicoDescricao)) {
              applyHistory(historicoData || ultima, historicoDescricao);
            }

            if (responsavelTarget && data.responsavel) {
              responsavelTarget.textContent = data.responsavel;
            }
          })
          .catch(function () {
            // Mantem fallback com document.lastModified
          });
    })();
    
  // Licitacoes
  (function () {
    var situacao = document.getElementById('situacao');
    var resultadoContainer = document.getElementById('resultado-container');
    var resultado = document.getElementById('resultado');
    var procedimento = document.getElementById('tipo_procedimento');
    var criterio = document.getElementById('criterio');
    var ano = document.getElementById('ano');
    var palavraChave = document.getElementById('palavra_chave');
    var limpar = document.getElementById('limpar-filtros');
    var form = document.getElementById('form-licitacoes');
    var resultsBody = document.querySelector('.licitacoes-results-body');
    var resultsHeader = document.querySelector('.licitacoes-results-header');
    var filtrosCard = document.querySelector('.licitacoes-card');

    if (!situacao || !resultadoContainer || !resultado || !procedimento || !criterio || !ano || !palavraChave || !limpar || !form || !resultsBody || !resultsHeader || !filtrosCard) {
      return;
    }

    var KEYS = {
      tipo: 'TIPO PROCEDIMENTO',
      situacao: 'SITUAÇÃO',
      ano: 'ANO',
      criterio: 'CRITÉRIO DE JULGAMENTO',
      resultado: 'RESULTADO',
      objeto: 'OBJETO',
      documentos: 'DOCUMENTOS',
      processo: 'PROCESSO SEI',
      peCohab: 'PE N° COHAB',
      procedimentoPortal: 'N° DO PROCEDIMENTO (PORTAL COMPRAS)',
      empresa: 'EMPRESA CONTRATADA/OBSERVAÇÃO',
      pregoeiro: 'PREGOEIRO/AGENTE DE CONTRATAÇÃO'
    };

    var normalize = function (value) {
      return (value || '')
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
    };

    var escapeHtml = function (value) {
      return (value || '').toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    };
 
    var DOCS_PLACEHOLDER = 'licitacoes-em-andamento';
 
    var normalizarDocumentos = function (documentos) {
      if (!documentos) return [];
 
      if (Array.isArray(documentos)) {
        return documentos.map(function (doc, index) {
          if (!doc) return null;
          if (typeof doc === 'string') {
            var url = doc.trim();
            if (!url || url.indexOf(DOCS_PLACEHOLDER) !== -1) return null;
            return { label: 'Documento ' + (index + 1), url: url };
          }
          if (typeof doc === 'object') {
            var urlObj = (doc.url || doc.href || '').toString().trim();
            if (!urlObj || urlObj.indexOf(DOCS_PLACEHOLDER) !== -1) return null;
            var labelObj = (doc.label || doc.nome || '').toString().trim() || ('Documento ' + (index + 1));
            return { label: labelObj, url: urlObj };
          }
          return null;
        }).filter(Boolean);
      }
 
      if (typeof documentos === 'string') {
        var singleUrl = documentos.trim();
        if (!singleUrl || singleUrl.indexOf(DOCS_PLACEHOLDER) !== -1) return [];
        return [{ label: 'Documento', url: singleUrl }];
      }
 
      return [];
    };
 
    var montarListaDocumentos = function (docs, id) {
      if (!docs.length) {
        return '<span class="licitacoes-docs-indisponivel">Documentos indisponíveis</span>';
      }
 
      var items = docs.map(function (doc) {
        return '<li><a href="' + escapeHtml(doc.url) + '" target="_blank" rel="noopener">' + escapeHtml(doc.label) + '</a></li>';
      }).join('');
 
      return (
        '<button type="button" class="btn-acao btn-secundario licitacoes-docs-toggle" data-docs-toggle="' + id + '" aria-expanded="false">Abrir Documentação</button>' +
        '<div class="licitacoes-docs-list" data-docs-list="' + id + '" hidden>' +
        '<ul>' + items + '</ul>' +
        '</div>'
      );
    };

    var dadosCache = null;
    var dadosCarregando = null;
    var ajustarAlturaResultados = function () {
      var cardHeight = filtrosCard.getBoundingClientRect().height;
      var headerHeight = resultsHeader.getBoundingClientRect().height;
      var layoutTop = filtrosCard.getBoundingClientRect().top;
      var viewportAvailable = window.innerHeight - layoutTop - 24;
      var gap = 12;
      var baseTarget = cardHeight - headerHeight - gap;
      var target = Math.max(220, Math.min(baseTarget, viewportAvailable - headerHeight - gap));
      resultsBody.style.height = target + 'px';
    };

    var carregarDados = function () {
      if (dadosCache) return Promise.resolve(dadosCache);
      if (dadosCarregando) return dadosCarregando;

      resultsBody.innerHTML = '<p>Carregando dados...</p>';
      dadosCarregando = fetch('./licitacoes.json')
        .then(function (res) {
          if (!res.ok) {
            throw new Error('Falha ao carregar licitações');
          }
          return res.json();
        })
        .then(function (dados) {
          dadosCache = Array.isArray(dados) ? dados : [];
          return dadosCache;
        })
        .catch(function () {
          resultsBody.innerHTML = '<p>Não foi possível carregar os dados agora.</p>';
          return [];
        });

      return dadosCarregando;
    };

    var getOpcaoMenorPreco = function () {
      var options = Array.from(criterio.options || []);
      return options.find(function (opt) {
        return normalize(opt.value) === 'menor preco';
      }) || null;
    };

    var atualizarResultado = function () {
      if (normalize(situacao.value) === 'concluido') {
        resultadoContainer.hidden = false;
      } else {
        resultadoContainer.hidden = true;
        resultado.value = '';
      }
    };

    var atualizarCriterios = function () {
      var opcaoMenor = getOpcaoMenorPreco();
      if (!opcaoMenor) return;

      if (normalize(procedimento.value) === 'inexigibilidade licitacao') {
        opcaoMenor.hidden = true;
        if (normalize(criterio.value) === 'menor preco') {
          var naoAplica = Array.from(criterio.options || []).find(function (opt) {
            return normalize(opt.value) === 'nao aplica';
          });
          criterio.value = naoAplica ? naoAplica.value : '';
        }
      } else {
        opcaoMenor.hidden = false;
      }
    };

    var limparFiltros = function () {
      form.reset();
      atualizarResultado();
      atualizarCriterios();
      resultsBody.innerHTML = '<p>Use os filtros de busca para ver os resultados aqui.</p>';
      ajustarAlturaResultados();
    };

    var filtrarDados = function (dados) {
      var filtros = {
        tipo: normalize(procedimento.value),
        situacao: normalize(situacao.value),
        criterio: normalize(criterio.value),
        ano: normalize(ano.value),
        resultado: normalize(resultado.value),
        palavra: normalize(palavraChave.value)
      };

      return dados.filter(function (item) {
        if (filtros.tipo && normalize(item[KEYS.tipo]) !== filtros.tipo) return false;
        if (filtros.situacao && normalize(item[KEYS.situacao]) !== filtros.situacao) return false;
        if (filtros.criterio && normalize(item[KEYS.criterio]) !== filtros.criterio) return false;
        if (filtros.ano && normalize(item[KEYS.ano]) !== filtros.ano) return false;
        if (filtros.resultado && normalize(item[KEYS.resultado]) !== filtros.resultado) return false;

        if (filtros.palavra) {
          var textoBusca = [
            item[KEYS.objeto],
            item[KEYS.resultado],
            item[KEYS.empresa],
            item[KEYS.processo],
            item[KEYS.peCohab],
            item[KEYS.procedimentoPortal],
            item[KEYS.pregoeiro]
          ].join(' ');
          if (!normalize(textoBusca).includes(filtros.palavra)) return false;
        }

        return true;
      });
    };

    var renderizarResultados = function (itens) {
      if (!itens.length) {
        resultsBody.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        return;
      }

      var html = '<div class="licitacoes-results-list">';
      html += itens.map(function (item, index) {
        var objeto = item[KEYS.objeto] || 'Sem objeto';
        var documentos = normalizarDocumentos(item[KEYS.documentos]);
        var linkDocs = montarListaDocumentos(documentos, 'doc-' + index);

        return (
          '<article class="licitacoes-resultado">' +
          '<h3>' + escapeHtml(objeto) + '</h3>' +
          '<div class="licitacoes-resultado-grid">' +
          '<span><strong>Ano:</strong> ' + escapeHtml(item[KEYS.ano]) + '</span>' +
          '<span><strong>Tipo Procedimento:</strong> ' + escapeHtml(item[KEYS.tipo]) + '</span>' +
          '<span><strong>Situação:</strong> ' + escapeHtml(item[KEYS.situacao]) + '</span>' +
          '<span><strong>Critério:</strong> ' + escapeHtml(item[KEYS.criterio]) + '</span>' +
          (item[KEYS.resultado] ? '<span><strong>Resultado:</strong> ' + escapeHtml(item[KEYS.resultado]) + '</span>' : '') +
          (item[KEYS.peCohab] ? '<span><strong>PE COHAB:</strong> ' + escapeHtml(item[KEYS.peCohab]) + '</span>' : '') +
          (item[KEYS.processo] ? '<span><strong>Processo SEI:</strong> ' + escapeHtml(item[KEYS.processo]) + '</span>' : '') +
          '</div>' +
          '<div class="licitacoes-resultado-docs">' + linkDocs + '</div>' +
          '</article>'
        );
      }).join('');
      html += '</div>';

      resultsBody.innerHTML = html;
      ajustarAlturaResultados();
    };

    var onSubmit = function (event) {
      event.preventDefault();
      atualizarResultado();
      atualizarCriterios();

      carregarDados().then(function (dados) {
        var filtrados = filtrarDados(dados);
        renderizarResultados(filtrados);
      });
    };

    situacao.addEventListener('change', atualizarResultado);
    procedimento.addEventListener('change', atualizarCriterios);
    limpar.addEventListener('click', limparFiltros);
    resultsBody.addEventListener('click', function (event) {
      var botao = event.target.closest('.licitacoes-docs-toggle');
      if (!botao) return;
 
      var id = botao.getAttribute('data-docs-toggle');
      var lista = resultsBody.querySelector('.licitacoes-docs-list[data-docs-list="' + id + '"]');
      if (!lista) return;
 
      var aberto = !lista.hasAttribute('hidden');
      if (aberto) {
        lista.setAttribute('hidden', '');
        botao.textContent = 'Abrir Documentação';
        botao.setAttribute('aria-expanded', 'false');
      } else {
        lista.removeAttribute('hidden');
        botao.textContent = 'Fechar Documentação';
        botao.setAttribute('aria-expanded', 'true');
      }
    });
    form.addEventListener('submit', onSubmit);
    window.addEventListener('resize', ajustarAlturaResultados);

    atualizarResultado();
    atualizarCriterios();
    ajustarAlturaResultados();
  })();

  // VLibras
  if (window.VLibras && window.VLibras.Widget) {
    new window.VLibras.Widget('https://vlibras.gov.br/app');
  }
});





