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
