// ============================================================================
// HORIZONTAL SCROLL SECTION WEB COMPONENT - Scroll horizontal com painéis
// ============================================================================

export class HorizontalScrollSection extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    // Aguarda o DOM e GSAP estarem prontos antes de inicializar animação
    setTimeout(() => {
      this.initScrollAnimation();
    }, 100);
  }

  render() {
    this.innerHTML = `
      <section id="panels" class="horizontal-panels-section">
        <div id="panels-container" class="horizontal-panels-container">
          
          <!-- Panel 1 -->
          <article id="panel-1" class="panel full-screen-panel panel-red">
            <div class="panel-wrapper">
              <div class="panel-content-grid">
                <div class="panel-image-col">
                  <img src="./images/image.png" alt="Dior Holiday Panel 1">
                </div>
                <div class="panel-text-col">
                  
                  
                    
                  </p>
                  <div class="panels-navigation">
                    <div class="nav-panel" data-sign="plus">
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <!-- Panel 2 -->
          <article id="panel-2" class="panel full-screen-panel panel-orange">
            <div class="panel-wrapper">
              <div class="panel-content-grid">
                <div class="panel-image-col">
                  <img src="./images/Image 2 Dior.jpg" alt="Dior Holiday Panel 2">
                </div>
                <div class="panel-text-col">
                  <h2 class="panel-title">Calendário do Advento</h2>
                  <p class="panel-description">
                    Uma nova surpresa a cada dia. Celebre a contagem regressiva 
                    para as festas com momentos únicos de beleza.
                  </p>
                  <div class="panels-navigation">
                    <div class="nav-panel" data-sign="minus">
                      <a href="#panel-1" class="anchor-panel" data-block="button">
                        <span class="button__label">Anterior</span>
                        <span class="button__flair"></span>
                      </a>
                    </div>
                    <div class="nav-panel" data-sign="plus">
                      <a href="#panel-3" class="anchor-panel" data-block="button">
                        <span class="button__label">Próximo</span>
                        <span class="button__flair"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <!-- Panel 3 -->
          <article id="panel-3" class="panel full-screen-panel panel-purple">
            <div class="panel-wrapper">
              <div class="panel-content-grid">
                <div class="panel-image-col">
                  <img src="./images/Image 2 Dior.jpg" alt="Dior Holiday Panel 3">
                </div>
                <div class="panel-text-col">
                  <h2 class="panel-title">Presentes Exclusivos</h2>
                  <p class="panel-description">
                    Encontre o presente perfeito. Das fragrâncias icônicas aos 
                    acessórios luxuosos, cada peça conta uma história.
                  </p>
                  <div class="panels-navigation">
                    <div class="nav-panel" data-sign="minus">
                      <a href="#panel-2" class="anchor-panel" data-block="button">
                        <span class="button__label">Anterior</span>
                        <span class="button__flair"></span>
                      </a>
                    </div>
                    <div class="nav-panel" data-sign="plus">
                      <a href="#panel-4" class="anchor-panel" data-block="button">
                        <span class="button__label">Próximo</span>
                        <span class="button__flair"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <!-- Panel 4 -->
          <article id="panel-4" class="panel full-screen-panel panel-green">
            <div class="panel-wrapper">
              <div class="panel-content-grid">
                <div class="panel-image-col">
                  <img src="./images/Image 2 Dior.jpg" alt="Dior Holiday Panel 4">
                </div>
                <div class="panel-text-col">
                  <h2 class="panel-title">Maquiagem Festiva</h2>
                  <p class="panel-description">
                    Brilhe nas festas com a coleção de maquiagem Holiday. 
                    Looks radiantes para momentos inesquecíveis.
                  </p>
                  <div class="panels-navigation">
                    <div class="nav-panel" data-sign="minus">
                      <a href="#panel-3" class="anchor-panel" data-block="button">
                        <span class="button__label">Anterior</span>
                        <span class="button__flair"></span>
                      </a>
                    </div>
                    <div class="nav-panel" data-sign="plus">
                      <a href="#panel-5" class="anchor-panel" data-block="button">
                        <span class="button__label">Próximo</span>
                        <span class="button__flair"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <!-- Panel 5 -->
          <article id="panel-5" class="panel full-screen-panel panel-gray">
            <div class="panel-wrapper">
              <div class="panel-content-grid">
                <div class="panel-image-col">
                  <img src="./images/Image 2 Dior.jpg" alt="Dior Holiday Panel 5">
                </div>
                <div class="panel-text-col">
                  <h2 class="panel-title">Coleção Completa</h2>
                  <p class="panel-description">
                    Explore toda a coleção Dior Holiday. Uma jornada de 
                    luxo e sofisticação para suas celebrações.
                  </p>
                  
                  <!-- Cards Grid -->
                  <div class="cards-wrapper">
                    <div class="product-card">Produto 1</div>
                    <div class="product-card">Produto 2</div>
                    <div class="product-card">Produto 3</div>
                    <div class="product-card">Produto 4</div>
                    <div class="product-card">Produto 5</div>
                    <div class="product-card">Produto 6</div>
                  </div>

                  <div class="panels-navigation">
                    <div class="nav-panel" data-sign="minus">
                      <a href="#panel-4" class="anchor-panel" data-block="button">
                        <span class="button__label">Anterior</span>
                        <span class="button__flair"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

        </div>
      </section>
    `;
  }

  initScrollAnimation() {
    // Verifica se GSAP e ScrollTrigger estão disponíveis
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.error("GSAP or ScrollTrigger not loaded");
      return;
    }

    // Registra plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    let panelsSection = this.querySelector("#panels");
    let panelsContainer = this.querySelector("#panels-container");

    if (!panelsSection || !panelsContainer) {
      console.error("Panels elements not found");
      return;
    }

    const panels = gsap.utils.toArray("#panels-container .panel");

    if (panels.length === 0) {
      console.error("No panels found");
      return;
    }

    let tween;

    // Navegação entre painéis - EXATAMENTE como no código original
    document.querySelectorAll(".anchor-panel").forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        let targetElem = document.querySelector(e.target.getAttribute("href"));
        let y = targetElem;

        if (
          targetElem &&
          panelsContainer.isSameNode(targetElem.parentElement)
        ) {
          let totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start;
          let totalMovement = (panels.length - 1) * targetElem.offsetWidth;
          y = Math.round(
            tween.scrollTrigger.start +
              (targetElem.offsetLeft / totalMovement) * totalScroll
          );
        }

        gsap.to(window, {
          scrollTo: {
            y: y,
            autoKill: false,
          },
          duration: 1,
        });
      });
    });

    // Animação dos painéis - EXATAMENTE como no código original
    tween = gsap.to(panels, {
      x: () => -1 * (panelsContainer.scrollWidth - innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: panelsContainer,
        pin: true,
        pinSpacing: true,
        start: "top top",
        scrub: 1,
        end: () => "+=" + (panelsContainer.scrollWidth - innerWidth),
        invalidateOnRefresh: true,
      },
    });

    // Refresh ScrollTrigger após resize
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    });
  }

  disconnectedCallback() {
    // Limpa ScrollTriggers quando o componente é removido
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger && this.contains(trigger.vars.trigger)) {
        trigger.kill();
      }
    });
  }
}

customElements.define("horizontal-scroll-section", HorizontalScrollSection);
