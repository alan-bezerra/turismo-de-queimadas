window.addEventListener('DOMContentLoaded', onInit)

function onInit() {
  toggleHeaderVisibilityOnScroll()
}

function toggleHeaderVisibilityOnScroll() {
  const header = document.querySelector('.header')
  let lastScrollTop = window.scrollY

  window.addEventListener('scroll', () => {
    const currentScrollTop = window.scrollY
    if (currentScrollTop < lastScrollTop) {
      header.classList.remove('hidden')
    } else {
      header.classList.add('hidden')
    }
    lastScrollTop = currentScrollTop
  })
}

// Modal // 
let dadosDosLocais = {};
let imagensAtuais = [];
let indiceAtual = 0;

async function carregarDados() {
 try {
  const response = await fetch('dados/pontos-turisticos.json');
  if (!response.ok) {
   throw new Error(`Erro HTTP: ${response.status}`);
  }
  dadosDosLocais = await response.json(); 
  console.log("Dados dos locais carregados!");
 } catch (error) {
  console.error("Não foi possível carregar os dados dos locais:", error);
 }
}

document.addEventListener('DOMContentLoaded', async () => {
 await carregarDados();

 const modalOverlay = document.getElementById('modal-overlay');
 const modalClose = document.getElementById('modal-close');
 const modalImage = document.getElementById('modal-image');
 const modalTitle = document.getElementById('modal-title');
 const modalText = document.getElementById('modal-text');
  
  const modalPrev = document.getElementById('modal-prev');
  const modalNext = document.getElementById('modal-next');


 if (!modalOverlay || !modalClose || !modalImage || !modalTitle || !modalText || !modalPrev || !modalNext) {
  console.warn("Elementos do modal não encontrados. A funcionalidade do modal está desativada.");
  return;
 }

 const linksDoModal = document.querySelectorAll('a[data-key]');


 linksDoModal.forEach(link => {
  link.addEventListener('click', (event) => {
   event.preventDefault();

   const localKey = link.dataset.key;
   const dadosDoLocal = dadosDosLocais[localKey];

   if (!dadosDoLocal) {
    console.error(`Dados não encontrados para a chave: ${localKey}`);
    return;
   }

   modalTitle.textContent = dadosDoLocal.titulo;

      imagensAtuais = dadosDoLocal.imagens;
      indiceAtual = 0;
      modalImage.src = imagensAtuais[indiceAtual];
      modalImage.alt = `Imagem de ${dadosDoLocal.titulo} (1 de ${imagensAtuais.length})`;

      if (imagensAtuais.length > 1) {
        modalPrev.style.display = 'block';
        modalNext.style.display = 'block';
      } else {
        modalPrev.style.display = 'none';
        modalNext.style.display = 'none';
      }



   modalText.innerHTML = ''; 
   dadosDoLocal.descricao.forEach(paragrafo => {
    const p = document.createElement('p');
    p.textContent = paragrafo;
    modalText.appendChild(p);
   });


   modalOverlay.classList.add('active');
  });
 });
  
  function mostrarProximaImagem() {
    indiceAtual++;
    if (indiceAtual >= imagensAtuais.length) {
      indiceAtual = 0;
    }
    modalImage.src = imagensAtuais[indiceAtual];
    modalImage.alt = `Imagem de ${modalTitle.textContent} (${indiceAtual + 1} de ${imagensAtuais.length})`;
  }
  
  function mostrarImagemAnterior() {
    indiceAtual--;
    if (indiceAtual < 0) {
      indiceAtual = imagensAtuais.length - 1;
    }
    modalImage.src = imagensAtuais[indiceAtual];
    modalImage.alt = `Imagem de ${modalTitle.textContent} (${indiceAtual + 1} de ${imagensAtuais.length})`;
  }

  modalNext.addEventListener('click', mostrarProximaImagem);
  modalPrev.addEventListener('click', mostrarImagemAnterior);


 const closeModal = () => {
  modalOverlay.classList.remove('active');
 }

 modalClose.addEventListener('click', closeModal);
 modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
   closeModal();
  }
 });
});