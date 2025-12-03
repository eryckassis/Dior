// ============================================================================
// MODA E ACESSÓRIOS PAGE - Página dedicada a Moda e Acessórios
// ============================================================================

import "../components/ModaNavigation.js";
import "../components/FooterSection.js";
import "../components/ModaAcessoriosContent.js";
import "../styles/moda-acessorios.css";

export class ModaEAcessoriosPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.initAnimations();
    this.initButtonAnimation();
    this.initCardAnimations();
    this.initCardButtons();
    this.initDragCards();
  }

  disconnectedCallback() {
    // Cleanup draggable
    if (this.draggableInstance) {
      this.draggableInstance.kill();
    }
    // Cleanup animations
    if (this.animations) {
      this.animations.forEach((anim) => anim.kill());
    }
  }

  initAnimations() {
    requestAnimationFrame(() => {
      if (!window.gsap) return;

      this.animations = [];

      // Hero animation
      const heroTl = window.gsap.timeline();
      heroTl
        .from(".moda-hero-label", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".moda-hero-title",
          {
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".moda-hero-subtitle",
          {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(
          ".moda-discover-button",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        );

      this.animations.push(heroTl);

      // Content fade in
      const contentAnim = window.gsap.from(".moda-content-wrapper", {
        scrollTrigger: {
          trigger: ".moda-content-wrapper",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      this.animations.push(contentAnim);
    });
  }

  initButtonAnimation() {
    requestAnimationFrame(() => {
      if (!window.gsap) return;

      const button = this.querySelector(".moda-discover-button");

      if (button) {
        console.log("✅ Botão encontrado:", button);

        // Mouseenter - linha diminui para 0
        button.addEventListener("mouseenter", () => {
          console.log("Mouse entrou no botão");
          window.gsap.to(button, {
            "--underline-width": "0%",
            duration: 0.35,
            ease: "power2.inOut",
          });
        });

        // Mouseleave - linha volta a 100%
        button.addEventListener("mouseleave", () => {
          console.log("Mouse saiu do botão");
          window.gsap.to(button, {
            "--underline-width": "100%",
            duration: 0.35,
            ease: "power2.inOut",
          });
        });
      } else {
        console.error("❌ Botão NÃO encontrado!");
      }
    });
  }

  initCardAnimations() {
    requestAnimationFrame(() => {
      if (!window.gsap || !window.ScrollTrigger) return;

      const cards = this.querySelectorAll(".moda-gift-card");

      cards.forEach((card, index) => {
        const image = card.querySelector(".moda-card-image");
        const overlay = card.querySelector(".moda-card-overlay");
        const title = card.querySelector(".moda-card-title");
        const button = card.querySelector(".moda-card-button");

        // Set initial states
        window.gsap.set(image, {
          scale: 1.3,
          opacity: 0,
        });

        window.gsap.set(overlay, {
          scaleX: 1,
          transformOrigin: "left center",
        });

        window.gsap.set([title, button], {
          y: 30,
          opacity: 0,
        });

        // Create scroll trigger animation
        const tl = window.gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play reverse play reverse",
          },
          delay: index * 0.2,
        });

        tl.to(image, {
          opacity: 1,
          duration: 0.01,
        })
          .to(
            overlay,
            {
              scaleX: 0,
              duration: 1.2,
              ease: "power3.inOut",
            },
            0.1
          )
          .to(
            image,
            {
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
            },
            0.1
          )
          .to(
            title,
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
            },
            0.5
          )
          .to(
            button,
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
            },
            0.6
          );
      });
    });
  }

  initCardButtons() {
    requestAnimationFrame(() => {
      if (!window.gsap) return;

      const buttons = this.querySelectorAll(".moda-card-button");

      buttons.forEach((button) => {
        // Mouseenter - linha diminui para 0
        button.addEventListener("mouseenter", () => {
          window.gsap.to(button, {
            "--underline-width": "0%",
            duration: 0.35,
            ease: "power2.inOut",
          });
        });

        // Mouseleave - linha volta a 100%
        button.addEventListener("mouseleave", () => {
          window.gsap.to(button, {
            "--underline-width": "100%",
            duration: 0.35,
            ease: "power2.inOut",
          });
        });
      });
    });
  }

  initDragCards() {
    setTimeout(() => {
      if (!window.gsap || !window.Draggable) {
        console.warn("GSAP ou Draggable não disponível");
        return;
      }

      const container = this.querySelector(".moda-drag-container");
      const slider = this.querySelector(".moda-gift-cards-section");
      const progressFill = this.querySelector(".moda-drag-progress-fill");
      const cards = this.querySelectorAll(".moda-gift-card");

      if (!container || !slider || cards.length === 0) {
        console.warn("Container, slider ou cards não encontrados");
        return;
      }

      // Função para calcular bounds corretamente
      const calculateBounds = () => {
        const containerWidth = container.offsetWidth;
        const firstCard = cards[0].getBoundingClientRect();
        const lastCard = cards[cards.length - 1].getBoundingClientRect();

        // Largura real do conteúdo: do início do primeiro ao fim do último card
        const contentWidth = lastCard.right - firstCard.left;

        // Adiciona padding extra para ver o último card completamente
        const padding =
          parseFloat(getComputedStyle(container).paddingLeft) || 0;
        const totalWidth = contentWidth + padding;

        // MaxDrag negativo para mover para esquerda
        const maxDrag = Math.min(0, -(totalWidth - containerWidth + padding));

        console.log("📏 Bounds:", {
          containerWidth,
          contentWidth,
          totalWidth,
          maxDrag,
        });

        return { minX: maxDrag, maxX: 0 };
      };

      let bounds = calculateBounds();

      // Atualizar progress bar
      const updateProgress = (x) => {
        if (!progressFill || bounds.minX >= 0) return;
        const progress = Math.abs(x) / Math.abs(bounds.minX);
        const clampedProgress = Math.min(Math.max(progress, 0), 1);
        window.gsap.to(progressFill, {
          scaleX: Math.max(clampedProgress, 0.15),
          duration: 0.1,
          ease: "none",
        });
      };

      // Criar Draggable
      this.draggableInstance = window.Draggable.create(slider, {
        type: "x",
        bounds: bounds,
        inertia: true,
        edgeResistance: 0.65,
        dragResistance: 0,
        throwResistance: 2000,
        cursor: "grab",
        activeCursor: "grabbing",
        allowNativeTouchScrolling: false,
        onPress: function () {
          window.gsap.killTweensOf(slider);
        },
        onDrag: function () {
          updateProgress(this.x);
        },
        onThrowUpdate: function () {
          updateProgress(this.x);
        },
        onClick: function (e) {
          if (e.target.classList.contains("moda-card-button")) {
            e.target.click();
          }
        },
      })[0];

      // Recalcular bounds on resize
      window.addEventListener("resize", () => {
        bounds = calculateBounds();
        if (this.draggableInstance) {
          this.draggableInstance.applyBounds(bounds);
          // Corrigir posição se estiver fora dos bounds
          const currentX = this.draggableInstance.x;
          if (currentX < bounds.minX) {
            window.gsap.to(slider, { x: bounds.minX, duration: 0.3 });
          }
        }
      });

      // Recalcular após imagens carregarem
      setTimeout(() => {
        bounds = calculateBounds();
        if (this.draggableInstance) {
          this.draggableInstance.applyBounds(bounds);
        }
      }, 500);

      // Initial progress
      updateProgress(0);

      console.log("✅ Drag cards inicializado!", bounds);
    }, 300);
  }

  render() {
    this.innerHTML = `
      <div class="all-content" id="all-content" role="main">
        <!-- Moda Navigation (customizada) -->
        <moda-navigation></moda-navigation>

          <section class="moda-hero-section">
            <div class="moda-hero-overlay"></div>
            <video
              class="moda-hero-video"
              autoplay
              muted
              loop
              playsinline
            >
              <source src="./videos/diorAcessories.webm" type="video/webm" />
            </video>
            
            <div class="moda-hero-content">
              <p class="moda-hero-label">Ideias de presentes para o fim de ano</p>
              <h1 class="moda-hero-title">O mundo encantado da Dior</h1>
              <p class="moda-hero-subtitle">
                Descubra a seleção de presentes da Maison: um convite para celebrar a arte de presentear, desde já, no espírito das festas de fim de ano
              </p>
              <a href="#" class="moda-discover-button">Descobrir</a>
            </div>
          </section>

          <!-- Content Wrapper -->
          <div class="moda-content-wrapper">
            <!-- Drag Cards Container -->
            <div class="moda-drag-container">
              <section class="moda-gift-cards-section">
                <div class="moda-gift-card">
                  <div class="moda-card-image-wrapper">
                    <img src="./images/paraEla.jpg" alt="Presentes para ela" class="moda-card-image" />
                    <div class="moda-card-overlay"></div>
                  </div>
                  <div class="moda-card-content">
                    <h2 class="moda-card-title">Presentes para ela</h2>
                    <a href="/para-ela" data-route="/para-ela" class="moda-card-button">Descobrir</a>
                  </div>
                </div>

                <div class="moda-gift-card">
                  <div class="moda-card-image-wrapper">
                    <img src="./images/paraEle.jpg" alt="Bolsas femininas" class="moda-card-image" />
                    <div class="moda-card-overlay"></div>
                  </div>
                  <div class="moda-card-content">
                    <h2 class="moda-card-title">Bolsas femininas</h2>
                    <a href="#bolsas" class="moda-card-button">Descobrir</a>
                  </div>
                </div>

                <div class="moda-gift-card">
                  <div class="moda-card-image-wrapper">
                    <img src="./images/miss-dior-parfum.jpg" alt="Presentes para homem" class="moda-card-image" />
                    <div class="moda-card-overlay"></div>
                  </div>
                  <div class="moda-card-content">
                    <h2 class="moda-card-title">Presentes para homem</h2>
                    <a href="#para-ele" class="moda-card-button">Descobrir</a>
                  </div>
                </div>

                <div class="moda-gift-card">
                  <div class="moda-card-image-wrapper">
                    <img src="./images/miss-dior-essence.jpg" alt="Sapatos masculinos" class="moda-card-image" />
                    <div class="moda-card-overlay"></div>
                  </div>
                  <div class="moda-card-content">
                    <h2 class="moda-card-title">Sapatos masculinos</h2>
                    <a href="#sapatos" class="moda-card-button">Descobrir</a>
                  </div>
                </div>

                <div class="moda-gift-card">
                  <div class="moda-card-image-wrapper">
                    <img src="./images/dior-addict.jpg" alt="Joias" class="moda-card-image" />
                    <div class="moda-card-overlay"></div>
                  </div>
                  <div class="moda-card-content">
                    <h2 class="moda-card-title">Joias</h2>
                    <a href="#joias" class="moda-card-button">Descobrir</a>
                  </div>
                </div>

                <div class="moda-gift-card">
                  <div class="moda-card-image-wrapper">
                    <img src="./images/dior-addict.jpg" alt="Joias" class="moda-card-image" />
                    <div class="moda-card-overlay"></div>
                  </div>
                  <div class="moda-card-content">
                    <h2 class="moda-card-title">Joias</h2>
                    <a href="#joias" class="moda-card-button">Descobrir</a>
                  </div>
                </div>

                <div class="moda-gift-card">
                  <div class="moda-card-image-wrapper">
                    <img src="./images/dior-addict.jpg" alt="Joias" class="moda-card-image" />
                    <div class="moda-card-overlay"></div>
                  </div>
                  <div class="moda-card-content">
                    <h2 class="moda-card-title">Joias</h2>
                    <a href="#joias" class="moda-card-button">Descobrir</a>
                  </div>
                </div>

                <div class="moda-gift-card">
                  <div class="moda-card-image-wrapper">
                    <img src="./images/dior-addict.jpg" alt="Joias" class="moda-card-image" />
                    <div class="moda-card-overlay"></div>
                  </div>
                  <div class="moda-card-content">
                    <h2 class="moda-card-title">Joias</h2>
                    <a href="#joias" class="moda-card-button">Descobrir</a>
                  </div>
                </div>
              </section>
            </div>

            <!-- Progress Bar -->
            <div class="moda-drag-progress">
              <div class="moda-drag-progress-fill"></div>
            </div>
          </div>

        <!-- Footer -->
        <footer-section></footer-section>
      </div>
    `;
  }
}

customElements.define("moda-acessorios-page", ModaEAcessoriosPage);
