// ============================================================================
// NAVIGATION WEB COMPONENT - Reutiliza a navegação existente
// ============================================================================

export class AppNavigation extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav
        class="navigation"
        id="navigation"
        role="navigation"
        aria-label="Main navigation"
      >
        <div class="navigation__container">
          <!-- Brand/Logo -->
          <div class="navigation__logo" role="banner">
            <a
              href="/"
              class="logo-link"
              aria-label="The Conscious Creator - Home"
              data-route="/"
            >
              <img
                src="./images/Design sem nome (6).svg"
                class="logo-svg"
                alt="The Conscious Creator Logo"
                width="180"
                height="40"
                loading="eager"
              />
            </a>
          </div>

          <!-- Center Navigation Menu -->
          <div class="navigation__center">
            <div class="navigation__menu" role="menubar">
              <a
                href="/dior-holiday"
                class="nav-link nav-link-gold"
                role="menuitem"
                data-route="/dior-holiday"
              >
                <span>Dior Holiday</span>
              </a>
              <a href="#depth-meaning" class="nav-link" role="menuitem">
                <span>Fragâncias</span>
              </a>
              <a href="#wisdom" class="nav-link" role="menuitem">
                <span>Maquiagem</span>
              </a>
              <a href="#wisdom" class="nav-link" role="menuitem">
                <span>Tratamento</span>
              </a>
              <a href="#about" class="nav-link" role="menuitem">
                <span>Nosso compromissos</span>
              </a>

              <!-- Dropdown Menu Toggle Button -->
              <button
                class="menu-btn"
                id="menu-btn"
                type="button"
                aria-label="Toggle dropdown menu"
                aria-expanded="false"
                aria-controls="dropdown"
              >
                <span aria-hidden="true">+</span>
              </button>
            </div>
          </div>

          <!-- Contact Link -->
          <div class="navigation__right">
            <a href="#contact" class="contact-link" role="menuitem">
              <span>Contato</span>
            </a>
          </div>
        </div>
      </nav>

      <!-- Dropdown Overlay Menu -->
      <aside
        class="dropdown"
        id="dropdown"
        role="dialog"
        aria-modal="false"
        aria-label="Extended navigation menu"
        aria-hidden="true"
      >
        <div class="dropdown__content">
          <!-- Dropdown Menu Items -->
          <nav
            class="dropdown__menu"
            role="navigation"
            aria-label="Dropdown navigation"
          >
            <a
              href="/dior-holiday"
              class="dropdown__button dropdown__gold"
              role="button"
              tabindex="0"
              data-route="/dior-holiday"
            >
              <span>Dior Holiday</span>
            </a>
            <a
              href="#depth-meaning"
              class="dropdown__button"
              role="button"
              tabindex="0"
            >
              <span>Fragâncias</span>
            </a>
            <a href="#wisdom" class="dropdown__button" role="button" tabindex="0">
              <span>Maquiagem</span>
            </a>
            <a
              href="#creative"
              class="dropdown__button"
              role="button"
              tabindex="0"
            >
              <span>Tratamento</span>
            </a>
            <a
              href="#contact"
              class="dropdown__button"
              role="button"
              tabindex="0"
            >
              <span>Notícias</span>
            </a>
          </nav>

          <!-- Dropdown Featured Image -->
          <figure class="dropdown__image">
            <img
              src="https://images.unsplash.com/photo-1742403949587-42a767b9ea5b?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Featured image showing abstract light patterns"
              loading="lazy"
              width="2187"
              height="auto"
            />
          </figure>
        </div>
      </aside>
    `;
  }
}

customElements.define("app-navigation", AppNavigation);
