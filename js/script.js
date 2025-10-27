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
document.addEventListener('DOMContentLoaded', () => {
  
  const cards = document.querySelectorAll('.o_que_fazer_cards .card')
  const modalOverlay = document.getElementById('modal-overlay')
  const modalClose = document.getElementById('modal-close')
  const modalImage = document.getElementById('modal-image')
  const modalTitle = document.getElementById('modal-title')
  const modalText = document.getElementById('modal-text')

  if (!modalOverlay || !modalClose || !modalImage || !modalTitle || !modalText) {
    console.warn("Elementos do modal não encontrados. A funcionalidade do modal está desativada.")
    return;
  }
  
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.dataset.title;
      const fullText = card.dataset.fullText;
      const imageSrc = card.dataset.imageSrc;

      modalTitle.textContent = title;
      modalText.textContent = fullText;
      modalImage.src = imageSrc;
      modalImage.alt = `Imagem de ${title}`

      modalOverlay.classList.add('active')
    })
  })

  // Fechar Modal
  const closeModal = () => {
    modalOverlay.classList.remove('active');
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (event) => {

    if (event.target === modalOverlay) {
      closeModal();
    }
  })
})