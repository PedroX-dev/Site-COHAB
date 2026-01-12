document.addEventListener('DOMContentLoaded', () => {
  const DEV_AVISO_KEY = 'cohab-dev-aviso-v1';
  const DEV_AVISO_TEXTO = 'Site da Cohab Minas em estagio de desenvolvimento.\nCaso tenha sugestões ou criticas construtivas, por favor envie um email para: pedro.lopes@ca.mg.gov.br;\nOu entre em contato com algum supervisor ou o proprio Pedro na COHAB Minas';

  const mostrarAvisoDev = () => {
    if (localStorage.getItem(DEV_AVISO_KEY)) return;
    let resposta = '';
    while (resposta !== null) {
      resposta = window.prompt(`${DEV_AVISO_TEXTO}\n\nDigite "ok" para confirmar.`) || '';
      if (resposta.trim().toLowerCase() === 'ok') {
        localStorage.setItem(DEV_AVISO_KEY, '1');
        break;
      }
    }
  };

  mostrarAvisoDev();
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
    salvarTema();
  });

  carregarTema();
  aplicarTema();

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

      // Duplica o conjunto final para permitir o deslocamento contÃ­nuo.
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
  const buscaForm = document.querySelector('.busca');
  const buscaInput = buscaForm?.querySelector('input[name="q"]');

  if (buscaForm && buscaInput) {
    const normalizeText = (text) => (text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const tokensFrom = (text) => normalizeText(text).split(' ').filter(Boolean);

    const matchesTokens = (haystack, tokens) => tokens.every((token) => haystack.includes(token));

    const scriptUrl = document.currentScript ? new URL(document.currentScript.src) : new URL('script.js', window.location.href);
    const siteRoot = new URL('.', scriptUrl);
    const searchPageUrl = new URL('pesquisa.html', siteRoot).toString();

    const SEARCH_PAGES = [
      'index.html',
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
      'MenuHorizontal/Governanca/informacoes.html',
      'MenuHorizontal/Governanca/acionistas.html'
    ];

    const menuLinks = Array.from(document.querySelectorAll('.menu a'))
      .map((link) => {
        const label = (link.textContent || '').trim();
        const href = link.getAttribute('href') || '';
        const parentMenu = link.closest('.menu-item');
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

});
