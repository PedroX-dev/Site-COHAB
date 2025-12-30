document.addEventListener('DOMContentLoaded', () => {
  // Redes sociais (abre/fecha)
  const redes = document.querySelector('.redes-sociais');
  const toggle = redes?.querySelector('.redes-toggle');
  const close = redes?.querySelector('.redes-close');

  toggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    redes.classList.toggle('aberto');
  });

  close?.addEventListener('click', (e) => {
    e.stopPropagation();
    redes.classList.remove('aberto');
  });

  document.addEventListener('click', () => {
    redes?.classList.remove('aberto');
  });

  // Tema (texto claro/escuro)
  const tema = document.getElementById('tema');
  const temaLabel = tema?.querySelector('.label');
  const temaBotao = tema?.querySelector('a');
  const logoSite = document.getElementById('logo-site');
  const logoRodape = document.getElementById('logo-rodape');
  const logos = [logoSite, logoRodape].filter(Boolean);
  let temaAtual = 'claro';

  const atualizarTemaTexto = () => {
    if (!temaLabel) return;
    temaLabel.innerHTML = `Tema <span class="tema-claro ${temaAtual === 'claro' ? 'ativo' : ''}">Claro</span>/<span class="tema-escuro ${temaAtual === 'escuro' ? 'ativo' : ''}">Escuro</span>`;
  };

  const aplicarTema = () => {
    document.body.classList.toggle('tema-escuro', temaAtual === 'escuro');
    logos.forEach((img) => {
      const claro = img.dataset.light;
      const escuro = img.dataset.dark;
      if (temaAtual === 'escuro' && escuro) {
        img.src = escuro;
      } else if (claro) {
        img.src = claro;
      }
    });
    atualizarTemaTexto();
  };

  temaBotao?.addEventListener('click', (e) => {
    e.preventDefault();
    temaAtual = temaAtual === 'claro' ? 'escuro' : 'claro';
    aplicarTema();
  });

  aplicarTema();

  // Menu Scroll (carrossel horizontal)
  const menu = document.querySelector('.menuScroll');
  const menuScrollable = menu?.querySelector('.menuScroll-wrapper');
  const menuTrack = menuScrollable?.querySelector('.menuScroll-track');

  if (menu && menuScrollable && menuTrack) {
    const baseCards = Array.from(menuTrack.children);

    if (baseCards.length) {
      // Garante largura mínima antes de duplicar para o loop.
      while (menuTrack.scrollWidth < menuScrollable.clientWidth * 2) {
        baseCards.forEach((card) => menuTrack.appendChild(card.cloneNode(true)));
      }

      // Duplica o conjunto final para permitir o deslocamento contínuo.
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

  // Carrossel de notícias
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
      const pageWidth = cPerPage * cardWidth + gap * (cPerPage - 1); // largura do grupo visível
      const step = cPerPage * (cardWidth + gap); // deslocamento para avançar cPerPage cartões
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

  // --- Carrossel COHAB (lista) ---
const titulo = document.getElementById('ano-titulo');
const lista = document.getElementById('ano-lista');
const prev1 = document.querySelector('.ano-prev');
const next1 = document.querySelector('.ano-next');

if (titulo && lista && prev1 && next1) { 
  let idx = 0;
  const anos = [
    { ano: 2024, itens: [
      { texto: 'Balancetes do mês de dezembro exercício findo;', href: '#' },
      { texto: 'Demonstração do Valor adicional;', href: '#' },
      { texto: 'Demonstração dos Fluxos de Caixa;', href: '#' },
      { texto: 'Notas Explicativas das Demonstrações Contábeis;', href: '#' },
      { texto: 'Relatório de Auditoria Independente;', href: '#' },
      { texto: 'Parecer do Conselho Fiscal;', href: '#' },
      { texto: 'Demonstração do Resultado do Exercício Findo;', href: '#' },
      { texto: 'Balanço Patrimonial;', href: '#' },
      { texto: 'Demonstração das Mutações do Patrimônio Líquido.', href: '#' },
      { texto: 'Despesas com Publicidade;', href: '#' },
      { texto: 'Relação de Bens Adquiridos', href: '#' }
    ]},
    { ano: 2023, itens: [ 
      { texto: 'Balancetes do mês de dezembro exercício findo;', href: '#' },
      { texto: 'Demonstração do Valor adicional;', href: '#' },
      { texto: 'Demonstração dos Fluxos de Caixa;', href: '#' },
      { texto: 'Notas Explicativas das Demonstrações Contábeis;', href: '#' },
      { texto: 'Relatório de Auditoria Independente;', href: '#' },
      { texto: 'Parecer do Conselho Fiscal;', href: '#' },
      { texto: 'Demonstração do Resultado do Exercício Findo;', href: '#' },
      { texto: 'Balanço Patrimonial;', href: '#' },
      { texto: 'Demonstração das Mutações do Patrimônio Líquido.', href: '#' },
      { texto: 'Despesas com Publicidade;', href: '#' },
      { texto: 'Relação de Bens Adquiridos', href: '#' }
    ]},
    { ano: 2022, itens: [
      { texto: 'Balancetes do mês de dezembro exercício findo;', href: '#' },
      { texto: 'Demonstração do Valor adicional;', href: '#' },
      { texto: 'Demonstração dos Fluxos de Caixa;', href: '#' },
      { texto: 'Notas Explicativas das Demonstrações Contábeis;', href: '#' },
      { texto: 'Relatório de Auditoria Independente;', href: '#' },
      { texto: 'Parecer do Conselho Fiscal;', href: '#' },
      { texto: 'Demonstração do Resultado do Exercício Findo;', href: '#' },
      { texto: 'Balanço Patrimonial;', href: '#' },
      { texto: 'Demonstração das Mutações do Patrimônio Líquido.', href: '#' },
      { texto: 'Despesas com Publicidade;', href: '#' },
      { texto: 'Relação de Bens Adquiridos', href: '#' }
     ]},
    { ano: 2021, itens: [
      { texto: 'Balancetes do mês de dezembro exercício findo;', href: '#' },
      { texto: 'Demonstração do Valor adicional;', href: '#' },
      { texto: 'Demonstração dos Fluxos de Caixa;', href: '#' },
      { texto: 'Notas Explicativas das Demonstrações Contábeis;', href: '#' },
      { texto: 'Relatório de Auditoria Independente;', href: '#' },
      { texto: 'Parecer do Conselho Fiscal;', href: '#' },
      { texto: 'Demonstração do Resultado do Exercício Findo;', href: '#' },
      { texto: 'Balanço Patrimonial;', href: '#' },
      { texto: 'Demonstração das Mutações do Patrimônio Líquido.', href: '#' },
      { texto: 'Despesas com Publicidade;', href: '#' },
      { texto: 'Relação de Bens Adquiridos', href: '#' }
     ]},
  ];

  function render() {
    const atual = anos[idx];
    titulo.textContent = atual.ano;
    lista.innerHTML = atual.itens
      .map(item => `<li><a href="${item.href}">${item.texto}</a></li>`)
      .join('');
  }

  prev1.addEventListener('click', () => { idx = (idx - 1 + anos.length) % anos.length; render(); });
  next1.addEventListener('click', () => { idx = (idx + 1) % anos.length; render(); });

  render();
}

// --- Carrossel FEH ---
const titulo2 = document.getElementById('ano2-titulo');
const cta = document.getElementById('ano2-cta');
const prev2 = document.querySelector('.ano-prev');
const next2 = document.querySelector('.ano-next');

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


  prev2.addEventListener('click', () => { idx2 = (idx2 - 1 + anos2.length) % anos2.length; renderAnoBtn(); });
  next2.addEventListener('click', () => { idx2 = (idx2 + 1) % anos2.length; renderAnoBtn(); });

  renderAnoBtn();
}


});
