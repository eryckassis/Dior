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
  }

  disconnectedCallback() {
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
            <!-- Gift Cards Grid -->
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
                  <img src="./images/paraEle.jpg" alt="Presentes para homem" class="moda-card-image" />
                  <div class="moda-card-overlay"></div>
                </div>
                <div class="moda-card-content">
                  <h2 class="moda-card-title">Presentes para homem</h2>
                  <a href="#para-ele" class="moda-card-button">Descobrir</a>
                </div>
              </div>
            </section>
          </div>

        </main>

        <!-- Footer -->
        <footer-section></footer-section>
      </div>
    `;
  }
}

customElements.define("moda-acessorios-page", ModaEAcessoriosPage);
