// ============================================================================
// COMPRAS MISS DIOR PARFUM PAGE - Página de produto Miss Dior Parfum
// ============================================================================

import "../components/AppNavigation.js";
import "../components/FooterSection.js";

export class ComprasMissDiorParfumPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.initInteractions();
  }

  disconnectedCallback() {
    // Cleanup
  }

  initInteractions() {
    requestAnimationFrame(() => {
      // Product data for each size
      const productData = {
        "35ml": {
          image: "/images/35mlmiss.webp",
          price: "R$ 465,00",
        },
        "50ml": {
          image: "/images/50mlmiss.webp",
          price: "R$ 665,00",
        },
        "80ml": {
          image: "/images/80mlmiss.webp",
          price: "R$ 865,00",
        },
      };

      // Size selector buttons with image and price change
      const sizeButtons = this.querySelectorAll(".size-option");
      const productImage = this.querySelector(".product-main-image");
      const buttonPrice = this.querySelector(".button-price");

      sizeButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const size = button.dataset.size;

          // Remove active class from all buttons
          sizeButtons.forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");

          // Update image and price
          if (productData[size]) {
            // Fade out effect
            productImage.style.opacity = "0";

            setTimeout(() => {
              productImage.src = productData[size].image;
              buttonPrice.textContent = productData[size].price;

              // Fade in effect
              productImage.style.opacity = "1";
            }, 300);
          }
        });
      });

      // Tab navigation
      const tabButtons = this.querySelectorAll(".tab-button");
      const tabContents = this.querySelectorAll(".tab-content");

      tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const tabId = button.dataset.tab;

          // Remove active class from all buttons and contents
          tabButtons.forEach((btn) => btn.classList.remove("active"));
          tabContents.forEach((content) => content.classList.remove("active"));

          // Add active class to clicked button and corresponding content
          button.classList.add("active");
          const targetContent = this.querySelector(
            `.tab-content[data-tab="${tabId}"]`
          );
          if (targetContent) {
            targetContent.classList.add("active");
          }
        });
      });

      // Image Reveal Animation with GSAP
      if (window.gsap && window.ScrollTrigger) {
        const imageRevealWrapper = this.querySelector(
          ".image-reveal-wrapper-full"
        );
        if (imageRevealWrapper) {
          const overlay = imageRevealWrapper.querySelector(
            ".reveal-overlay-full"
          );
          const image = imageRevealWrapper.querySelector(".reveal-image-full");

          const revealTl = window.gsap.timeline({
            scrollTrigger: {
              trigger: imageRevealWrapper,
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
        }
      }

      // Review Form Modal
      const writeReviewBtn = this.querySelector(".reviews-load-more");
      const reviewModal = this.querySelector(".review-modal");
      const closeModalBtn = this.querySelector(".close-review-modal");
      const reviewForm = this.querySelector(".review-form");
      const starRatingInputs = this.querySelectorAll(".star-rating-input");

      // Open modal
      if (writeReviewBtn && reviewModal) {
        writeReviewBtn.addEventListener("click", () => {
          reviewModal.classList.add("active");
          document.body.style.overflow = "hidden";
        });
      }

      // Close modal
      if (closeModalBtn && reviewModal) {
        closeModalBtn.addEventListener("click", () => {
          reviewModal.classList.remove("active");
          document.body.style.overflow = "auto";
          document.body.style.overflowX = "hidden";
        });

        // Close on backdrop click
        reviewModal.addEventListener("click", (e) => {
          if (e.target === reviewModal) {
            reviewModal.classList.remove("active");
            document.body.style.overflow = "auto";
            document.body.style.overflowX = "hidden";
          }
        });
      }

      // Star rating selection
      starRatingInputs.forEach((star, index) => {
        star.addEventListener("click", () => {
          starRatingInputs.forEach((s, i) => {
            if (i <= index) {
              s.classList.add("selected");
            } else {
              s.classList.remove("selected");
            }
          });
        });
      });

      // Form submission
      if (reviewForm) {
        reviewForm.addEventListener("submit", (e) => {
          e.preventDefault();

          const formData = new FormData(reviewForm);
          const rating = this.querySelectorAll(
            ".star-rating-input.selected"
          ).length;
          const reviewText = formData.get("review-text");
          const recommend = formData.get("recommend");
          const name = formData.get("reviewer-name");

          // Aqui você pode enviar para uma API
          console.log({
            rating,
            reviewText,
            recommend,
            name,
            date: new Date().toISOString(),
          });

          // Fechar modal e resetar form
          reviewModal.classList.remove("active");
          document.body.style.overflow = "auto";
          document.body.style.overflowX = "hidden";
          reviewForm.reset();
          starRatingInputs.forEach((s) => s.classList.remove("selected"));

          // Mostrar mensagem de sucesso
          alert("Avaliação enviada com sucesso!");
        });
      }
    });
  }

  animateOut() {
    return new Promise((resolve) => {
      if (!window.gsap) {
        resolve();
        return;
      }

      window.gsap.to(this, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: resolve,
      });
    });
  }

  render() {
    this.innerHTML = `
      <div class="all-content" id="all-content" role="main">
        <!-- Navigation -->
        <app-navigation></app-navigation>

        <div class="compras-miss-dior-page">
          <!-- Product Detail Section -->
          <section class="product-detail-section">
            <div class="product-detail-grid">
              <!-- Product Image -->
              <div class="product-image-wrapper">
                <img src="/images/35mlmiss.webp" alt="Miss Dior Parfum" class="product-main-image" />
              </div>

              <!-- Product Info -->
              <div class="product-info-wrapper">
                <h1 class="product-detail-title">Miss Dior Parfum</h1>
                <p class="product-detail-subtitle">Perfume - notas florais, frutadas e amadeiradas intensas</p>

                  <!-- Rating -->
                  <div class="product-rating">
                    <div class="stars">
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                    </div>
                    <span class="rating-score">5.0</span>
                    <a href="#" class="rating-reviews">892 avaliações</a>
                  </div>

                  <!-- Learn More Link -->
                  <a href="#" class="learn-more-link">Saiba Mais</a>

                  <!-- Size Options -->
                  <div class="product-sizes">
                    <p class="sizes-label">Este produto existe em 3 tamanhos</p>
                    <div class="size-options">
                      <button class="size-option" data-size="35ml">35 ml</button>
                      <button class="size-option active" data-size="50ml">50 ml</button>
                      <button class="size-option" data-size="80ml">80 ml</button>
                    </div>
                  </div>

                  <!-- Purchase Button -->
                  <button class="purchase-button">
                    <span class="button-text">Comprar</span>
                    <span class="button-price">R$ 665,00</span>
                  </button>

                  <!-- Tabs Navigation -->
                  <div class="product-tabs">
                    <div class="tabs-header">
                      <button class="tab-button active" data-tab="description">Descrição</button>
                      <button class="tab-button" data-tab="perfumista">Palavras do perfumista</button>
                      <button class="tab-button" data-tab="notas">Notas olfativas</button>
                      <button class="tab-button" data-tab="aplicacao">Dicas de aplicação</button>
                      <button class="tab-button" data-tab="ingredientes">Lista de ingredientes</button>
                    </div>

                    <div class="tabs-content">
                      <!-- Description Tab -->
                      <div class="tab-content active" data-tab="description">
                        <p>Entre força e graça, entre ousadia e elegância. Miss Dior Parfum é o sopro de feminilidade e juventude ao estilo Dior. Francis Kurkdjian, Diretor Criativo de Perfumes Dior, apropria-se da icônica silhueta olfativa de Miss Dior para recontá-la com modernidade. O perfume revela uma fusão de notas florais, frutadas e amadeiradas para compor uma fragrância vibrante e sensual.</p>
                      </div>

                      <!-- Perfumista Tab -->
                      <div class="tab-content" data-tab="perfumista">
                        <p>Conteúdo sobre as palavras do perfumista.</p>
                      </div>

                      <!-- Notas Tab -->
                      <div class="tab-content" data-tab="notas">
                        <p>Conteúdo sobre as notas olfativas.</p>
                      </div>

                      <!-- Aplicação Tab -->
                      <div class="tab-content" data-tab="aplicacao">
                        <p>Conteúdo sobre dicas de aplicação.</p>
                      </div>

                      <!-- Ingredientes Tab -->
                      <div class="tab-content" data-tab="ingredientes">
                        <p>Conteúdo sobre lista de ingredientes.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </section>

          <!-- Love Quote Section -->
          <section class="love-quote-section">
            <div class="love-quote-container">
              <p class="quote-author">Com Natalie Portman</p>
              <h2 class="quote-title">And you, what would you do for love?*</h2>
              <p class="quote-subtitle">*E você, o que faria por amor?</p>
            </div>
          </section>

          <!-- Video Full Section -->
          <section class="video-full-section">
            <video
              class="video-full-bg"
              autoplay
              muted
              loop
              playsinline
            >
              <source src="/videos/love.mp4" type="video/mp4" />
            </video>
          </section>

          <!-- Image Reveal Section -->
           <section class="love-quote-section">
            <div class="love-quote-container">
            
              <h2 class="quote-title">Encontre seu perfume Miss Dior*</h2>
              
            </div>
          </section>
          
          <section class="image-reveal-full-section">
            <div class="image-reveal-wrapper-full">
              <div class="reveal-overlay-full"></div>
              <img src="/images/compras.webp" alt="Miss Dior" class="reveal-image-full" />
            </div>
          </section>

          <!-- Reviews Section -->
          <section class="reviews-section-product">
            <div class="reviews-container">
              <div class="reviews-header-product">
                <p class="reviews-gama-text">A gama <span class="miss-dior-highlight">Miss Dior</span> por intensidade</p>
                <a href="#" class="reviews-discover-link">Descubra</a>
              </div>

              <div class="reviews-title-area">
                <h3 class="reviews-main-title">Avaliações sobre o produto</h3>
              </div>

              <div class="reviews-box-product">
                <div class="reviews-summary">
                  <p class="reviews-label">Avaliações</p>
                  <div class="reviews-stars-display">
                    <span class="review-star-filled">★</span>
                    <span class="review-star-filled">★</span>
                    <span class="review-star-filled">★</span>
                    <span class="review-star-filled">★</span>
                    <span class="review-star-filled">★</span>
                    <span class="review-star-empty">☆</span>
                  </div>
                  <p class="reviews-count">892 avaliações</p>
                </div>

                <div class="reviews-list">
                  <!-- Review 1 -->
                  <div class="review-item-card">
                    <div class="review-stars-rating">
                      <span class="review-star-filled">★</span>
                      <span class="review-star-filled">★</span>
                      <span class="review-star-filled">★</span>
                      <span class="review-star-filled">★</span>
                      <span class="review-star-filled">★</span>
                    </div>
                    <p class="review-date">Enviado há 8 dias</p>
                    <p class="review-text">Estou encantado com o Miss Dior, achei um perfume super adorável e feminino, tem um cheirinho floral muito com um toque adocicado que fica de noite mais elegante.</p>
                    <p class="review-recommendation">Você recomendaria esse produto a um amigo?<br><strong>Sim</strong></p>
                    <p class="review-author">Por Renata A.</p>
                  </div>

                  <!-- Review 2 -->
                  <div class="review-item-card">
                    <div class="review-stars-rating">
                      <span class="review-star-filled">★</span>
                      <span class="review-star-filled">★</span>
                      <span class="review-star-filled">★</span>
                      <span class="review-star-filled">★</span>
                      <span class="review-star-filled">★</span>
                    </div>
                    <p class="review-date">Enviado há 6 dias</p>
                    <p class="review-text">Miss Dior é sempre top de perfume que eu recebi, absolutamente fixado na minha pele e muito marcante, o aroma maravilhoso.</p>
                    <p class="review-recommendation">Você recomendaria esse produto a um amigo?<br><strong>Sim</strong></p>
                    <p class="review-author">Por Micaella P.</p>
                  </div>

                  <!-- Review 3 -->
                  <div class="review-item-card">
                    <div class="review-stars-rating">
                      <span class="review-star-filled">★</span>
                      <span class="review-star-filled">★</span>
                      <span class="review-star-filled">★</span>
                      <span class="review-star-filled">★</span>
                      <span class="review-star-filled">★</span>
                    </div>
                    <p class="review-date">Enviado há 6 dias</p>
                    <p class="review-text">Eu adoro o Miss Dior! Prefiro sem o laço porque fica mais compacto e lindo. Tem fragrância ajuizada delicada como o chá de Perfum, mas com notas mais construídas, balsâmico.</p>
                    <p class="review-recommendation">Você recomendaria esse produto a um amigo?<br><strong>Sim</strong></p>
                    <p class="review-author">Por Vanessa A.</p>
                  </div>

                  <!-- Review 4 -->
                  <div class="review-item-card">
                    <div class="review-stars-rating">
                      <span class="review-star-filled">★</span>
                      <span class="review-star-filled">★</span>
                      <span class="review-star-filled">★</span>
                      <span class="review-star-filled">★</span>
                      <span class="review-star-filled">★</span>
                    </div>
                    <p class="review-date">Enviado há 6 dias</p>
                    <p class="review-text">Unde uma fragrância bem criança à fleurs, com um toque de flor de laranjeira que deixa o cheiro, claramente um cheiro bom docinhos, mais elegantemente do que muito moderno.</p>
                    <p class="review-recommendation">Você recomendaria esse produto a um amigo?<br><strong>Sim</strong></p>
                    <p class="review-author">Por Brenda S.</p>
                  </div>

                  <!-- Review 5 -->
                  <div class="review-item-card">
                    <div class="review-stars-rating">
                      <span class="review-star-filled">★</span>
                      <span class="review-star-filled">★</span>
                      <span class="review-star-filled">★</span>
                      <span class="review-star-filled">★</span>
                      <span class="review-star-filled">★</span>
                    </div>
                    <p class="review-date">Enviado há 6 dias</p>
                    <p class="review-text">Gza reputação incrível e usque o outro e Miss Dior iniciaria a edificação de consumo via preditibilidade, elegante e romântica.</p>
                    <p class="review-recommendation">Você recomendaria esse produto a um amigo?<br><strong>Sim</strong></p>
                    <p class="review-author">Por Camille A.</p>
                  </div>
                </div>

                <div class="reviews-pagination">
                  <span class="pagination-info">1-5 de 892</span>
                  <div class="pagination-arrows">
                    <button class="pagination-btn" aria-label="Anterior">‹</button>
                    <button class="pagination-btn" aria-label="Próximo">›</button>
                  </div>
                </div>

                <button class="reviews-load-more">Escrever avaliação...</button>
              </div>

              <!-- Review Modal -->
              <div class="review-modal">
                <div class="review-modal-content">
                  <button class="close-review-modal" aria-label="Fechar">&times;</button>
                  
                  <h2 class="review-modal-title">AVALIAÇÃO DO PRODUTO</h2>
                  
                  <form class="review-form">
                    <div class="form-group">
                      <label class="form-label">Dê uma nota geral para o produto *</label>
                      <div class="star-rating-select">
                        <span class="star-rating-input">☆</span>
                        <span class="star-rating-input">☆</span>
                        <span class="star-rating-input">☆</span>
                        <span class="star-rating-input">☆</span>
                        <span class="star-rating-input">☆</span>
                        <span class="star-rating-input">☆</span>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="form-label" for="review-text">Sua avaliação do produto *</label>
                      <textarea 
                        id="review-text" 
                        name="review-text" 
                        class="form-textarea" 
                        placeholder="Dê detalhes sobre o produto e por que deu a nota acima. Se possível, fale como você usa o produto e dê dicas para outros consumidores."
                        required
                        rows="5"
                      ></textarea>
                    </div>

                    <div class="form-group">
                      <label class="form-label">Você recomendaria esse produto a um amigo? *</label>
                      <div class="radio-group">
                        <label class="radio-label">
                          <input type="radio" name="recommend" value="sim" required>
                          <span>Sim</span>
                        </label>
                        <label class="radio-label">
                          <input type="radio" name="recommend" value="nao">
                          <span>Não</span>
                        </label>
                      </div>
                    </div>

                    <div class="form-section-title">SEUS DADOS</div>

                    <div class="form-group">
                      <label class="form-label" for="reviewer-name">Entre com seu nome ou apelido *</label>
                      <input 
                        type="text" 
                        id="reviewer-name" 
                        name="reviewer-name" 
                        class="form-input" 
                        placeholder="Seu nome ou apelido"
                        required
                      >
                    </div>

                    <button type="submit" class="submit-review-btn">ENVIAR AVALIAÇÃO</button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>

       

        <!-- Footer -->
        <footer-section></footer-section>
      </div>
    `;
  }
}

customElements.define(
  "compras-miss-dior-parfum-page",
  ComprasMissDiorParfumPage
);
