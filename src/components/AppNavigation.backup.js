// ============================================================================
// NAVIGATION WEB COMPONENT - Navegação principal com hamburger menu lateral
// ============================================================================
import { cartService } from "../services/CartService.js";
import { router } from "../router/router.js";

export class AppNavigation extends HTMLElement {
  constructor() {
    super();
    this.menuOpen = false;

    // Listener para atualizar o badge quando o carrinho mudar
    this.cartListener = () => {
      this.updateBagBadge();
    };
  }

  connectedCallback() {
    this.render();
    this.initEventListeners();
    this.initMenuLinksAnimation();
    this.initScrollBehavior();
    this.initSearchIconAnimation();
    this.initProfileMenu();
    this.initFragrancesModal();
    this.updateBagBadge();

    // Adiciona listener para mudanças no carrinho
    cartService.addListener(this.cartListener);
  }

  disconnectedCallback() {
    // Remove listener do carrinho
    cartService.removeListener(this.cartListener);
  }

  initScrollBehavior() {
    const nav = this.querySelector(".main-navigation");
    if (!nav) return;

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 50) {
        nav.classList.remove("scrolled");
      } else {
        nav.classList.add("scrolled");
      }
    });
  }

  initMenuLinksAnimation() {
    requestAnimationFrame(() => {
      if (!window.gsap) return;

      const menuLinks = this.querySelectorAll(".main-menu-link");

      menuLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          window.gsap.to(link, {
            "--underline-width": "100%",
            duration: 0.35,
            ease: "power2.inOut",
          });
        });

        link.addEventListener("mouseleave", () => {
          window.gsap.to(link, {
            "--underline-width": "0%",
            duration: 0.35,
            ease: "power2.inOut",
          });
        });
      });
    });
  }

  initSearchIconAnimation() {
    requestAnimationFrame(() => {
      const searchContainer = this.querySelector(".search-container");
      const searchInput = this.querySelector(".search-input");
      const searchBtn = this.querySelector(".search-icon-btn");

      if (!searchContainer || !searchInput || !searchBtn || !window.gsap) return;

      // Estado inicial - input escondido
      window.gsap.set(searchInput, {
        width: 0,
        opacity: 0,
        paddingLeft: 0,
        paddingRight: 0,
      });

      // Hover enter no container
      searchContainer.addEventListener("mouseenter", () => {
        window.gsap.to(searchInput, {
          width: 200,
          opacity: 1,
          paddingLeft: 16,
          paddingRight: 16,
          duration: 0.4,
          ease: "power2.out",
        });
      });

      // Hover leave no container
      searchContainer.addEventListener("mouseleave", () => {
        // Só fecha se o input não estiver focado
        if (document.activeElement !== searchInput) {
          window.gsap.to(searchInput, {
            width: 0,
            opacity: 0,
            paddingLeft: 0,
            paddingRight: 0,
            duration: 0.3,
            ease: "power2.in",
          });
        }
      });

      // Mantém aberto quando input está focado
      searchInput.addEventListener("blur", () => {
        window.gsap.to(searchInput, {
          width: 0,
          opacity: 0,
          paddingLeft: 0,
          paddingRight: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      });
    });
  }

  initProfileMenu() {
    requestAnimationFrame(() => {
      const profileBtn = this.querySelector('.nav-icon-btn.profile-btn');
      const bagBtn = this.querySelector('.bag-btn-container');
      const profileMenu = document.querySelector("profile-menu");

      if (!profileMenu) return;

      // Botão de perfil abre na aba "account"
      if (profileBtn) {
        profileBtn.addEventListener("click", () => {
          profileMenu.open("account");
        });
      }

      // Botão de sacola abre na aba "bag"
      if (bagBtn) {
        bagBtn.addEventListener("click", (e) => {
          // Previne a navegação padrão para /finalizar-compra
          e.stopPropagation();
          profileMenu.open("bag");
        });
      }
    });
  }

  initFragrancesModal() {
    // Aguarda um pouco mais para garantir que o modal está no DOM
    setTimeout(() => {
      const fragrancesModal = document.querySelector("fragrances-modal");

      if (!fragrancesModal) {
        console.warn("Fragrances modal element not found in DOM");
        return;
      }

      // Aqui você pode adicionar lógica adicional para o modal de fragrâncias se necessário
    }, 100);
  }

  initEventListeners() {
    const hamburger = this.querySelector(".main-nav-hamburger");
    const sideMenu = this.querySelector(".main-side-menu");
    const backdrop = this.querySelector(".main-side-menu-backdrop");
    const closeBtn = this.querySelector(".main-side-menu-close");

    if (hamburger) {
      hamburger.addEventListener("click", () => this.toggleMenu());
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeMenu());
    }

    if (backdrop) {
      backdrop.addEventListener("click", () => this.closeMenu());
    }

    // Navegação dos links do menu
    const menuLinks = this.querySelectorAll(".main-menu-link[data-route]");
    menuLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const route = link.getAttribute("data-route");
        this.closeMenu();
        setTimeout(() => {
          router.navigate(route);
        }, 400);
      });
    });
  }

  toggleMenu() {
    if (this.menuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    const sideMenu = this.querySelector(".main-side-menu");
    const backdrop = this.querySelector(".main-side-menu-backdrop");

    sideMenu.classList.add("active");
    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";
    this.menuOpen = true;
  }

  closeMenu() {
    const sideMenu = this.querySelector(".main-side-menu");
    const backdrop = this.querySelector(".main-side-menu-backdrop");

    sideMenu.classList.remove("active");
    backdrop.classList.remove("active");
    document.body.style.overflow = "";
    this.menuOpen = false;
  }

  updateBagBadge() {
    const badge = this.querySelector(".bag-badge");
    if (badge) {
      const totalItems = cartService.getTotalItems();
      badge.textContent = totalItems;
      badge.style.display = totalItems > 0 ? "flex" : "none";
    }
  }

  render() {
    this.innerHTML = `
      <!-- Backdrop do menu lateral -->
      <div class="main-side-menu-backdrop"></div>

      <!-- Menu lateral -->
      <aside class="main-side-menu" role="dialog" aria-modal="true" aria-label="Menu de navegação">
        <div class="main-side-menu-header">
          <button class="main-side-menu-close" aria-label="Fechar menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="main-menu-content">
          <nav class="main-menu-nav">
            <a href="/" class="main-menu-link" data-route="/">Início</a>
            
            <div class="main-menu-section">
              <h4 class="main-menu-section-title">Fragr\u00e2ncias</h4>
              <a href="/miss-dior" class="main-menu-link" data-route="/miss-dior">Miss Dior</a>
              <a href="/miss-dior-essence" class="main-menu-link" data-route="/miss-dior-essence">J'adore</a>
              <a href="/dior-verao" class="main-menu-link" data-route="/dior-verao">Dior Verão</a>
            </div>

            <div class="main-menu-section">
              <h4 class="main-menu-section-title">Moda & Acessórios</h4>
              <a href="/moda-acessorios" class="main-menu-link" data-route="/moda-acessorios">Moda e Acessórios</a>
              <a href="/para-ela" class="main-menu-link" data-route="/para-ela">Presente para Ela</a>
            </div>

            <div class="main-menu-section">
              <h4 class="main-menu-section-title">Coleções Especiais</h4>
              <a href="/dior-holiday" class="main-menu-link" data-route="/dior-holiday">Dior Holiday</a>
              <a href="/arte-de-presentear" class="main-menu-link" data-route="/arte-de-presentear">Arte de Presentear</a>
              <a href="/compras-miss-dior-parfum" class="main-menu-link" data-route="/compras-miss-dior-parfum">Miss Dior Parfum</a>
            </div>
          </nav>

          <div class="main-menu-footer">
            <div class="main-menu-contact">
              <h5 class="main-menu-contact-title">Contato</h5>
              <a href="#contato" class="main-menu-contact-link">Fale Conosco</a>
              <a href="#lojas" class="main-menu-contact-link">Encontre uma Boutique</a>
            </div>

            <div class="main-menu-account">
              <a href="/login" class="main-menu-link" data-route="/login">Minha Conta</a>
              <a href="/register" class="main-menu-link" data-route="/register">Criar Conta</a>
            </div>
          </div>
        </div>
      </aside>

      <!-- Barra de navegação principal -->
      <nav class="main-navigation" role="navigation" aria-label="Navegação principal">
        <div class="main-nav-container">
          <!-- Hamburger menu -->
          <button class="main-nav-hamburger" aria-label="Menu" aria-expanded="false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <!-- Logo Dior -->
          <div class="main-nav-logo">
            <a href="/" data-route="/" aria-label="Dior - Home">
              <img src="/images/Design sem nome (6).svg" class="logo-svg" alt="Dior Logo" width="180" height="40" loading="eager" />
            </a>
          </div>

          <!-- Ações - Pesquisar, Perfil e Sacola -->
          <div class="main-nav-actions">
            <div class="search-container">
              <input 
                type="text" 
                class="search-input" 
                placeholder="Encontre em dior.com"
                aria-label="Campo de pesquisa"
              />
              <button class="nav-icon-btn search-icon-btn" aria-label="Pesquisar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </div>

            <button class="nav-icon-btn profile-btn" aria-label="Perfil">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>

            <button class="nav-icon-btn bag-btn-container" aria-label="Sacola de compras">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 6.5H4.5L3.5 17.5H16.5L15.5 6.5Z"/>
                <path d="M7 6.5V5.5C7 4.83696 7.26339 4.20107 7.73223 3.73223C8.20107 3.26339 8.83696 3 9.5 3H10.5C11.163 3 11.7989 3.26339 12.2678 3.73223C12.7366 4.20107 13 4.83696 13 5.5V6.5"/>
              </svg>
              <span class="bag-badge">0</span>
            </button>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define("app-navigation", AppNavigation);
