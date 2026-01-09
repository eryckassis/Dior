// ============================================================================
// NAVIGATION WEB COMPONENT - Reutiliza a navegação existente
// ============================================================================
import { cartService } from "../services/CartService.js";

export class AppNavigation extends HTMLElement {
  constructor() {
    super();

    // Listener para atualizar o badge quando o carrinho mudar
    this.cartListener = () => {
      this.updateBagBadge();
    };
  }

  connectedCallback() {
    this.render();
    this.initFragrancesSubmenu();
    this.initFragranceIconsParallax();
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

  updateBagBadge() {
    const badge = this.querySelector(".bag-badge");
    if (badge) {
      const totalItems = cartService.getTotalItems();
      badge.textContent = totalItems;
      badge.style.display = totalItems > 0 ? "flex" : "none";
    }
  }

  initFragranceIconsParallax() {
    requestAnimationFrame(() => {
      const iconItems = this.querySelectorAll(".fragrance-icon-item");

      if (!window.gsap || iconItems.length === 0) return;

      iconItems.forEach((item) => {
        const image = item.querySelector(".fragrance-icon-image");
        if (!image) return;

        // Mousemove - Parallax effect
        item.addEventListener("mousemove", (e) => {
          const rect = item.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const deltaX = (x - centerX) / centerX;
          const deltaY = (y - centerY) / centerY;

          const rotateX = deltaY * -15; // Rotação no eixo X (vertical)
          const rotateY = deltaX * 15; // Rotação no eixo Y (horizontal)
          const translateZ = 20; // Profundidade 3D

          window.gsap.to(image, {
            rotationX: rotateX,
            rotationY: rotateY,
            z: translateZ,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000,
            transformOrigin: "center center",
          });
        });

        // Mouseleave - Reset
        item.addEventListener("mouseleave", () => {
          window.gsap.to(image, {
            rotationX: 0,
            rotationY: 0,
            z: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          });
        });

        // Mouseenter - Subtle scale
        item.addEventListener("mouseenter", () => {
          window.gsap.to(image, {
            scale: 1.1,
            duration: 0.4,
            ease: "power2.out",
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

      if (!searchContainer || !searchInput || !searchBtn || !window.gsap)
        return;

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
      const profileBtn = this.querySelector(
        '.nav-icon-btn[aria-label="Perfil"]'
      );
      const bagBtn = this.querySelector(
        '.nav-icon-btn[aria-label="Sacola de compras"]'
      );
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
        bagBtn.addEventListener("click", () => {
          profileMenu.open("bag");
        });
      }
    });
  }

  initFragrancesModal() {
    // Aguarda um pouco mais para garantir que o modal está no DOM
    setTimeout(() => {
      const fragrancesBtn = this.querySelector(
        '[data-fragrances-trigger="true"]'
      );
      const fragrancesModal = document.querySelector("fragrances-modal");

      console.log("Initializing fragrances modal", {
        button: fragrancesBtn,
        modal: fragrancesModal,
        modalInDom: !!fragrancesModal,
      });

      if (!fragrancesBtn) {
        console.error("Fragrances button not found");
        return;
      }

      if (!fragrancesModal) {
        console.error("Fragrances modal element not found in DOM");
        return;
      }

      console.log("Setting up fragrances modal click handler");

      fragrancesBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Fragrances button clicked, opening modal");
        fragrancesModal.open();
      });
    }, 100);
  }

  initFragrancesSubmenu() {
    requestAnimationFrame(() => {
      const fragrancesLink = this.querySelector(".nav-link-fragrances");
      const submenu = this.querySelector(".fragrances-submenu");

      if (!fragrancesLink || !submenu) return;

      let isSubmenuOpen = false;
      let timeoutId = null;

      // Mouseenter no link
      fragrancesLink.addEventListener("mouseenter", () => {
        clearTimeout(timeoutId);
        if (!isSubmenuOpen) {
          this.openSubmenu(submenu);
          isSubmenuOpen = true;
        }
      });

      // Mouseleave do link
      fragrancesLink.addEventListener("mouseleave", () => {
        timeoutId = setTimeout(() => {
          if (!submenu.matches(":hover")) {
            this.closeSubmenu(submenu);
            isSubmenuOpen = false;
          }
        }, 100);
      });

      // Mouseenter no submenu
      submenu.addEventListener("mouseenter", () => {
        clearTimeout(timeoutId);
      });

      // Mouseleave do submenu
      submenu.addEventListener("mouseleave", () => {
        this.closeSubmenu(submenu);
        isSubmenuOpen = false;
      });
    });
  }

  openSubmenu(submenu) {
    if (!window.gsap) {
      submenu.style.display = "block";
      submenu.style.opacity = "1";
      return;
    }

    const content = submenu.querySelector(".fragrances-submenu-content");
    const leftPanel = submenu.querySelector(".fragrances-left-panel");
    const rightPanel = submenu.querySelector(".fragrances-right-panel");
    const icons = submenu.querySelectorAll(".fragrance-icon-item");
    const menuItems = submenu.querySelectorAll(".submenu-item");

    submenu.style.display = "block";

    const tl = window.gsap.timeline();

    tl.fromTo(
      submenu,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    )
      .fromTo(
        content,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
        0.1
      )
      .fromTo(
        icons,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power3.out" },
        0.2
      )
      .fromTo(
        menuItems,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: "power3.out" },
        0.3
      );
  }

  closeSubmenu(submenu) {
    if (!window.gsap) {
      submenu.style.display = "none";
      submenu.style.opacity = "0";
      return;
    }

    window.gsap.to(submenu, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        submenu.style.display = "none";
      },
    });
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
                src="/images/Design sem nome (6).svg"
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
              <a href="#fragrances" class="nav-link nav-link-fragrances" role="menuitem">
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

          <!-- Right Icons -->
          <div class="navigation__right">
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
            <button class="nav-icon-btn" aria-label="Perfil">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
            <button class="nav-icon-btn bag-btn-container" aria-label="Sacola de compras">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" stroke="currentColor"   xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 6.5H4.5L3.5 17.5H16.5L15.5 6.5Z"/>
                <path d="M7 6.5V5.5C7 4.83696 7.26339 4.20107 7.73223 3.73223C8.20107 3.26339 8.83696 3 9.5 3H10.5C11.163 3 11.7989 3.26339 12.2678 3.73223C12.7366 4.20107 13 4.83696 13 5.5V6.5"/>
              </svg>
              <span class="bag-badge">0</span>
            </button>
          </div>
        </div>
      </nav>

      <!-- Fragrances Submenu -->
      <div class="fragrances-submenu" style="display: none;">
        <div class="fragrances-submenu-content">
          <!-- Left Panel -->
          <div class="fragrances-left-panel">
            <div class="submenu-back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
              <span>Fragância Feminina</span>
            </div>

            <div class="submenu-section">
              <h3 class="submenu-section-title">ICONICS</h3>
              <div class="fragrance-icons">
                <a href="/miss-dior" class="fragrance-icon-item" data-route="/miss-dior">
                  <img src="/images/missdiorpng.png" alt="Miss Dior" class="fragrance-icon-image" />
                  <p class="fragrance-icon-name">Miss Dior</p>
                </a>
                <a href="/miss-dior-essence" class="fragrance-icon-item" data-route="/miss-dior-essence">
                  <img src="/images/jadorepng.png" alt="J'adore" class="fragrance-icon-image" />
                  <p class="fragrance-icon-name">J'adore</p>
                </a>
                <div class="fragrance-icon-item">
                  <img src="/images/poison.webp" alt="Poison" class="fragrance-icon-image" />
                  <p class="fragrance-icon-name">Poison</p>
                </div>
              </div>
            </div>

            <nav class="submenu-links">
              <a href="#novidades" class="submenu-item">
                <span>Novidades</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </a>
              <a href="#descubra" class="submenu-item">
                <span>Descubra</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </a>
              <a href="#linhas" class="submenu-item">
                <span>Linhas</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </a>
              <a href="#todas" class="submenu-item submenu-item-bold">
                <span>Todas as Fragâncias Femininas</span>
              </a>
              <a href="#expertise" class="submenu-item">
                <span>Expertise de Fragâncias</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </a>
              <a href="#exclusivas" class="submenu-item">
                <span>Criações Exclusivas</span>
              </a>
            </nav>
          </div>

          <!-- Center Video Panel -->
          <div class="fragrances-video-panel">
            <div class="submenu-video-container">
              <video class="submenu-video" autoplay loop muted playsinline>
                <source src="/videos/diorVideo.mp4" type="video/mp4">
              </video>
            </div>
          </div>

          <!-- Right Panel -->
          <div class="fragrances-right-panel">
            <div class="submenu-featured">
              <img src="/images/perfumeee.webp" alt="Dior Holiday" class="submenu-featured-image" />
              <div class="submenu-featured-content">
                <p class="submenu-featured-title">Dior Holiday: o Circo dos Sonhos</p>
                <a href="/dior-holiday" class="submenu-featured-link" data-route="/dior-holiday">Chegue mais perto</a>
              </div>
            </div>

            <div class="submenu-featured submenu-featured-small">
              <img src="/images/perfume22.webp" alt="Presentes" class="submenu-featured-image" />
              <div class="submenu-featured-content">
                <p class="submenu-featured-title">O desfile de presentes encantados da Dior</p>
                <a href="/arte-de-presentear" class="submenu-featured-link" data-route="/arte-de-presentear">Inspire-se</a>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              data-fragrances-trigger="true"
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
