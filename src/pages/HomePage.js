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

export class HomePage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.initVideoControls();
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

      <!-- Keyhole Reveal Section -->
      <keyhole-section
        image="./images/Image 2 Dior.jpg"
        subtitle="Dior Backstage Glow Maximizer Palette"
        title="Uma nova visão da icônica paleta de iluminadores"
        button-text="Descubra"
      ></keyhole-section>

      <footer-section></footer-section>
      
      
    `;
  }
}

customElements.define("home-page", HomePage);
