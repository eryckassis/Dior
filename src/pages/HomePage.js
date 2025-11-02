// ============================================================================
// HOME PAGE - Página inicial usando Web Components
// ============================================================================

import "../components/AppNavigation.js";
import "../components/HeroSection.js";
import "../components/TextContent.js";
import "../components/VideoSection.js";
import "../components/KeyholeSection.js";
import "../components/AnimatedSections.js";
import "../components/FooterSection.js";
import "../styles/arte-de-presentear.css";
import "../styles/category-interactive.css";
import "../styles/services-dior.css";

export class HomePage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.initVideoControls();
    this.initCategoryTabs();
    this.initServicesDiorAnimations();
    this.initServicesButtonsAnimation();
  }

  initServicesButtonsAnimation() {
    if (!window.gsap) return;

    requestAnimationFrame(() => {
      const buttons = this.querySelectorAll('.services-button');
      
      buttons.forEach(button => {
        const underline = window.getComputedStyle(button, '::after');
        
        // Mouseenter - linha diminui para 0
        button.addEventListener('mouseenter', () => {
          window.gsap.to(button, {
            '--underline-width': '0%',
            duration: 0.35,
            ease: 'power2.inOut'
          });
        });

        // Mouseleave - linha volta a 100%
        button.addEventListener('mouseleave', () => {
          window.gsap.to(button, {
            '--underline-width': '100%',
            duration: 0.35,
            ease: 'power2.inOut'
          });
        });
      });
    });
  }

  initServicesDiorAnimations() {
    if (!window.gsap || !window.ScrollTrigger) return;

    requestAnimationFrame(() => {
      const section = this.querySelector(".services-dior-section");
      if (!section) return;

      // Animação do texto
      const title = section.querySelector(".services-title");
      const description = section.querySelector(".services-description");

      if (title) {
        window.gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (description) {
        window.gsap.from(description, {
          scrollTrigger: {
            trigger: description,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
        });
      }

      // Animação das imagens com reveal
      const imageItems = section.querySelectorAll(".services-image-item");

      imageItems.forEach((item, index) => {
        const wrap = item.querySelector(".services-image-wrap");
        const overlay = wrap.querySelector(".services-reveal-overlay");
        const image = wrap.querySelector(".services-image");
        const info = item.querySelector(".services-image-info");

        // Set initial states
        window.gsap.set(overlay, {
          scaleX: 1,
          transformOrigin: "left center",
        });

        window.gsap.set(image, {
          scale: 1.3,
          opacity: 0,
        });

        window.gsap.set(info, {
          opacity: 0,
          y: 20,
        });

        // Create timeline with ScrollTrigger
        const tl = window.gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none none",
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
              duration: 1,
              ease: "power3.inOut",
            },
            0.1
          )
          .to(
            image,
            {
              scale: 1,
              duration: 1,
              ease: "power3.out",
            },
            0.1
          )
          .to(
            info,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
            },
            0.5
          );
      });
    });
  }

  initCategoryTabs() {
    requestAnimationFrame(() => {
      const tabs = this.querySelectorAll(".category-tab");
      const contents = this.querySelectorAll(".category-content");

      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          const category = tab.dataset.category;

          // Remove active class from all tabs
          tabs.forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");

          // Animate out current content
          const activeContent = this.querySelector(".category-content.active");
          if (activeContent) {
            this.animateOut(activeContent, () => {
              activeContent.classList.remove("active");

              // Show new content
              const newContent = this.querySelector(
                `[data-content="${category}"]`
              );
              if (newContent) {
                newContent.classList.add("active");
                this.animateIn(newContent);
              }
            });
          }
        });
      });

      // Animate initial content
      const initialContent = this.querySelector(".category-content.active");
      if (initialContent && window.gsap) {
        this.revealImages(initialContent);
      }
    });
  }

  animateOut(element, callback) {
    if (!window.gsap) {
      element.style.opacity = "0";
      setTimeout(callback, 300);
      return;
    }

    const items = element.querySelectorAll(".category-item");

    window.gsap.to(items, {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.3,
      ease: "power2.in",
      onComplete: callback,
    });
  }

  animateIn(element) {
    if (!window.gsap) {
      element.style.opacity = "1";
      return;
    }

    const items = element.querySelectorAll(".category-item");

    // Reset initial state
    window.gsap.set(items, {
      opacity: 0,
      y: 30,
    });

    // Animate in
    window.gsap.to(items, {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: "power3.out",
    });

    // Reveal images
    this.revealImages(element);
  }

  revealImages(container) {
    if (!window.gsap) return;

    const imageWraps = container.querySelectorAll(".category-image-wrap");

    imageWraps.forEach((wrap, index) => {
      const overlay = wrap.querySelector(".image-reveal-overlay");
      const image = wrap.querySelector(".category-image");

      // Set initial states
      window.gsap.set(overlay, {
        scaleX: 1,
        transformOrigin: "left center",
      });

      window.gsap.set(image, {
        scale: 1.2,
        opacity: 0,
      });

      // Create reveal animation
      const tl = window.gsap.timeline({
        delay: index * 0.1,
      });

      tl.to(image, {
        opacity: 1,
        duration: 0.01,
      })
        .to(
          overlay,
          {
            scaleX: 0,
            duration: 0.8,
            ease: "power3.inOut",
          },
          0.1
        )
        .to(
          image,
          {
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          0.1
        );
    });
  }

  initVideoControls() {
    // Aguardar um frame para garantir que o DOM está pronto
    requestAnimationFrame(() => {
      const video = this.querySelector("#arte-section-video");
      const playPauseBtn = this.querySelector("#arte-play-pause-btn");
      const muteUnmuteBtn = this.querySelector("#arte-mute-unmute-btn");

      if (!video || !playPauseBtn || !muteUnmuteBtn) return;

      const iconPlay = playPauseBtn.querySelector(".icon-play");
      const iconPause = playPauseBtn.querySelector(".icon-pause");
      const iconMute = muteUnmuteBtn.querySelector(".icon-mute");
      const iconUnmute = muteUnmuteBtn.querySelector(".icon-unmute");

      // Play/Pause Toggle
      playPauseBtn.addEventListener("click", () => {
        if (video.paused) {
          video.play();
          iconPlay.style.display = "none";
          iconPause.style.display = "block";
        } else {
          video.pause();
          iconPlay.style.display = "block";
          iconPause.style.display = "none";
        }
      });

      // Mute/Unmute Toggle
      muteUnmuteBtn.addEventListener("click", () => {
        if (video.muted) {
          video.muted = false;
          iconMute.style.display = "none";
          iconUnmute.style.display = "block";
        } else {
          video.muted = true;
          iconMute.style.display = "block";
          iconUnmute.style.display = "none";
        }
      });
    });
  }

  render() {
    this.innerHTML = `
      <div class="all-content" id="all-content" role="main">
        <!-- Navigation -->
        <app-navigation></app-navigation>

        <!-- Main Content Area -->
        <main class="content" id="content">
          <div class="grid-container">
            <!-- Hero Section with Video -->
            <hero-section
              video="./videos/VideoSection1.mp4"
              label="Dior Holiday"
              title="Bem-vindo ao Circo dos Sonhos Dior"
              button-text="Chegue mais perto"
            ></hero-section>

            <!-- Text Content Section -->
            <text-content
              heading="Dior Holiday — Embracing the Extraordinary"
              text="O encanto das suas festas é iluminado pelas novas criações festivas Dior.<br />A verdadeira elegância se revela nos momentos de celebração, quando a Dior transforma cada detalhe em uma expressão radiante de alegria."
            ></text-content>

            <!-- Second Video Section -->
            <video-section
              video="./videos/videosection1.2.mp4"
              section-id="depth-meaning"
            ></video-section>
          </div>
        </main>
      </div>

      <!-- Arte de Presentear Video Section -->
      <section class="arte-presentear-video-section">
        <video
          class="arte-video-bg"
          id="arte-section-video"
          autoplay
          muted
          loop
          playsinline
        >
          <source src="./videos/aArteDePresentear.mp4" type="video/mp4" />
        </video>

        <!-- Conteúdo de texto sobre o vídeo -->
        <div class="arte-video-content">
          <h1 class="arte-video-title">A arte de presentear</h1>
          <p class="arte-video-description">Descubra presentes exclusivos que celebram momentos especiais</p>
        </div>

        <!-- Video Controls - Liquid Glass -->
        <div class="video-controls">
          <button
            class="glass-button"
            id="arte-play-pause-btn"
            aria-label="Play/Pause"
            data-block="button"
          >
            <span class="button__flair"></span>
            <svg
              class="icon-play"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <svg
              class="icon-pause"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              style="display: none"
            >
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          </button>

          <button
            class="glass-button"
            id="arte-mute-unmute-btn"
            aria-label="Mute/Unmute"
            data-block="button"
          >
            <span class="button__flair"></span>
            <svg
              class="icon-mute"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
            <svg
              class="icon-unmute"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              style="display: none"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          </button>
        </div>
      </section>

      <!-- Section Spacer -->
      <div class="section-spacer-wrapper">
        <section class="parallax-gallery">
          <div class="parallax-panel parallax-panel--1">
            <div class="parallax-column">
              <div class="parallax-image-wrap">
                <img class="parallax-img" src="./images/cofre.jpg" alt="Dior Collection 1" />
              </div>
              <p class="parallax-price-second">R$ 1.235,00</p>
              <p class="parallax-caption-second">Coffret Capture Duo</p>
            </div>
          </div>
          
          <div class="parallax-panel parallax-panel--2">
            <div class="parallax-column">
              <div class="parallax-image-wrap">
                <img class="parallax-img" src="./images/diorhomme.jpg" alt="Dior Collection 2" />
              </div>
              <p class="parallax-price-second">R$ 965,00</p>
              <p class="parallax-caption-second">Coffret Dior Homme - Edição Limitada</p>
              <p class="parallax-caption-subtext">A eau de toilette Dior Homme e o seu travel spray em um unico coffret presente de edição limitada</p>
              
            </div>
          </div>
          
          <div class="parallax-panel parallax-panel--3">
            <div class="parallax-column">
              <div class="parallax-image-wrap">
                <img class="parallax-img" src="./images/diormaster.jpg" alt="Dior Collection 3" />
              </div>
              <p class="parallax-price-second">R$ 530,00</p>
              <p class="parallax-caption-second">O Ritual de Brilho Natural - Edição Limitada</p>
            </div>
          </div>
        </section>
      </div>

      <!-- Interactive Category Section -->
      <section class="category-interactive-section">
        <div class="category-container">
          <!-- Category Tabs -->
          <div class="category-tabs">
            <button class="category-tab active" data-category="para-ela">
              <span>Para Ela</span>
            </button>
            <button class="category-tab" data-category="para-ele">
              <span>Para Ele</span>
            </button>
            <button class="category-tab" data-category="para-casa">
              <span>Para Casa</span>
            </button>
          </div>

          <!-- Category Content -->
          <div class="category-content-wrapper">
            <!-- Para Ela -->
            <div class="category-content active" data-content="para-ela">
              <div class="category-grid">
                <div class="category-item">
                  <div class="category-image-wrap">
                    <div class="image-reveal-overlay"></div>
                    <img src="./images/paraela1.webp" alt="J'adore" class="category-image" />
                  </div>
                  <p class="category-product-name">J'adore</p>
                  <p class="category-product-price">R$ 615,00</p>
                </div>

                <div class="category-item">
                  <div class="category-image-wrap">
                    <div class="image-reveal-overlay"></div>
                    <img src="./images/paraela2.webp" alt="Rose Star" class="category-image" />
                  </div>
                  <p class="category-product-name">Rose Star</p>
                  <p class="category-product-price">R$ 1.625,00</p>
                </div>

                <div class="category-item">
                  <div class="category-image-wrap">
                    <div class="image-reveal-overlay"></div>
                    <img src="./images/paraela3.webp" alt="Miss Dior Essence" class="category-image" />
                  </div>
                  <p class="category-product-name">Miss Dior Essence</p>
                  <p class="category-product-price">R$ 799,00</p>
                </div>

                <div class="category-item">
                  <div class="category-image-wrap">
                    <div class="image-reveal-overlay"></div>
                    <img src="./images/paraela4.webp" alt="Rouge Dior Sequin Liquid Duo" class="category-image" />
                  </div>
                  <p class="category-product-name">Rouge Dior Sequin Liquid Duo - edição limitada</p>
                  <p class="category-product-price">R$ 355,00</p>
                </div>
              </div>
            </div>

            <!-- Para Ele -->
            <div class="category-content" data-content="para-ele">
              <div class="category-grid">
                <div class="category-item">
                  <div class="category-image-wrap">
                    <div class="image-reveal-overlay"></div>
                    <img src="./images/paraele1.webp" alt="Sauvage Eau de Toilette" class="category-image" />
                  </div>
                  <p class="category-product-name">Sauvage Eau de Toilette</p>
                  <p class="category-product-price">R$ 589,00</p>
                </div>

                <div class="category-item">
                  <div class="category-image-wrap">
                    <div class="image-reveal-overlay"></div>
                    <img src="./images/paraele2.webp" alt="Dior Homme Intense" class="category-image" />
                  </div>
                  <p class="category-product-name">Dior Homme Intense</p>
                  <p class="category-product-price">R$ 725,00</p>
                </div>

                <div class="category-item">
                  <div class="category-image-wrap">
                    <div class="image-reveal-overlay"></div>
                    <img src="./images/paraele3.webp" alt="Fahrenheit" class="category-image" />
                  </div>
                  <p class="category-product-name">Fahrenheit</p>
                  <p class="category-product-price">R$ 655,00</p>
                </div>

                <div class="category-item">
                  <div class="category-image-wrap">
                    <div class="image-reveal-overlay"></div>
                    <img src="./images/paraele4.webp" alt="Dior Homme Sport" class="category-image" />
                  </div>
                  <p class="category-product-name">Dior Homme Sport</p>
                  <p class="category-product-price">R$ 599,00</p>
                </div>
              </div>
            </div>

            <!-- Para Casa -->
            <div class="category-content" data-content="para-casa">
              <div class="category-grid">
                <div class="category-item">
                  <div class="category-image-wrap">
                    <div class="image-reveal-overlay"></div>
                    <img src="./images/paracasa.webp" alt="Vela Perfumada Miss Dior" class="category-image" />
                  </div>
                  <p class="category-product-name">Vela Perfumada Miss Dior</p>
                  <p class="category-product-price">R$ 425,00</p>
                </div>

                <div class="category-item">
                  <div class="category-image-wrap">
                    <div class="image-reveal-overlay"></div>
                    <img src="./images/paracasa2.webp" alt="Difusor de Ambiente" class="category-image" />
                  </div>
                  <p class="category-product-name">Difusor de Ambiente</p>
                  <p class="category-product-price">R$ 520,00</p>
                </div>

                <div class="category-item">
                  <div class="category-image-wrap">
                    <div class="image-reveal-overlay"></div>
                    <img src="./images/diorhomme.jpg" alt="Home Spray Gris Dior" class="category-image" />
                  </div>
                  <p class="category-product-name">Home Spray Gris Dior</p>
                  <p class="category-product-price">R$ 380,00</p>
                </div>

                <div class="category-item">
                  <div class="category-image-wrap">
                    <div class="image-reveal-overlay"></div>
                    <img src="./images/diormaster.jpg" alt="Porta-velas Dior" class="category-image" />
                  </div>
                  <p class="category-product-name">Porta-velas Dior</p>
                  <p class="category-product-price">R$ 295,00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Keyhole Reveal Section -->
      <keyhole-section
        image="./images/Image 2 Dior.jpg"
        subtitle="Dior Backstage Glow Maximizer Palette"
        title="Uma nova visão da icônica paleta de iluminadores"
        button-text="Descubra"
      ></keyhole-section>

      <!-- Services Dior Section -->
      <section class="services-dior-section" id="services-dior">
        <div class="services-container">
          <!-- Left Content - Text -->
          <div class="services-text-content">
            <h2 class="services-title">Os serviços Dior sob os holofotes</h2>
            <p class="services-description">
              A Dior revela seus serviços extraordinários que darão um toque final aos seus presentes para uma temporada de festas memorável e mágica.
            </p>
          </div>

          <!-- Right Content - Images -->
          <div class="services-images-grid">
            <div class="services-image-item services-image-large">
              <div class="services-image-wrap">
                <div class="services-reveal-overlay"></div>
                <img src="./images/cofre.jpg" alt="A Arte de Presentear" class="services-image" />
              </div>
              <div class="services-image-info">
                <p class="services-image-title">A Arte de Presentear</p>
                <a href="/arte-de-presentear" class="services-button" data-route="/arte-de-presentear">Descubra</a>
              </div>
            </div>

            <div class="services-image-item services-image-small">
              <div class="services-image-wrap">
                <div class="services-reveal-overlay"></div>
                <img src="./images/diorhomme.jpg" alt="O Atelier de Personalização" class="services-image" />
              </div>
              <div class="services-image-info">
                <p class="services-image-title">O Atelier de Personalização</p>
                <a href="/arte-de-presentear" class="services-button" data-route="/arte-de-presentear">Descubra</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer-section></footer-section>
      
      
    `;
  }
}

customElements.define("home-page", HomePage);
