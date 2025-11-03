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
 
async function carregarDados(jsonUrl) {
 try {
    
  const response = await fetch(jsonUrl); 
  if (!response.ok) {
   throw new Error(`Erro HTTP: ${response.status} - ${jsonUrl}`);
  }
  dadosDosLocais = await response.json(); 
  console.log(`Dados de "${jsonUrl}" carregados!`);
} catch (error) {
  console.error("Não foi possível carregar os dados:", error);
}
}

document.addEventListener('DOMContentLoaded', async () => {
  
  const jsonUrl = document.body.dataset.jsonSource;
  
  if (!jsonUrl) {
    console.error("Atributo 'data-json-source' não encontrado no <body>!");
    return;
  }
  
 await carregarDados(jsonUrl);

 const modalOverlay = document.getElementById('modal-overlay');
 const modalClose = document.getElementById('modal-close');
 const modalImage = document.getElementById('modal-image');
 const modalTitle = document.getElementById('modal-title');
 const modalText = document.getElementById('modal-text');
 const modalPrev = document.getElementById('modal-prev');
 const modalNext = document.getElementById('modal-next');

 if (!modalOverlay || !modalClose || !modalImage || !modalTitle || !modalText || !modalPrev || !modalNext) {
  console.warn("Elementos do modal não encontrados.");
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
      
      if (dadosDoLocal.descricao) {
        dadosDoLocal.descricao.forEach(paragrafo => {
       const p = document.createElement('p');
       p.textContent = paragrafo;
       modalText.appendChild(p);
      });

      } else if (dadosDoLocal.endereco) {
        const pEndereco = document.createElement('p');
        pEndereco.innerHTML = `<strong>Endereço:</strong> ${dadosDoLocal.endereco}`;
        modalText.appendChild(pEndereco);
        
        const pContato = document.createElement('p');
        pContato.innerHTML = `<strong>Contato:</strong> ${dadosDoLocal.contato}`;
        modalText.appendChild(pContato);
      }
      

   modalOverlay.classList.add('active');
   document.body.classList.add('modal-aberto');
  });
 });
 
 function mostrarProximaImagem() {
  indiceAtual++;
  if (indiceAtual >= imagensAtuais.length) {
   indiceAtual = 0;
  }
  modalImage.src = imagensAtuais[indiceAtual];
  modalImage.alt = `Imagem de ${modalTitle.textContent} (${indiceAtual + 1} de ${imagensAtuais.length})`;
  modalImage.classList.remove('zoomed');
 }
 
 function mostrarImagemAnterior() {
  indiceAtual--;
  if (indiceAtual < 0) {
   indiceAtual = imagensAtuais.length - 1;
  }
  modalImage.src = imagensAtuais[indiceAtual];
  modalImage.alt = `Imagem de ${modalTitle.textContent} (${indiceAtual + 1} de ${imagensAtuais.length})`;
  modalImage.classList.remove('zoomed'); // Reseta zoom
 }

 modalNext.addEventListener('click', mostrarProximaImagem);
 modalPrev.addEventListener('click', mostrarImagemAnterior);

  modalImage.addEventListener('click', () => {
    modalImage.classList.toggle('zoomed');
  });

 const closeModal = () => {
  modalOverlay.classList.remove('active');
    modalImage.classList.remove('zoomed');
    document.body.classList.remove('modal-aberto');
 }

 modalClose.addEventListener('click', closeModal);
 modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
   closeModal();
  }
 });
});