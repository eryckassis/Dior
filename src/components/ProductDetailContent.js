// ============================================================================
// PRODUCT DETAIL CONTENT - Conteúdo da página de detalhes do produto
// Galeria com drag horizontal + Informações do produto com tabs
// ============================================================================

import { getProductById, getRelatedProducts } from "../data/products.js";
import { router } from "../router/router.js";

export class ProductDetailContent extends HTMLElement {
  constructor() {
    super();
    this.product = null;
    this.currentSlide = 0;
    this.draggable = null;
    this.selectedColor = 0;
    this.selectedSize = null;
    this.activeTab = 0;
  }

  connectedCallback() {
    const productId = this.getAttribute("data-product-id");
    this.product = getProductById(productId);

    if (!this.product) {
      this.innerHTML = `<div class="product-not-found">Produto não encontrado</div>`;
      return;
    }

    this.render();
    this.initGalleryDrag();
    this.initEventListeners();
  }

  disconnectedCallback() {
    // Cleanup do Draggable
    if (this.draggable) {
      this.draggable.kill();
      this.draggable = null;
    }

    // Cleanup do ResizeObserver
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    // Cleanup do event listener de resize
    if (this.handleResize) {
      window.removeEventListener("resize", this.handleResize);
      this.handleResize = null;
    }
  }

  initGalleryDrag() {
    // Aguarda o DOM estar pronto e imagens carregadas
    requestAnimationFrame(() => {
      const track = this.querySelector(".product-gallery-track");
      const wrapper = this.querySelector(".product-gallery-wrapper");

      if (!track || !wrapper || !window.gsap || !window.Draggable) {
        console.warn("Galeria: elementos ou GSAP não encontrados");
        return;
      }

      const slides = track.querySelectorAll(".product-gallery-slide");
      if (slides.length === 0) return;

      // Função para calcular bounds corretamente
      const calculateBounds = () => {
        const wrapperWidth = wrapper.offsetWidth;
        const slideWidth = slides[0]?.offsetWidth || wrapperWidth;
        const gap = 0; // Sem gap entre slides
        const totalWidth = slides.length * slideWidth;
        const maxDrag = Math.min(0, -(totalWidth - wrapperWidth));

        return { minX: maxDrag, maxX: 0 };
      };

      // Função para configurar dimensões
      const setupDimensions = () => {
        const wrapperWidth = wrapper.offsetWidth;

        // Define largura de cada slide = largura do wrapper
        slides.forEach((slide) => {
          slide.style.width = `${wrapperWidth}px`;
          slide.style.minWidth = `${wrapperWidth}px`;
          slide.style.flexShrink = "0";
        });

        // Define largura do track
        track.style.width = `${slides.length * wrapperWidth}px`;
        track.style.display = "flex";
        track.style.willChange = "transform";
      };

      // Configura dimensões iniciais
      setupDimensions();
      let bounds = calculateBounds();

      // Função para snap ao slide mais próximo
      const snapToNearestSlide = () => {
        const wrapperWidth = wrapper.offsetWidth;
        const currentX = gsap.getProperty(track, "x") || 0;
        const slideIndex = Math.round(Math.abs(currentX) / wrapperWidth);
        this.currentSlide = Math.max(
          0,
          Math.min(slideIndex, slides.length - 1)
        );

        gsap.to(track, {
          x: -(this.currentSlide * wrapperWidth),
          duration: 0.4,
          ease: "power2.out",
          overwrite: true,
          onComplete: () => {
            this.updateProgress();
            this.updateDots();
          },
        });
      };

      // Criar Draggable
      this.draggable = Draggable.create(track, {
        type: "x",
        bounds: bounds,
        inertia: true,
        edgeResistance: 0.65,
        throwResistance: 2000,
        cursor: "grab",
        activeCursor: "grabbing",
        allowNativeTouchScrolling: false,
        force3D: true,
        onPress: function () {
          // Parar qualquer animação em andamento para evitar conflito
          gsap.killTweensOf(track);
        },
        onDrag: () => {
          this.updateProgress();
        },
        onThrowUpdate: () => {
          this.updateProgress();
        },
        onDragEnd: () => {
          snapToNearestSlide();
        },
        onThrowComplete: () => {
          snapToNearestSlide();
        },
      })[0];

      // Handler de resize com debounce
      let resizeTimeout;
      this.handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          setupDimensions();
          bounds = calculateBounds();

          if (this.draggable) {
            this.draggable.applyBounds(bounds);

            // Reposiciona no slide atual
            const wrapperWidth = wrapper.offsetWidth;
            gsap.set(track, { x: -(this.currentSlide * wrapperWidth) });
          }

          this.updateProgress();
        }, 100);
      };

      window.addEventListener("resize", this.handleResize);

      // Aguarda imagens carregarem para recalcular
      const images = track.querySelectorAll("img");
      let loadedCount = 0;
      const totalImages = images.length;

      const onImageLoad = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setupDimensions();
          bounds = calculateBounds();
          if (this.draggable) {
            this.draggable.applyBounds(bounds);
          }
          this.updateProgress();
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          onImageLoad();
        } else {
          img.addEventListener("load", onImageLoad);
          img.addEventListener("error", onImageLoad);
        }
      });

      // Inicializa progresso
      this.updateProgress();

      console.log("✅ Galeria de produto inicializada");
    });
  }

  snapToSlide() {
    const track = this.querySelector(".product-gallery-track");
    const wrapper = this.querySelector(".product-gallery-wrapper");
    if (!track || !wrapper) return;

    const wrapperWidth = wrapper.offsetWidth;
    const slides = track.querySelectorAll(".product-gallery-slide");
    const currentX = gsap.getProperty(track, "x") || 0;

    // Calcula o slide mais próximo
    const slideIndex = Math.round(Math.abs(currentX) / wrapperWidth);
    this.currentSlide = Math.max(0, Math.min(slideIndex, slides.length - 1));

    // Anima para o slide
    gsap.to(track, {
      x: -(this.currentSlide * wrapperWidth),
      duration: 0.4,
      ease: "power2.out",
      overwrite: true,
      onComplete: () => {
        this.updateProgress();
        this.updateDots();
      },
    });
  }

  updateProgress() {
    const track = this.querySelector(".product-gallery-track");
    const wrapper = this.querySelector(".product-gallery-wrapper");
    const progressBar = this.querySelector(".gallery-progress-bar");
    if (!track || !wrapper || !progressBar) return;

    const slides = track.querySelectorAll(".product-gallery-slide");
    if (slides.length <= 1) {
      progressBar.style.width = "100%";
      return;
    }

    const wrapperWidth = wrapper.offsetWidth;
    const maxScroll = wrapperWidth * (slides.length - 1);
    const currentX = Math.abs(gsap.getProperty(track, "x") || 0);

    const progress = maxScroll > 0 ? (currentX / maxScroll) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }

  updateDots() {
    const dots = this.querySelectorAll(".gallery-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlide);
    });
  }

  goToSlide(index) {
    const track = this.querySelector(".product-gallery-track");
    const wrapper = this.querySelector(".product-gallery-wrapper");
    if (!track || !wrapper) return;

    const slides = track.querySelectorAll(".product-gallery-slide");
    const wrapperWidth = wrapper.offsetWidth;

    this.currentSlide = Math.max(0, Math.min(index, slides.length - 1));

    gsap.to(track, {
      x: -(this.currentSlide * wrapperWidth),
      duration: 0.5,
      ease: "power2.out",
      overwrite: true,
      onComplete: () => {
        this.updateProgress();
        this.updateDots();
      },
    });
  }

  initEventListeners() {
    // Navegação da galeria
    this.querySelector(".gallery-nav-prev")?.addEventListener("click", () => {
      this.goToSlide(this.currentSlide - 1);
    });

    this.querySelector(".gallery-nav-next")?.addEventListener("click", () => {
      this.goToSlide(this.currentSlide + 1);
    });

    // Dots da galeria
    this.querySelectorAll(".gallery-dot").forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    // Seleção de cor
    this.querySelectorAll(".product-color-item").forEach((item, index) => {
      item.addEventListener("click", () => this.selectColor(index));
    });

    // Seleção de tamanho
    this.querySelectorAll(".product-size-item:not(.unavailable)").forEach(
      (item) => {
        item.addEventListener("click", () => this.selectSize(item));
      }
    );

    // Tabs
    this.querySelectorAll(".product-tab-btn").forEach((btn, index) => {
      btn.addEventListener("click", () => this.switchTab(index));
    });

    // Botão Adicionar ao Carrinho
    this.querySelector(".product-btn-primary")?.addEventListener(
      "click",
      () => {
        this.addToCart();
      }
    );

    // Produtos relacionados
    this.querySelectorAll(".related-product-card").forEach((card) => {
      card.addEventListener("click", () => {
        const productId = card.getAttribute("data-product-id");
        if (productId) {
          router.navigate(`/produto/${productId}`);
        }
      });
    });
  }

  selectColor(index) {
    this.selectedColor = index;

    // Atualiza visual
    this.querySelectorAll(".product-color-item").forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });

    // Atualiza imagem principal se a cor tiver imagem associada
    const color = this.product.colors[index];
    if (color?.image) {
      this.goToSlide(0);
    }
  }

  selectSize(item) {
    const size = item.getAttribute("data-size");
    this.selectedSize = size;

    this.querySelectorAll(".product-size-item").forEach((s) => {
      s.classList.toggle("active", s.getAttribute("data-size") === size);
    });
  }

  switchTab(index) {
    this.activeTab = index;

    // Atualiza botões
    this.querySelectorAll(".product-tab-btn").forEach((btn, i) => {
      btn.classList.toggle("active", i === index);
    });

    // Atualiza painéis
    this.querySelectorAll(".product-tab-panel").forEach((panel, i) => {
      panel.classList.toggle("active", i === index);
    });
  }

  addToCart() {
    if (!this.selectedSize && this.product.sizes.length > 1) {
      alert("Por favor, selecione um tamanho.");
      return;
    }

    // Adiciona ao carrinho
    console.log("Adicionando ao carrinho:", {
      product: this.product,
      color: this.product.colors[this.selectedColor],
      size: this.selectedSize || this.product.sizes[0],
    });

    alert(`${this.product.name} adicionado ao carrinho!`);
  }

  getCategoryLabel(category) {
    const labels = {
      blazer: "Blazers",
      sapato: "Sapatos",
      bolsa: "Bolsas",
      oculos: "Óculos",
    };
    return labels[category] || "Produtos";
  }

  render() {
    const { product } = this;
    const relatedProducts = getRelatedProducts(product.id, 4);

    this.innerHTML = `
      <div class="product-detail-container">
        <!-- Galeria de Imagens -->
        <div class="product-gallery">
          <div class="product-gallery-wrapper">
            <div class="product-gallery-track">
              ${product.images
                .map(
                  (img, index) => `
                <div class="product-gallery-slide">
                  <img src="${img}" alt="${product.name} - Imagem ${
                    index + 1
                  }" />
                </div>
              `
                )
                .join("")}
            </div>
          </div>

          <!-- Navegação -->
          <button class="gallery-nav gallery-nav-prev" aria-label="Imagem anterior">
            <svg viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button class="gallery-nav gallery-nav-next" aria-label="Próxima imagem">
            <svg viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <!-- Indicadores -->
          <div class="gallery-pagination">
            ${product.images
              .map(
                (_, index) => `
              <div class="gallery-dot ${
                index === 0 ? "active" : ""
              }" data-index="${index}"></div>
            `
              )
              .join("")}
          </div>

          <!-- Progress Bar -->
          <div class="gallery-progress">
            <div class="gallery-progress-bar" style="width: 0%"></div>
          </div>
        </div>

        <!-- Informações do Produto -->
        <div class="product-info">
          <!-- Breadcrumb -->
          <nav class="product-breadcrumb">
            <a href="/" data-route="/">Home</a>
            <span>/</span>
            <a href="/para-ela" data-route="/para-ela">${this.getCategoryLabel(
              product.category
            )}</a>
            <span>/</span>
            <span>${product.name}</span>
          </nav>

          <!-- Cabeçalho -->
          <header class="product-header">
            <h1 class="product-name">${product.name}</h1>
            <p class="product-description">${product.description}</p>
            <p class="product-price">${product.price}</p>
            <p class="product-reference">Ref. ${product.reference}</p>
          </header>

          <!-- Seleção de Cores -->
          ${
            product.colors.length > 0
              ? `
            <div class="product-colors">
              <p class="product-colors-title">Cor: ${
                product.colors[0].label
              }</p>
              <div class="product-colors-list">
                ${product.colors
                  .map(
                    (color, index) => `
                  <div class="product-color-item ${
                    index === 0 ? "active" : ""
                  }" 
                       data-color="${color.name}" 
                       title="${color.label}">
                    <img src="${color.image}" alt="${color.label}" />
                  </div>
                `
                  )
                  .join("")}
                ${
                  product.moreColors
                    ? `
                  <div class="product-more-colors">+${product.moreColors}</div>
                `
                    : ""
                }
              </div>
            </div>
          `
              : ""
          }

          <!-- Seleção de Tamanho -->
          ${
            product.sizes.length > 0 && product.sizes[0] !== "Único"
              ? `
            <div class="product-sizes">
              <div class="product-sizes-header">
                <p class="product-sizes-title">Tamanho</p>
                <span class="product-size-guide">Guia de tamanhos</span>
              </div>
              <div class="product-sizes-list">
                ${product.sizes
                  .map(
                    (size) => `
                  <div class="product-size-item" data-size="${size}">${size}</div>
                `
                  )
                  .join("")}
              </div>
            </div>
          `
              : ""
          }

          <!-- Botões de Ação -->
          <div class="product-actions">
            <button class="product-btn product-btn-secondary">
              Disponibilidade na(s) boutique(s)
            </button>
            <button class="product-btn product-btn-primary">
              Contato
            </button>
          </div>

          <!-- Tabs -->
          <div class="product-tabs">
            <div class="product-tabs-nav">
              <button class="product-tab-btn active" data-tab="0">Descrição</button>
              <button class="product-tab-btn" data-tab="1">Tamanho e corte</button>
              <button class="product-tab-btn" data-tab="2">Contato e disponibilidade na loja</button>
            </div>
            <div class="product-tabs-content">
              <!-- Tab Descrição -->
              <div class="product-tab-panel active" data-panel="0">
                <p class="product-description-text">${
                  product.fullDescription
                }</p>
                <a href="#" class="product-ver-mais">Ver mais</a>
              </div>
              
              <!-- Tab Tamanho e Corte -->
              <div class="product-tab-panel" data-panel="1">
                <p>Para garantir o ajuste perfeito, recomendamos consultar nosso guia de tamanhos.</p>
                <h4>Tamanhos disponíveis</h4>
                <ul>
                  ${product.sizes.map((s) => `<li>${s}</li>`).join("")}
                </ul>
                <h4>Dicas de ajuste</h4>
                <ul>
                  <li>Produto com modelagem tradicional Dior</li>
                  <li>Para dúvidas, entre em contato com nossa equipe</li>
                </ul>
              </div>
              
              <!-- Tab Contato e disponibilidade -->
              <div class="product-tab-panel" data-panel="2">
                <p>Entre em contato conosco para mais informações sobre disponibilidade e entrega.</p>
                <div class="contact-info">
                  <p><strong>Telefone:</strong> 0800 123 4567</p>
                  <p><strong>WhatsApp:</strong> (11) 99999-9999</p>
                  <p><strong>E-mail:</strong> atendimento@dior.com.br</p>
                </div>
                <a href="#" class="product-ver-mais">Ver mais</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Produtos Relacionados -->
      ${
        relatedProducts.length > 0
          ? `
        <section class="related-products-section">
          <h2 class="related-products-title">Você também pode gostar</h2>
          <div class="related-products-grid">
            ${relatedProducts
              .map(
                (p) => `
              <div class="related-product-card" data-product-id="${p.id}">
                <div class="related-product-image">
                  <img src="${p.images[0]}" alt="${p.name}" />
                </div>
                <h3 class="related-product-name">${p.name}</h3>
                <p class="related-product-price">${p.price}</p>
              </div>
            `
              )
              .join("")}
          </div>
        </section>
      `
          : ""
      }
    `;
  }
}

customElements.define("product-detail-content", ProductDetailContent);
