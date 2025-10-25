// ============================================================================
// SPA ROUTER - Sistema de Roteamento para Single Page Application
// ============================================================================

class Router {
  constructor() {
    this.routes = {};
    this.currentPage = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    this.initialized = true;

    // Escuta mudanças de URL (botão voltar/avançar)
    window.addEventListener("popstate", () => this.handleRouteChange());

    // Intercepta cliques em links com data-route
    document.addEventListener("click", (e) => {
      const link = e.target.closest("[data-route]");
      if (link) {
        e.preventDefault();
        const path = link.getAttribute("data-route");
        this.navigate(path);
      }
    });

    // Carrega a rota inicial
    this.handleRouteChange();
  }

  register(path, componentName) {
    this.routes[path] = componentName;
  }

  navigate(path) {
    // Fecha o menu dropdown se estiver aberto antes de navegar
    const menuIsOpen = document.querySelector(".dropdown.open");

    if (menuIsOpen) {
      // Dispara evento para fechar o menu
      window.dispatchEvent(new CustomEvent("close-menu-for-navigation"));

      // Aguarda a animação do menu fechar (1.5s) e então mostra o preloader
      setTimeout(() => {
        this.showPreloader(() => {
          window.history.pushState({}, "", path);
          this.handleRouteChange();
        });
      }, 1500);
    } else {
      // Se o menu não está aberto, mostra preloader imediatamente
      this.showPreloader(() => {
        window.history.pushState({}, "", path);
        this.handleRouteChange();
      });
    }
  }

  showPreloader(callback) {
    const preloader = document.querySelector(".preloader");
    if (!preloader) {
      callback();
      return;
    }

    // Torna o preloader visível
    gsap.set(preloader, { display: "flex", height: "100vh" });

    const tl = gsap.timeline({
      onComplete: () => {
        // Executa o callback (troca de página)
        callback();
        // Aguarda um pouco e esconde o preloader
        setTimeout(() => this.hidePreloader(), 800);
      },
    });

    tl.to(".preloader .text-container", {
      duration: 0,
      visibility: "visible",
      ease: "Power3.easeOut",
    })
      .to(".preloader .imagem-logo img", {
        duration: 0,
        opacity: 1,
        ease: "Power3.easeOut",
      })
      .to({}, { duration: 0.5 }); // Pausa curta mostrando o logo
  }

  hidePreloader() {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(".preloader", { display: "none" });
      },
    });

    tl.to(".preloader", {
      duration: 1,
      height: "0vh",
      ease: "Power3.easeOut",
    }).to(
      ".preloader .imagem-logo img",
      {
        opacity: 0,
        duration: 0.3,
      },
      "<"
    );
  }

  async handleRouteChange() {
    const path = window.location.pathname;
    const componentName = this.routes[path] || this.routes["/"];

    if (!componentName) {
      console.error(`Route not found: ${path}`);
      return;
    }

    const appRoot = document.getElementById("app-root");
    if (!appRoot) {
      console.error("app-root element not found");
      return;
    }

    // Remove a página atual
    if (this.currentPage) {
      this.currentPage.remove();
    }

    // Cria e adiciona a nova página
    const pageElement = document.createElement(componentName);
    appRoot.appendChild(pageElement);
    this.currentPage = pageElement;

    // Scroll to top
    window.scrollTo(0, 0);

    // Reinicializa funcionalidades após carregar página
    this.reinitializeFeatures();
  }

  reinitializeFeatures() {
    // Aguarda um tick para garantir que DOM foi atualizado
    setTimeout(() => {
      // Dispara evento customizado para reinicializar features
      window.dispatchEvent(new CustomEvent("page-loaded"));
    }, 100);
  }
}

export const router = new Router();
