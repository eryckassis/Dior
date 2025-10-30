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
      this.initVideoControls();
      this.initButtonAnimations();
      this.initPietroButton();
      this.initParallaxGallery();
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
                 <h2 class="panel-first-title">Bem vindo ao circo dos sonhos Dior</h2>
                  <p class="panel-description-2">
                    Bem vindo ao circo dos sonhos DIOR 
                        onde luxo e fantasia se encontram.
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
                  <div class="splash-option-darkening"></div>
                  <div class="splash-option-overlay"></div>
                  <video
                    src="./videos/diorVideo.mp4"
                    class="splash-option-bg"
                    autoplay
                    muted
                    loop
                    playsinline
                    id="panel2-video"
                  ></video>
                  <!-- Video Controls -->
                  <div class="video-controls">
                    <button class="video-control play-pause-btn" id="panel2-play-pause" data-block="button">
                      <span class="button__flair"></span>
                      <svg class="play-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                      </svg>
                      <svg class="pause-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" style="display: none;">
                        <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" fill="white"/>
                      </svg>
                    </button>
                    <button class="video-control mute-btn" id="panel2-mute" data-block="button">
                      <span class="button__flair"></span>
                      <svg class="unmuted-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z" fill="white"/>
                      </svg>
                      <svg class="muted-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" style="display: none;">
                        <path d="M16.5 12C16.5 10.23 15.48 8.71 14 7.97V10.18L16.45 12.63C16.48 12.43 16.5 12.21 16.5 12ZM19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.63 14.91 21 13.5 21 12C21 7.72 18.01 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12ZM4.27 3L3 4.27L7.73 9H3V15H7L12 20V13.27L16.25 17.52C15.58 18.04 14.83 18.46 14 18.7V20.76C15.38 20.45 16.63 19.82 17.68 18.96L19.73 21L21 19.73L12 10.73L4.27 3ZM12 4L9.91 6.09L12 8.18V4Z" fill="white"/>
                      </svg>
                    </button>
                  </div>
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
        </div>
      </section>
      
      <!-- Nova seção: O desfile encantado de presentes excepcionais -->
      <section class="presentes-section">
        <div class="presentes-container">
          <div class="presentes-header">
            <p class="presentes-label">Exclusivos para as Festas</p>
            <h2 class="presentes-title">O desfile encantado de presentes excepcionais</h2>
            <p class="presentes-subtitle">
              A Dior convida você para seu desfile extraordinário, apresentando as criações<br>
              mais exclusivas em edição limitada, para as celebrações mais<br>
              mágicas e encantadoras.
            </p>
          </div>
          
          <div class="presentes-grid">
            <div class="presente-item">
              <img src="./images/firtsProduct.webp" alt="Le Cirque des Rêves Dior - edição limitada">
              <p class="presente-price">R$ 6.450,00</p>
              <p class="presente-caption">Le Cirque des Rêves Dior - edição limitada</p>
            </div>
            
            <div class="presente-item">
              <img src="./images/secondProduct.webp" alt="Coffret de Enfeites Perfumados">
              <p class="presente-price">R$ 3.780,00</p>
              <p class="presente-caption">Coffret de Enfeites Perfumados</p>
            </div>
            
            <div class="presente-item">
              <img src="./images/thirtyproduct.webp" alt="Dior Palette Couture - edição limitada">
              <p class="presente-price">R$ 990,00</p>
              <p class="presente-caption">Dior Palette Couture - edição limitada</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Seção 1: A arte de presentear -->
      <section class="tema-pietro-section tema-pietro-section--first">
        <!-- Imagem de fundo que ocupa toda a seção -->
        <div class="tema-pietro-background">
          <img src="./images/diorpage.png" alt="Tema Pietro Ruffo">
        </div>
        
        <!-- Conteúdo de texto sobreposto na imagem -->
        <div class="tema-pietro-content">
          <h2 class="tema-pietro-title">A arte de presentear</h2>
          <p class="tema-pietro-description"></p>
          
          <!-- Botão com animação GSAP -->
          <a href="#" class="tema-pietro-button" data-block="button">
            <span class="button__label">Explorar</span>
            <span class="button__flair"></span>
          </a>
        </div>
      </section>
      
      <!-- Seção 2: A arte de presentear (com espaçamento) -->
      <section class="tema-pietro-section tema-pietro-section--second">
        <!-- Imagem de fundo que ocupa toda a seção -->
        <div class="tema-pietro-background">
          <img src="./images/jadore.png" alt="Tema Pietro Ruffo">
        </div>
        
        <!-- Conteúdo de texto sobreposto na imagem -->
        <div class="tema-pietro-content">
          <h2 class="tema-pietro-title">Para ela</h2>
          <p class="tema-pietro-description">Realize seu desejo.</p>
          
          <!-- Botão com animação GSAP -->
          <a href="#" class="tema-pietro-button" data-block="button">
            <span class="button__label">Explorar</span>
            <span class="button__flair"></span>
          </a>
        </div>
      </section>

      <!-- Seção 2: A arte de presentear (com espaçamento) -->
      <section class="tema-pietro-section tema-pietro-section--second">
        <!-- Imagem de fundo que ocupa toda a seção -->
        <div class="tema-pietro-background">
          <img src="./images/sauvage.png" alt="Tema Pietro Ruffo">
        </div>
        
        <!-- Conteúdo de texto sobreposto na imagem -->
        <div class="tema-pietro-content">
          <h2 class="tema-pietro-title">Para ele</h2>
          <p class="tema-pietro-description">Realize suas fantasias.</p>
          
          <!-- Botão com animação GSAP -->
          <a href="#" class="tema-pietro-button" data-block="button">
            <span class="button__label">Explorar</span>
            <span class="button__flair"></span>
          </a>
        </div>
      </section>
      
      <!-- Nova seção: Parallax Gallery com 3 imagens lado a lado -->
      <section class="parallax-intro">
  <div class="parallax-intro-container">
    <h2 class="parallax-intro-title">Um tema deslumbrante imaginado por Pietro Ruffo</h2>
    <p class="parallax-intro-description">
      Inspirado nas artes circenses, o artista e amigo da Maison, Pietro Ruffo, imaginou um tema deslumbrante: sob a estrela da sorte cintilante de Monsieur Dior, um espetáculo encantado ganha vida em uma paleta cintilante de variações em ouro, prata e rosa.
    </p>
  </div>
</section>
      <section class="parallax-gallery">
        <div class="parallax-panel parallax-panel--1">
          <div class="parallax-column">
            <div class="parallax-image-wrap">
              <img class="parallax-img" src="./images/produto3d.jpg" alt="Dior Collection 1" />
            </div>
            <p class="parallax-price">R$ 1.235,00</p>
            <p class="parallax-caption">Coffret Miss Dior Eau de Parfum - edição limitada</p>
          </div>
        </div>
        
        <div class="parallax-panel parallax-panel--2">
          <div class="parallax-column">
            <div class="parallax-image-wrap">
              <img class="parallax-img" src="./images/produto3d2.jpg" alt="Dior Collection 2" />
            </div>
            <p class="parallax-price">R$ 965,00</p>
            <p class="parallax-caption">J'adore Eau de Parfum Coffret - Edição Limitada</p>
          </div>
        </div>
        
        <div class="parallax-panel parallax-panel--3">
          <div class="parallax-column">
            <div class="parallax-image-wrap">
              <img class="parallax-img" src="./images/produto3d3.jpg" alt="Dior Collection 3" />
            </div>
            <p class="parallax-price">R$ 530,00</p>
            <p class="parallax-caption">Diorshow Volume & Definition - edição limitada</p>
          </div>
        </div>
      </section>

       <section class="parallax-intro">
  <div class="parallax-intro-container">
  </div>
</section>
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

  initVideoControls() {
    const video = this.querySelector("#panel2-video");
    const playPauseBtn = this.querySelector("#panel2-play-pause");
    const muteBtn = this.querySelector("#panel2-mute");

    if (!video || !playPauseBtn || !muteBtn) return;

    const playIcon = playPauseBtn.querySelector(".play-icon");
    const pauseIcon = playPauseBtn.querySelector(".pause-icon");
    const mutedIcon = muteBtn.querySelector(".muted-icon");
    const unmutedIcon = muteBtn.querySelector(".unmuted-icon");

    // Play/Pause Toggle
    playPauseBtn.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
      } else {
        video.pause();
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
      }
    });

    // Mute/Unmute Toggle
    muteBtn.addEventListener("click", () => {
      if (video.muted) {
        video.muted = false;
        mutedIcon.style.display = "none";
        unmutedIcon.style.display = "block";
      } else {
        video.muted = true;
        mutedIcon.style.display = "block";
        unmutedIcon.style.display = "none";
      }
    });

    // Estado inicial - vídeo começa tocando e mudo
    if (!video.paused) {
      playIcon.style.display = "none";
      pauseIcon.style.display = "block";
    }
  }

  initButtonAnimations() {
    // Animação de flair para botões anchor-panel
    const anchorButtons = this.querySelectorAll(".anchor-panel");

    anchorButtons.forEach((button) => {
      const flair = button.querySelector(".button__flair");
      if (!flair) return;

      button.addEventListener("mouseenter", (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        flair.style.transformOrigin = `${x}px ${y}px`;

        gsap.to(flair, {
          scale: 2.5,
          duration: 0.6,
          ease: "power2.out",
        });
      });

      button.addEventListener("mouseleave", () => {
        gsap.to(flair, {
          scale: 0,
          duration: 0.4,
          ease: "power2.in",
        });
      });
    });

    // Animação de flair para controles de vídeo
    const videoControls = this.querySelectorAll(".video-control");

    videoControls.forEach((button) => {
      const flair = button.querySelector(".button__flair");
      if (!flair) return;

      button.addEventListener("mouseenter", (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        flair.style.transformOrigin = `${x}px ${y}px`;

        gsap.to(flair, {
          scale: 2,
          duration: 0.5,
          ease: "power2.out",
        });
      });

      button.addEventListener("mouseleave", () => {
        gsap.to(flair, {
          scale: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      });
    });
  }

  initPietroButton() {
    // Inicializa TODOS os botões das seções Pietro Ruffo com a classe Button do GSAP
    const pietroButtons = this.querySelectorAll(".tema-pietro-button");

    if (pietroButtons.length > 0 && window.Button) {
      pietroButtons.forEach((button) => {
        new window.Button(button);
      });
    }
  }

  initParallaxGallery() {
    // Verifica se GSAP e ScrollTrigger estão disponíveis
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.error("GSAP or ScrollTrigger not loaded for parallax");
      return;
    }

    // Aguarda um pouco para garantir que o DOM esteja pronto
    setTimeout(() => {
      // Seleciona todos os painéis parallax
      const panels = this.querySelectorAll(".parallax-panel");

      if (panels.length === 0) {
        console.error("No parallax panels found");
        return;
      }

      console.log(`Found ${panels.length} parallax panels`);

      panels.forEach((panel, index) => {
        // Seleciona a IMAGEM dentro de cada painel (não o wrapper)
        const image = panel.querySelector(".parallax-img");

        if (image) {
          console.log(`Setting up parallax for panel ${index + 1}`);

          // Cria animação parallax: a imagem move de -15% para +15%
          gsap.fromTo(
            image,
            {
              yPercent: -20, // Posição inicial (imagem mais alta)
            },
            {
              yPercent: 15, // Posição final (imagem mais baixa)
              scrollTrigger: {
                trigger: panel,
                scrub: true, // Sincroniza com o scroll
                start: "top bottom", // Inicia quando o topo do painel toca o fundo da tela
                end: "bottom top", // Termina quando o fundo do painel sai do topo da tela
                // markers: true, // Descomente para debug
              },
              ease: "none", // Movimento linear para efeito parallax suave
            }
          );
        } else {
          console.error(`No image found in panel ${index + 1}`);
        }
      });

      // Refresh ScrollTrigger após configurar
      ScrollTrigger.refresh();
    }, 200);
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
