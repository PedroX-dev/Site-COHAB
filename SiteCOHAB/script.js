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
      // Garante largura mÃ­nima antes de duplicar para o loop.
      while (menuTrack.scrollWidth < menuScrollable.clientWidth * 2) {
        baseCards.forEach((card) => menuTrack.appendChild(card.cloneNode(true)));
      }

      // Duplica o conjunto final para permitir o deslocamento contÃ­nuo.
      menuTrack.innerHTML += menuTrack.innerHTML;
    }

    // Controlar o loop via scrollLeft para nÃ£o travar no final.
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

  // Carrossel de notÃ­cias
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
      const pageWidth = cPerPage * cardWidth + gap * (cPerPage - 1); // largura do grupo visÃ­vel
      const step = cPerPage * (cardWidth + gap); // deslocamento para avanÃ§ar cPerPage cartÃµes
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
      { texto: 'Balancetes do mês de Dezembro exer­cício findo;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/Balancetes-do-mes-de-Dezembro-exercicio-findo.pdf' },
      { texto: 'Demonstração do do Valor adicional;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/Demonstracao-do-Valor-adicional.pdf' },
      { texto: 'Demonstração dos Fluxos de Caixa;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/Demonstracao-dos-Fluxos-de-Caixa.pdf' },
      { texto: 'Notas Explicativas das Demonstrações Contábeis;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/Notas-Explicativas-das-Demonstracoes-Contabeis.pdf' },
      { texto: 'Relatório de Auditoria Independente;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/Relatorio-de-Auditoria-Independente.pdf' },
      { texto: 'Parecer do Conselho Fiscal;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/Parecer-do-Conselho-Fiscal.pdf' },
      { texto: 'Demonstração do Resultado do exer­cício Findo;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/Demonstracao-do-Resultado-do-Exercicio-Findo.pdf' },
      { texto: 'Balanço Patrimonial;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/Balanco-Patrimonial.pdf' },
      { texto: 'Demonstração das Mutações do Patrimônio Líquido.', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/04/Demonstracao-das-Mutacoes-do-Patrimonio-Liquido.pdf' },
      { texto: 'Despesas com Publicidade;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/07/nao_publicidade.pdf' },
      { texto: 'Relação de Bens Adquiridos', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/07/nao_bens_adquiridos.pdf' }
    ]},
    { ano: 2023, itens: [ 
      { texto: 'Balancetes do mês de Dezembro exer­cício findo;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2024/07/2023_Balancete.pdf' },
      { texto: 'Demonstração do Valor adicional;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2024/07/2023_Demonstracao-do-Valor-Adicional.pdf' },
      { texto: 'Demonstração dos Fluxos de Caixa;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2024/07/2023_Demonstracao-de-Fluxo-de-Caixa.pdf' },
      { texto: 'Notas Explicativas das Demonstrações Contábeis;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2024/07/2023_Notas-Explicativas-das-Demonstracoes-Contabeis.pdf' },
      { texto: 'Relatório de Auditoria Independente;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2024/07/2023_Relatorio-de-Auditoria-Independente.pdf' },
      { texto: 'Parecer do Conselho Fiscal;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2024/07/2023_Parecer-do-Conselho-Fiscal.pdf' },
      { texto: 'Demonstração do Resultado do exer­cício Findo;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2024/07/2023_Demonstracao-do-Resultado-do-Exercicio.pdf' },
      { texto: 'Balanço Patrimonial;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2024/07/2023_Balanco-Patrimonial.pdf' },
      { texto: 'Demonstração das Mutações do Patrimônio Líquido.', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2024/07/2023_Demonstracao-das-Mutacoes-do-Patrimonio-Liquido.pdf' },
      { texto: 'Despesas com Publicidade;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/07/nao_publicidade.pdf' },
      { texto: 'Relação de Bens Adquiridos', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/07/nao_bens_adquiridos.pdf' }
    ]},
    { ano: 2022, itens: [
      { texto: 'Balancetes do mês de Dezembro exer­cício findo;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/9_Balancete.pdf' },
      { texto: 'Demonstração do Valor adicional;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/7_Demonstracao-do-Valor-Adicional.pdf' },
      { texto: 'Demonstração dos Fluxos de Caixa;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/6_Demonstracao-de-Fluxo-de-Caixa.pdf' },
      { texto: 'Notas Explicativas das Demonstrações Contábeis;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/8_Notas-Explicativas-das-Demonstra%C3%A7%C3%B5es-Contabeis.pdf' },
      { texto: 'Relatório de Auditoria Independente;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/14_Relatorio-de-Auditoria-Independente.pdf' },
      { texto: 'Parecer do Conselho Fiscal;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/12_Parecer-do-Conselho-Fiscal.pdf' },
      { texto: 'Demonstração do Resultado do exer­cício Findo;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/5_Demonstracao-do-Resultado-do-Exercicio.pdf' },
      { texto: 'Balanço Patrimonial;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/3_Balan%C3%A7o-Patrimonial.pdf' },
      { texto: 'Demonstração das Mutações do Patrimônio Líquido.', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/4_Demonstracao-das-Mutacoes-do-Patrimonio-Liquido-1.pdf' },
      { texto: 'Despesas com Publicidade;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/CohabMinas-Publicidade_2022.xlsx' },
      { texto: 'Relação de Bens Adquiridos', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/07/nao_bens_adquiridos.pdf' }
     ]},
    { ano: 2021, itens: [
      { texto: 'Balancetes do mês de Dezembro exer­cício findo;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/Balancetes-do-m%C3%AAs-de-Dezembro-exerc%C3%ADcio-findo-2021.pdf' },
      { texto: 'Demonstração do Valor adicional;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/Demonstra%C3%A7%C3%A3o-do-Valor-adicionado-2021.pdf' },
      { texto: 'Demonstração dos Fluxos de Caixa;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/Demonstra%C3%A7%C3%A3o-dos-Fluxos-de-Caixa-2021.pdf' },
      { texto: 'Demonstrações Financeiras ;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/Demonstra%C3%A7%C3%B5es-Financeiras-2021.pdf' },
      { texto: 'Notas Explicativas às Demonstrações Financeiras;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/Notas-Explicativas-%C3%A0s-Demonstra%C3%A7%C3%B5es-Financeiras-2021.pdf' },
      { texto: 'Relatório de Auditoria Independente;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/Parecer-da-auditoria-independente-2021.pdf' },
      { texto: 'Parecer do Conselho Fiscal;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/Relat%C3%B3rio-do-Conselho-Fiscal-2021.pdf' },
      { texto: 'Demonstração do Resultado do exer­cício Findo;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2023/09/DRE-2021.pdf' },
      { texto: 'Despesas com Publicidade;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/07/nao_publicidade.pdf' },
      { texto: 'Relação de Bens Adquiridos', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2025/07/nao_bens_adquiridos.pdf' }
     ]},
    { ano: 2020, itens: [
      { texto: 'Balancetes do mês de Dezembro exer­cício findo;', href: 'http://www.cohab.mg.gov.br/wp-content/uploads/2021/06/Balancetes-do-mes-de-Dezembro-exercicio-findo.pdf' },
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

});
