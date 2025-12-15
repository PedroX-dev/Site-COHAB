document.addEventListener('DOMContentLoaded', () => {
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

  // Controle simples de tema (apenas texto por enquanto)
  const tema = document.getElementById('tema');
  const temaLabel = tema?.querySelector('.label');
  const temaBotao = tema?.querySelector('a');
  let temaAtual = 'claro';

  const atualizarTemaTexto = () => {
    if (!temaLabel) return;
    temaLabel.innerHTML = `Tema <span class="tema-claro ${temaAtual === 'claro' ? 'ativo' : ''}">Claro</span>/<span class="tema-escuro ${temaAtual === 'escuro' ? 'ativo' : ''}">Escuro</span>`;
  };

  temaBotao?.addEventListener('click', (e) => {
    e.preventDefault();
    temaAtual = temaAtual === 'claro' ? 'escuro' : 'claro';
    atualizarTemaTexto();
  });

  atualizarTemaTexto();
});
