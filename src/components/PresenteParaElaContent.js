// ============================================================================
// PRESENTE PARA ELA CONTENT - Componente de conteúdo da página
// ============================================================================

export class PresenteParaElaContent extends HTMLElement {
  constructor() {
    super();
    this.draggableInstance = null;
  }

  connectedCallback() {
    this.render();
    this.initAnimations();
    this.initDraggableCards();
  }

  disconnectedCallback() {
    // Cleanup draggable
    if (this.draggableInstance) {
      this.draggableInstance.kill();
    }

    if (this.animations) {
      this.animations.forEach((anim) => anim.kill());
    }
  }

  initDraggableCards() {
    // Aguarda o DOM estar completamente renderizado
    setTimeout(() => {
      console.log("🔍 Verificando GSAP...", {
        gsap: !!window.gsap,
        Draggable: !!window.Draggable,
      });

      if (!window.gsap) {
        console.error("❌ GSAP não encontrado!");
        return;
      }

      if (!window.Draggable) {
        console.error(
          "❌ Draggable não encontrado! Verifique se o script está carregado."
        );
        return;
      }

      const container = this.querySelector(".drag-cards-container");
      const track = this.querySelector(".drag-cards-track");
      const cards = this.querySelectorAll(".drag-card");
      const progressBar = this.querySelector(".drag-progress-bar");
      const progressFill = this.querySelector(".drag-progress-fill");

      if (!container || !track || cards.length === 0) {
        console.error("❌ Elementos não encontrados!");
        return;
      }

      console.log("✅ Elementos encontrados:", {
        container: container.offsetWidth,
        track: track.scrollWidth,
        cards: cards.length,
      });

      // Força o track a ter width definido
      let totalWidth = 0;
      cards.forEach((card) => {
        totalWidth += card.offsetWidth + 32; // 32 = 2rem gap
      });
      track.style.width = `${totalWidth}px`;

      // Função para atualizar a barra de progresso
      const updateProgress = (x) => {
        const containerWidth = container.offsetWidth;
        const trackWidth = track.scrollWidth;
        const maxDrag = -(trackWidth - containerWidth);

        if (maxDrag >= 0) return;

        const progress = Math.abs(x / maxDrag);
        const percentage = Math.min(100, Math.max(0, progress * 100));

        window.gsap.set(progressFill, {
          width: `${percentage}%`,
        });
      };

      // Calcula bounds
      const containerWidth = container.offsetWidth;
      const trackWidth = track.scrollWidth;
      const maxDrag = -(trackWidth - containerWidth);

      console.log("📏 Cálculo de bounds:", {
        containerWidth,
        trackWidth,
        maxDrag,
        canDrag: maxDrag < 0,
      });

      if (maxDrag >= 0) {
        console.warn("⚠️ Não há espaço suficiente para arrastar");
        return;
      }

      // Configura o Draggable com configuração mínima para debug
      try {
        this.draggableInstance = window.Draggable.create(track, {
          type: "x",
          edgeResistance: 0.8,
          throwResistance: 2500,
          bounds: {
            minX: maxDrag,
            maxX: 0,
          },
          inertia: true,
          allowNativeTouchScrolling: false,
          allowEventDefault: true,
          snap: {
            x: function (endValue) {
              // Snap suave sem saltos bruscos
              return endValue;
            },
          },
          dragResistance: 0.1,
          throwProps: window.InertiaPlugin ? true : false,
          overshootTolerance: 0,
          onPress: function () {
            console.log("👆 Mouse/Touch pressionado!");
            // Kill any running animations for smooth grab
            window.gsap.killTweensOf(track);
          },
          onDragStart: function () {
            console.log("🎯 Drag INICIADO! x:", this.x);
            // Adiciona easing suave no início do drag
            window.gsap.to(track, {
              duration: 0.3,
              ease: "power2.out",
            });
          },
          onDrag: function () {
            updateProgress(this.x);
          },
          onDragEnd: function () {
            console.log("🎯 Drag finalizado em:", this.x);
          },
          onThrowUpdate: function () {
            updateProgress(this.x);
          },
          onThrowComplete: function () {
            console.log("✅ Momentum finalizado");
          },
        })[0];

        console.log("✅ Draggable criado com sucesso!", this.draggableInstance);
        console.log("🎮 Tente clicar e arrastar agora!");
      } catch (error) {
        console.error("❌ Erro ao criar Draggable:", error);
      }

      // Permite clicar na barra de progresso para navegar
      progressBar.addEventListener("click", (e) => {
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        const targetX = maxDrag * percentage;

        window.gsap.to(track, {
          x: targetX,
          duration: 1.2,
          ease: "power3.inOut",
          onUpdate: function () {
            const currentX = window.gsap.getProperty(track, "x");
            updateProgress(currentX);
          },
        });
      });
    }, 200);
  }

  initAnimations() {
    requestAnimationFrame(() => {
      if (!window.gsap || !window.ScrollTrigger) return;

      this.animations = [];

      // Products grid animation
      const products = this.querySelectorAll(".presente-ela-product");

      products.forEach((product, index) => {
        const anim = window.gsap.from(product, {
          scrollTrigger: {
            trigger: product,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
        });

        this.animations.push(anim);
      });
    });
  }

  render() {
    this.innerHTML = `
      <section class="presente-ela-section">
        <div class="presente-ela-intro">
          <h2 class="presente-ela-section-title">Seleção Exclusiva</h2>
          <p class="presente-ela-section-description">
            Uma curadoria especial de fragrâncias, maquiagem e acessórios que celebram a feminilidade
          </p>
        </div>

        <!-- Drag Cards Section -->
        <div class="drag-cards-section">
          <div class="drag-cards-container">
            <div class="drag-cards-track">
              <div class="drag-card">
                <div class="drag-card-image-wrapper">
                  <img src="./images/bolsa.jpg" alt="Bolsas" class="drag-card-image" />
                  <div class="drag-card-overlay"></div>
                </div>
                <h3 class="drag-card-title">Bolsas</h3>
              </div>

              <div class="drag-card">
                <div class="drag-card-image-wrapper">
                  <img src="./images/joias.jpg" alt="Joias" class="drag-card-image" />
                  <div class="drag-card-overlay"></div>
                </div>
                <h3 class="drag-card-title">Joias</h3>
              </div>

              <div class="drag-card">
                <div class="drag-card-image-wrapper">
                  <img src="./images/couro.jpg" alt="Pequenos artigos de couro" class="drag-card-image" />
                  <div class="drag-card-overlay"></div>
                </div>
                <h3 class="drag-card-title">Pequenos artigos de couro</h3>
              </div>

              <div class="drag-card">
                <div class="drag-card-image-wrapper">
                  <img src="./images/acessorio.jpg" alt="Acessórios" class="drag-card-image" />
                  <div class="drag-card-overlay"></div>
                </div>
                <h3 class="drag-card-title">Acessórios</h3>
              </div>
              <div class="drag-card">
                <div class="drag-card-image-wrapper">
                  <img src="./images/sapatos.jpg" alt="Sapatos" class="drag-card-image" />
                  <div class="drag-card-overlay"></div>
                </div>
                <h3 class="drag-card-title">Sapatos</h3>
              </div>

              <div class="drag-card">
                <div class="drag-card-image-wrapper">
                  <img src="./images/especiais.jpg" alt="Presentes especiais" class="drag-card-image" />
                  <div class="drag-card-overlay"></div>
                </div>
                <h3 class="drag-card-title">Presentes especiais</h3>
              </div>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="drag-progress-bar">
            <div class="drag-progress-fill"></div>
          </div>
        </div>

       
      </section>
    `;
  }
}

customElements.define("presente-para-ela-content", PresenteParaElaContent);
