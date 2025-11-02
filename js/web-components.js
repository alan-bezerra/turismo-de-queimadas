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
