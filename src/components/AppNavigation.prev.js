// ============================================================================
// APP NAVIGATION COMPONENT - Navegação principal com menu lateral
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
    this.updateBagBadge();

    // Adiciona listener para mudanças no carrinho
    cartService.addListener(this.cartListener);
  }

  disconnectedCallback() {
    // Remove listener do carrinho
    cartService.removeListener(this.cartListener);
  }

  initScrollBehavior() {
    const nav = this.querySelector(".moda-navigation");
    if (!nav) return;

    // Perfume e Cosméticos sempre com fundo branco
    nav.classList.add("scrolled");
  }

  initMenuLinksAnimation() {
    requestAnimationFrame(() => {
      if (!window.gsap) return;

      const menuLinks = this.querySelectorAll(".moda-menu-link");

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
          e.stopPropagation();
          profileMenu.open("bag");
        });
      }
    });
  }

  initEventListeners() {
    const hamburger = this.querySelector(".moda-nav-hamburger");
    const sideMenu = this.querySelector(".moda-side-menu");
    const backdrop = this.querySelector(".moda-side-menu-backdrop");
    const closeBtn = this.querySelector(".moda-side-menu-close");

    // Toggle menu
    if (hamburger) {
      hamburger.addEventListener("click", () => this.toggleMenu());
    }

    // Close menu
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeMenu());
    }

    if (backdrop) {
      backdrop.addEventListener("click", () => this.closeMenu());
    }

    // Navegação dos links do menu
    const menuLinks = this.querySelectorAll(".moda-menu-link[data-route]");
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
    this.menuOpen = !this.menuOpen;
    const sideMenu = this.querySelector(".moda-side-menu");
    const backdrop = this.querySelector(".moda-side-menu-backdrop");
    const hamburger = this.querySelector(".moda-nav-hamburger");
    const lines = hamburger.querySelectorAll("line");
    const menuLinks = this.querySelectorAll(".moda-menu-link");

    if (this.menuOpen) {
      backdrop.classList.add("active");
      sideMenu.classList.add("active");

      // Anima hamburguer para X com GSAP
      if (window.gsap) {
        window.gsap.to(lines[0], {
          attr: { y1: 12, y2: 12, x1: 3, x2: 21 },
          rotation: 45,
          transformOrigin: "center",
          duration: 0.3,
          ease: "power2.inOut",
        });

        window.gsap.to(lines[1], {
          opacity: 0,
          duration: 0.2,
          ease: "power2.inOut",
        });

        window.gsap.to(lines[2], {
          attr: { y1: 12, y2: 12, x1: 3, x2: 21 },
          rotation: -45,
          transformOrigin: "center",
          duration: 0.3,
          ease: "power2.inOut",
        });

        // Anima os links do menu entrando
        window.gsap.fromTo(
          menuLinks,
          {
            x: -50,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
            delay: 0.2,
          }
        );
      }
    } else {
      backdrop.classList.remove("active");
      sideMenu.classList.remove("active");

      // Volta hamburguer ao estado normal
      if (window.gsap) {
        window.gsap.to(lines[0], {
          attr: { y1: 12, y2: 12, x1: 3, x2: 21 },
          rotation: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });

        window.gsap.to(lines[1], {
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        });

        window.gsap.to(lines[2], {
          attr: { y1: 12, y2: 12, x1: 3, x2: 21 },
          rotation: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    }
  }

  closeMenu() {
    this.menuOpen = false;
    const sideMenu = this.querySelector(".moda-side-menu");
    const backdrop = this.querySelector(".moda-side-menu-backdrop");
    const hamburger = this.querySelector(".moda-nav-hamburger");
    const lines = hamburger.querySelectorAll("line");

    backdrop.classList.remove("active");
    sideMenu.classList.remove("active");

    // Volta hamburguer ao estado normal
    if (window.gsap) {
      window.gsap.to(lines[0], {
        attr: { y1: 12, y2: 12, x1: 3, x2: 21 },
        rotation: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });

      window.gsap.to(lines[1], {
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });

      window.gsap.to(lines[2], {
        attr: { y1: 12, y2: 12, x1: 3, x2: 21 },
        rotation: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
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
      <!-- Navigation Bar -->
      <nav class="moda-navigation">
        <!-- Hamburger Menu (Esquerda) -->
        <button class="moda-nav-hamburger" aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <!-- Logo Dior (Centro) -->
        <div class="moda-nav-logo">
          <a href="/" class="moda-logo-link" data-route="/">
            <img
              src="/images/Design sem nome (6).svg"
              alt="Dior Logo"
              width="140"
              height="32"
            />
          </a>
        </div>

        <!-- Ações (Direita) -->
        <div class="moda-nav-actions">
          <div class="app-nav-icons-container">
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

      <!-- Side Menu Backdrop -->
      <div class="moda-side-menu-backdrop"></div>

      <!-- Side Menu -->
      <div class="moda-side-menu">
        <div class="moda-side-menu-header">
          <button class="moda-side-menu-close" aria-label="Close Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="moda-menu-content">
          <nav class="moda-menu-nav">
            <a href="/dior-holiday" class="moda-menu-link" data-route="/dior-holiday">Dior Holiday</a>
            <a href="/miss-dior" class="moda-menu-link" data-route="/miss-dior">Miss Dior</a>
            <a href="/miss-dior-essence" class="moda-menu-link" data-route="/miss-dior-essence">Miss Dior Essence</a>
            <a href="/compras-miss-dior-parfum" class="moda-menu-link" data-route="/compras-miss-dior-parfum">Miss Dior Parfum</a>
            <a href="/dior-verao" class="moda-menu-link" data-route="/dior-verao">Dior Verão</a>
            <a href="/moda-acessorios" class="moda-menu-link" data-route="/moda-acessorios">Moda & Acessórios</a>
            <a href="/para-ela" class="moda-menu-link" data-route="/para-ela">Presentes Para Ela</a>
            <a href="/arte-de-presentear" class="moda-menu-link" data-route="/arte-de-presentear">A Arte de Presentear</a>
          </nav>

          <div class="moda-menu-contact">
            <h3 class="moda-menu-contact-title">Contato</h3>
            <a href="#encontrar-boutique" class="moda-menu-contact-link">Encontrar uma boutique</a>
            <a href="#pais-regiao" class="moda-menu-contact-link">País/Região: Brasil (Português)</a>
          </div>

          <div class="moda-menu-footer">
            <label class="moda-menu-accessibility">
              <span>Acessibilidade: melhorar o contraste</span>
              <input type="checkbox" class="moda-menu-checkbox" />
            </label>

            <div class="moda-menu-tabs">
              <a href="/login" class="moda-menu-tab" data-route="/login">Minha Conta</a>
              <a href="/register" class="moda-menu-tab" data-route="/register">Criar Conta</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("app-navigation", AppNavigation);
