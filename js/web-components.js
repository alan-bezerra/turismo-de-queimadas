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
      <a href="#" download class="link">Baixar mapa</a>
    </nav>
  </div>
</header>
`
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
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at vestibulum nisi, et luctus sapien. Praesent nec turpis tortor. Sed eget dapibus felis, in pharetra ex. Nunc sed neque vitae nibh porta ornare vel vel justo. Fusce egestas, nibh id rhoncus egestas, dolor odio dapibus diam, ac ultrices nulla nulla eu nulla. Aenean euismod efficitur sem, nec cursus lorem accumsan in. Sed aliquam turpis et tellus imperdiet, at maximus nulla blandit. Nam finibus lorem risus, ut mollis lacus maximus id. 
    </section>
    <section class="footer__copyright">
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
