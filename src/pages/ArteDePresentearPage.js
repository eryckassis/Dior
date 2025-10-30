// ============================================================================
// ARTE DE PRESENTEAR PAGE - Página usando Web Components
// ============================================================================

import "../components/AppNavigation.js";
import "../components/FooterSection.js";

export class ArteDePresentearPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.initVideoControls();
    this.initPresenteVideoControls();
    this.initButtonAnimations();
  }

  render() {
    this.innerHTML = `
      <div class="all-content" id="all-content" role="main">
        <!-- Navigation -->
        <app-navigation></app-navigation>

        <!-- Main Content Area -->
        <main class="content" id="content">
          <!-- Video Section Full Screen -->
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
          <section class="presentes-section-second">
        <div class="presentes-container-second">
          <div class="presentes-header-second">
            <p class="presentes-label-second">Ajustar amarrar aprimorar</p>
            <h2 class="presentes-title-second">Os ateliês encantados da Dior ganham vida magicamente para transformar cada presente em uma experiencia extraordinária</h2>
            <p class="presentes-subtitle-second">
              Reinterpretada no tema encantado do artista e amigo da Maison Pietro Ruffo.<br>
              mais exclusivas em edição limitada, para as celebrações mais<br>
              mágicas e encantadoras.
            </p>
          </div>

          <div class="presentes-grid-second">
            <div class="presente-item-second">
              <div class="presente-video-wrapper-second">
                <video 
                  class="presente-video-second"
                  id="presente-video-1"
                  autoplay
                  muted
                  loop
                  playsinline
                >
                  <source src="./videos/diorvideopresente.mp4" type="video/mp4" />
                </video>

                <!-- Video Controls para o vídeo do presente -->
                <div class="video-controls video-controls-presente">
                  <button
                    class="glass-button"
                    id="presente-play-pause-btn"
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
                    id="presente-mute-unmute-btn"
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
              </div>
              <p class="presente-price-second">A inspiração do artista</p>
              <p class="presente-caption-second">O circo dos Sonhos Dior imaginado por Pietro Ruffo - edição limitada</p>
            </div>

            <div class="presente-item-second">
              <img class="presente-image-second" src="./images/thirtyproduct.webp" alt="Dior Palette Couture - edição limitada">
              <p class="presente-price-second">Um novo tema exclusivo de alta costura</p>
              <p class="presente-caption-second">Presente maravilhosamente embrulhados</p>
            </div>
          </div>
        </div>

        </main>

        <!-- Footer -->
        <footer-section></footer-section>
      </div>

      
    `;
  }

  initVideoControls() {
    // Aguarda o DOM estar pronto
    setTimeout(() => {
      const video = document.getElementById("arte-section-video");
      const playPauseBtn = document.getElementById("arte-play-pause-btn");
      const muteUnmuteBtn = document.getElementById("arte-mute-unmute-btn");

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

      // Sincroniza estado inicial
      if (!video.paused) {
        iconPlay.style.display = "none";
        iconPause.style.display = "block";
      }
    }, 100);
  }

  initButtonAnimations() {
    // Aguarda o DOM estar pronto
    setTimeout(() => {
      const playPauseBtn = document.getElementById("arte-play-pause-btn");
      const muteUnmuteBtn = document.getElementById("arte-mute-unmute-btn");
      const presentePlayPauseBtn = document.getElementById(
        "presente-play-pause-btn"
      );
      const presenteMuteUnmuteBtn = document.getElementById(
        "presente-mute-unmute-btn"
      );

      // Inicializa animação GSAP nos botões de controle do vídeo principal
      if (playPauseBtn && window.Button) {
        new window.Button(playPauseBtn);
      }

      if (muteUnmuteBtn && window.Button) {
        new window.Button(muteUnmuteBtn);
      }

      // Inicializa animação GSAP nos botões de controle do vídeo do presente
      if (presentePlayPauseBtn && window.Button) {
        new window.Button(presentePlayPauseBtn);
      }

      if (presenteMuteUnmuteBtn && window.Button) {
        new window.Button(presenteMuteUnmuteBtn);
      }
    }, 150);
  }

  initPresenteVideoControls() {
    // Aguarda o DOM estar pronto
    setTimeout(() => {
      const video = document.getElementById("presente-video-1");
      const playPauseBtn = document.getElementById("presente-play-pause-btn");
      const muteUnmuteBtn = document.getElementById("presente-mute-unmute-btn");

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

      // Sincroniza estado inicial
      if (!video.paused) {
        iconPlay.style.display = "none";
        iconPause.style.display = "block";
      }
    }, 100);
  }
}

customElements.define("arte-de-presentear-page", ArteDePresentearPage);
