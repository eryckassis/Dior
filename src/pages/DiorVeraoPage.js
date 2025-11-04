// ============================================================================
// DIOR VERÃO PAGE - Página Descubra
// ============================================================================

import "../styles/dior-verao.css";
import { cartService } from "../services/CartService.js";

export class DiorVeraoPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.initVideoControls();
    this.initAnimations();
    this.initBagButtons();
  }

  disconnectedCallback() {
    // Cleanup animations
    if (this.animations) {
      this.animations.forEach((anim) => anim.kill());
    }
  }

  initVideoControls() {
    requestAnimationFrame(() => {
      const video = this.querySelector("#miss-dior-section-video");
      const playPauseBtn = this.querySelector("#miss-dior-play-pause-btn");
      const muteUnmuteBtn = this.querySelector("#miss-dior-mute-unmute-btn");

      if (!video || !playPauseBtn || !muteUnmuteBtn) return;

      // Play/Pause
      playPauseBtn.addEventListener("click", () => {
        if (video.paused) {
          video.play();
          playPauseBtn.querySelector(".icon-play").style.display = "none";
          playPauseBtn.querySelector(".icon-pause").style.display = "block";
        } else {
          video.pause();
          playPauseBtn.querySelector(".icon-play").style.display = "block";
          playPauseBtn.querySelector(".icon-pause").style.display = "none";
        }
      });

      // Mute/Unmute
      muteUnmuteBtn.addEventListener("click", () => {
        video.muted = !video.muted;
        if (video.muted) {
          muteUnmuteBtn.querySelector(".icon-mute").style.display = "block";
          muteUnmuteBtn.querySelector(".icon-unmute").style.display = "none";
        } else {
          muteUnmuteBtn.querySelector(".icon-mute").style.display = "none";
          muteUnmuteBtn.querySelector(".icon-unmute").style.display = "block";
        }
      });
    });
  }
  initAnimations() {
    requestAnimationFrame(() => {
      if (!window.gsap) return;

      this.animations = [];

      // Hero animation
      const heroTl = window.gsap.timeline();
      heroTl.from(".dior-verao-hero-content", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });
      this.animations.push(heroTl);

      // First Image Reveal Animation
      const imageReveal = this.querySelector(".miss-dior-image-reveal");
      if (imageReveal) {
        const overlay = imageReveal.querySelector(".reveal-overlay");
        const image = imageReveal.querySelector(".reveal-image");

        const revealTl = window.gsap.timeline({
          scrollTrigger: {
            trigger: imageReveal,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        revealTl
          .set(overlay, { scaleX: 1, transformOrigin: "left" })
          .set(image, { scale: 1.3 })
          .to(overlay, {
            scaleX: 0,
            duration: 1.2,
            ease: "power3.inOut",
          })
          .to(
            image,
            {
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
            },
            "-=1.2"
          );

        this.animations.push(revealTl);
      }

      // Second Image Reveal Animation
      const imageRevealSecond = this.querySelector(".reveal-second");
      if (imageRevealSecond) {
        const overlay = imageRevealSecond.querySelector(".reveal-overlay");
        const image = imageRevealSecond.querySelector(".reveal-image");

        const revealTl2 = window.gsap.timeline({
          scrollTrigger: {
            trigger: imageRevealSecond,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        revealTl2
          .set(overlay, { scaleX: 1, transformOrigin: "left" })
          .set(image, { scale: 1.3 })
          .to(overlay, {
            scaleX: 0,
            duration: 1.2,
            ease: "power3.inOut",
          })
          .to(
            image,
            {
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
            },
            "-=1.2"
          );

        this.animations.push(revealTl2);
      }

      // Third Image Reveal Animation
      const imageRevealThird = this.querySelector(".reveal-third");
      if (imageRevealThird) {
        const overlay = imageRevealThird.querySelector(".reveal-overlay");
        const image = imageRevealThird.querySelector(".reveal-image");

        const revealTl3 = window.gsap.timeline({
          scrollTrigger: {
            trigger: imageRevealThird,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        revealTl3
          .set(overlay, { scaleX: 1, transformOrigin: "left" })
          .set(image, { scale: 1.3 })
          .to(overlay, {
            scaleX: 0,
            duration: 1.2,
            ease: "power3.inOut",
          })
          .to(
            image,
            {
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
            },
            "-=1.2"
          );

        this.animations.push(revealTl3);
      }

      // Products Image Reveal Animations
      const productCards = this.querySelectorAll(".essence-product-card");
      productCards.forEach((card, index) => {
        const overlay = card.querySelector(".essence-image-reveal-overlay");
        const image = card.querySelector(".essence-product-image");

        if (overlay && image) {
          const productRevealTl = window.gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          });

          productRevealTl
            .set(overlay, { scaleY: 1, transformOrigin: "top" })
            .set(image, { scale: 1.2 })
            .to(overlay, {
              scaleY: 0,
              duration: 1,
              ease: "power3.inOut",
              delay: index * 0.15,
            })
            .to(
              image,
              {
                scale: 1,
                duration: 1,
                ease: "power3.out",
              },
              "-=1"
            );

          this.animations.push(productRevealTl);
        }
      });

      // Cards stagger animation
      const cardsAnim = window.gsap.from(".dior-verao-card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".dior-verao-grid",
          start: "top 80%",
        },
      });
      this.animations.push(cardsAnim);

      // Featured section animation
      const featuredTextAnim = window.gsap.from(".dior-verao-featured-text", {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".dior-verao-featured",
          start: "top 70%",
        },
      });
      this.animations.push(featuredTextAnim);

      const featuredImageAnim = window.gsap.from(".dior-verao-featured-image", {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".dior-verao-featured",
          start: "top 70%",
        },
      });
      this.animations.push(featuredImageAnim);
    });
  }

  initBagButtons() {
    requestAnimationFrame(() => {
      const bagButtons = this.querySelectorAll(".essence-bag-button");

      const productsData = [
        {
          id: "verao-leite-corporal",
          name: "Miss Dior Leite Corporal com Cera de Rosa",
          volume: "200ml",
          price: 439,
          image: "./images/missleite.webp",
        },
        {
          id: "verao-oleo-esfoliante",
          name: "Miss Dior Óleo Corporal Esfoliante com Extrato de Rosa",
          volume: "200ml",
          price: 449,
          image: "./images/missOelo.webp",
        },
        {
          id: "verao-gel-banho",
          name: "Miss Dior Gel de Banho com Água de Rosa",
          volume: "250ml",
          price: 479,
          image: "./images/missgel.webp",
        },
      ];

      bagButtons.forEach((button, index) => {
        const productData = productsData[index];
        if (!productData) return;

        button.addEventListener("click", (e) => {
          e.preventDefault();

          cartService.addItem({
            id: productData.id,
            name: productData.name,
            volume: productData.volume,
            price: productData.price,
            image: productData.image,
          });

          this.animateButtonFeedback(button);
        });
      });
    });
  }

  animateButtonFeedback(button) {
    if (!window.gsap) return;

    window.gsap
      .timeline()
      .to(button, {
        scale: 0.9,
        duration: 0.1,
        ease: "power2.in",
      })
      .to(button, {
        scale: 1.1,
        duration: 0.2,
        ease: "back.out(2)",
      })
      .to(button, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });

    const originalSVG = button.innerHTML;
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;

    setTimeout(() => {
      button.innerHTML = originalSVG;
    }, 1000);
  }

  render() {
    this.innerHTML = `
    <!-- Navigation -->
    <app-navigation></app-navigation>

    <div class="all-content" id="all-content" role="main">
      <!-- Main Content -->
      <main class="dior-verao-main">
        <section class="dior-verao-hero">
          <div class="dior-verao-hero-content">
            <h1 class="dior-verao-title">Descubra Dior Verão</h1>
            <p class="dior-verao-subtitle">A coleção mais radiante da temporada</p>
          </div>
        </section>

       <section class="miss-dior-video-section">
            <video
              class="miss-dior-video-bg"
              id="miss-dior-section-video"
              autoplay
              muted
              loop
              playsinline
            >
              <source src="./videos/diorVerao.mp4" type="video/mp4" />
            </video>

            <!-- Conteúdo de texto sobre o vídeo -->
            <div class="miss-dior-video-content">
              <h1 class="miss-dior-video-title"></h1>
              <p class="miss-dior-video-description"></p>
            </div>

            <!-- Video Controls - Liquid Glass -->
            <div class="video-controls">
              <button
                class="glass-button"
                id="miss-dior-play-pause-btn"
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
                id="miss-dior-mute-unmute-btn"
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

            <!-- Text Section -->
        <section class="miss-dior-text-section">
          <div class="container">
            <div class="miss-dior-text-content">
              <h2 class="miss-dior-main-title-second">Miss Dior</h2>
              <p class="miss-dior-main-description-second">
               Deixe-se levar pela brisa refrescante das fragrâncias Miss Dior. Luminosas e intensas, elas fluem livremente no coração deste verão na Dior.
              </p>
            </div>
          </div>
        </section>

     <section class="miss-dior-full-image section-spacing">
          <div class="miss-dior-image-reveal">
            <div class="reveal-overlay"></div>
            <img src="./images/diorverao.jpg" alt="Miss Dior Perfume" class="reveal-image" />
          </div>
        </section>

         <section class="dior-verao-hero section-spacing">
          <div class="dior-verao-hero-content">
            <h1 class="dior-verao-title-second">O ritual da beleza Miss Dior</h1>
            
          </div>
        </section>

       <section class="miss-dior-video-section">
            <video
              class="miss-dior-video-bg"
              id="miss-dior-section-video"
              autoplay
              muted
              loop
              playsinline
            >
              <source src="./videos/diorVerao2.mp4" type="video/mp4" />
            </video>

            <!-- Conteúdo de texto sobre o vídeo -->
            <div class="miss-dior-video-content">
              <h1 class="miss-dior-video-title"></h1>
              <p class="miss-dior-video-description"></p>
            </div>

           
        
          </section>
          

          <section class="miss-dior-full-image section-spacing">
          <div class="miss-dior-image-reveal reveal-second">
            <div class="reveal-overlay"></div>
            <img src="./images/diorverao2.webp" alt="Miss Dior Perfume" class="reveal-image" />
          </div>
        </section>

        <!-- Products Section -->
        <section class="essence-products-section">
          <div class="essence-products-container">
            
            <!-- Product 1 -->
            <div class="essence-product-card">
              <div class="essence-product-image-wrapper">
                <div class="essence-image-reveal-overlay"></div>
                <img src="./images/missleite.webp" alt="Miss Dior Leite Corporal" class="essence-product-image" />
              </div>
              <div class="essence-product-info">
                <h3 class="essence-product-name">Miss Dior Leite Corporal com Cera de Rosa</h3>
                <p class="essence-product-description">Leite corporal hidratante</p>
                <div class="product-intensity">
                  <span class="intensity-label">Intensity</span>
                  <div class="intensity-bars">
                    <span class="bar filled"></span>
                    <span class="bar filled"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                  </div>
                </div>
                <div class="essence-product-footer">
                  <p class="essence-product-price">R$ 439,00</p>
                  <button class="essence-bag-button" aria-label="Adicionar ao carrinho">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Product 2 -->
            <div class="essence-product-card">
              <div class="essence-product-image-wrapper">
                <div class="essence-image-reveal-overlay"></div>
                <img src="./images/missOelo.webp" alt="Miss Dior Óleo Corporal" class="essence-product-image" />
              </div>
              <div class="essence-product-info">
                <h3 class="essence-product-name">Miss Dior Óleo Corporal Esfoliante com Extrato de Rosa</h3>
                <p class="essence-product-description">Óleo corporal esfoliante</p>
                <div class="product-intensity">
                  <span class="intensity-label">Intensity</span>
                  <div class="intensity-bars">
                    <span class="bar filled"></span>
                    <span class="bar filled"></span>
                    <span class="bar filled"></span>
                    <span class="bar"></span>
                  </div>
                </div>
                <div class="essence-product-footer">
                  <p class="essence-product-price">R$ 449,00</p>
                  <button class="essence-bag-button" aria-label="Adicionar ao carrinho">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            

            <!-- Product 3 -->
            <div class="essence-product-card">
              <div class="essence-product-image-wrapper">
                <div class="essence-image-reveal-overlay"></div>
                <img src="./images/missgel.webp" alt="Miss Dior Gel de Banho" class="essence-product-image" />
              </div>
              <div class="essence-product-info">
                <h3 class="essence-product-name">Miss Dior Gel de Banho com Água de Rosa</h3>
                <p class="essence-product-description">Gel de banho corporal</p>
                <div class="product-intensity">
                  <span class="intensity-label">Intensity</span>
                  <div class="intensity-bars">
                    <span class="bar filled"></span>
                    <span class="bar filled"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                  </div>
                </div>
                <div class="essence-product-footer">
                  <p class="essence-product-price">R$ 479,00</p>
                  <button class="essence-bag-button" aria-label="Adicionar ao carrinho">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>
        
          <section class="dior-verao-hero section-spacing">
          <div class="dior-verao-hero-content">
            <h1 class="dior-verao-title-sec">O ritual da beleza Miss Dior</h1>
            
          </div>
        </section>

        <!-- Third Full Image with Reveal -->
        <section class="miss-dior-full-image section-spacing">
          <div class="miss-dior-image-reveal reveal-third">
            <div class="reveal-overlay"></div>
            <img src="./images/jadoreVerao.webp" alt="Dior Verão Collection" class="reveal-image" />
          </div>
        </section>


    </main>

    <!-- Footer -->
    <footer-section></footer-section>
    </div>

    <!-- Profile Menu -->
    <profile-menu></profile-menu>
  `;
  }
}

customElements.define("dior-verao-page", DiorVeraoPage);
