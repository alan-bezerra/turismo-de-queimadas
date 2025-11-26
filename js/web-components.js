class MainHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<header class="header">
  <div class="header__container">
    <a href="/" class="header__logo">
      <img src="../assets/logo_queimadas_prefeitura.png" width="176" height="54" alt="Logo Prefeitura de Queimadas, Paraíba">
    </a>
    
    <nav class="header__nav">
      <a href="o-que-fazer.html" class="link">O que fazer</a>
      <a href="restaurantes-e-pousadas.html" class="link">Restaurantes e Pousadas</a>
      <a href="quiz.html" class="link">Quiz das Pedras</a>
      <a href="#" download class="link">Baixar mapa</a>
    </nav>
    
    <button class="header__mobile-toggle" aria-label="Abrir menu de navegação">
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
  </div>
  
  <div class="header__mobile-menu">
    <nav class="header__mobile-nav">
      <a href="o-que-fazer.html" class="mobile-link">O que fazer</a>
      <a href="restaurantes-e-pousadas.html" class="mobile-link">Restaurantes e Pousadas</a>
      <a href="quiz.html" class="mobile-link">Quiz das Pedras</a>
      <a href="#" download class="mobile-link">Baixar mapa</a>
    </nav>
  </div>
</header>
`
    
    // Add event listener for mobile menu toggle
    const mobileToggle = this.querySelector('.header__mobile-toggle');
    const mobileMenu = this.querySelector('.header__mobile-menu');
    const header = this.querySelector('.header');
    
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      
      if (isOpen) {
        mobileMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
        header.classList.remove('menu-open');
      } else {
        mobileMenu.classList.add('open');
        mobileToggle.classList.add('open');
        header.classList.add('menu-open');
      }
    });
    
    // Close mobile menu when clicking on links
    const mobileLinks = this.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
        header.classList.remove('menu-open');
      });
    });
  }
}

class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<div class="footer__container container">
  <aside class="footer__aside">
    <div>
      <h2>Vai viajar? Baixe nosso mapa</h2>
      <p>Vai viajar e precisa da versão do mapa impressa? Baixe agora clicando no botão ao lado.</p>
    </div>

    <app-button data-variant="secondary">
      <i class="ph-fill ph-download"></i>
      Baixar mapa
    </app-button>
  </aside>
  <footer class="footer">
    <section class="footer__content">
      <div class="footer__social">
        <img src="../assets/logo_queimadas_branca.png" width="176" height="54" alt="Logo Prefeitura de Queimadas, Paraíba">
          <p>
        Explore nossas formações rochosas únicas, desfrute da gastronomia local e viva experiências inesquecíveis no coração da Paraíba.</p>
          <div>
            <a href="#" target="_blank">
              <i class="ph-facebook-logo ph-fill"></i>
            </a>
            <a href="#" target="_blank">
              <i class="ph-instagram-logo ph-fill"></i>
            </a>
            <a href="#" target="_blank">
              <i class="ph-whatsapp-logo ph-fill"></i>
            </a>
            <a href="https://queimadas.pb.gov.br" target="_blank">
              <i class="ph-globe ph-fill"></i>
            </a>
          </div>
      </div>
      <div class="footer__links">
        <h5>Pontos Turísticos</h5>
        <ul>
          <li><a href="o-que-fazer.html" class="link">Pedra da Caveira</a></li>
          <li><a href="o-que-fazer.html" class="link">Pedra do Touro</a></li>
          <li><a href="o-que-fazer.html" class="link">Serra do Bodopitá</a></li>
          <li><a href="o-que-fazer.html" class="link">Centro Cultural</a></li>
        </ul>
      </div>
      <div class="footer__links">
        <h5>Gastronomia</h5>
        <ul>
          <li><a href="restaurantes-e-pousadas.html" class="link">Restaurantes</a></li>
          <li><a href="restaurantes-e-pousadas.html" class="link">Pousadas</a></li>
          <li><a href="restaurantes-e-pousadas.html" class="link">Comida Típica</a></li>
          <li><a href="restaurantes-e-pousadas.html" class="link">Tapiocas</a></li>
        </ul>
      </div>
      <div class="footer__links">
        <h5>Informações</h5>
        <ul>
          <li><a href="quiz.html" class="link">Quiz das Pedras</a></li>
          <li><a href="#" class="link">Mapa Turístico</a></li>
          <li><a href="#" class="link">Como Chegar</a></li>
          <li><a href="#" class="link">Contato</a></li>
          <li><a href="https://queimadas.pb.gov.br" target="_blank" class="link">Site Oficial</a></li>
        </ul>
      </div>
    </section>
    <section class="footer__copyright">
      <p>© ${new Date().getFullYear()} Prefeitura de Queimadas. Desenvolvido por <a href="https://unifacisa.edu.br" target="_blank">Unifacisa</a>.</p>
    </section>
  </footer>
</div>
`
  }
}

class AppButton extends HTMLElement {
  connectedCallback() {
    // Variant: primary | secondary
    const variant = this.dataset.variant || 'primary'

    this.innerHTML = `
<button class="app-button ${variant}">
  <span>
    ${this.innerHTML}
  </span>
</button>
`
  }
}

window.customElements.define('main-header', MainHeader)
window.customElements.define('app-button', AppButton)
window.customElements.define('main-footer', Footer)
