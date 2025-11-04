// ============================================================================
// FINALIZAR COMPRA PAGE - Página de checkout
// ============================================================================

import "../components/AppNavigation.js";
import "../components/FooterSection.js";
import { cartService } from "../services/CartService.js";

export class FinalizarCompraPage extends HTMLElement {
  constructor() {
    super();
    // Inicializa com itens padrão se o carrinho estiver vazio
    cartService.initializeDefaultItems();
    this.cartItems = cartService.getItems();

    // Listener para atualizar quando o carrinho mudar
    this.cartListener = (items) => {
      this.cartItems = items;
      this.updateCartDisplay();
    };
  }

  connectedCallback() {
    this.render();
    this.initAnimations();
    this.initCartControls();

    // Adiciona listener para mudanças no carrinho
    cartService.addListener(this.cartListener);
  }

  disconnectedCallback() {
    // Cleanup animations
    if (this.animations) {
      this.animations.forEach((anim) => anim.kill());
    }

    // Remove listener do carrinho
    cartService.removeListener(this.cartListener);
  }

  calculateSubtotal() {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  initAnimations() {
    requestAnimationFrame(() => {
      if (!window.gsap) return;

      this.animations = [];

      // Animação de entrada do título
      const titleTl = window.gsap.timeline();
      titleTl
        .from(".checkout-hero-title", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        })
        .from(
          ".checkout-hero-subtitle",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        );

      this.animations.push(titleTl);

      // Animação do conteúdo principal
      window.gsap.from(".checkout-container", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });
    });
  }

  initCartControls() {
    // Botões de aumentar quantidade
    const plusButtons = this.querySelectorAll(".quantity-plus");
    plusButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const itemId = parseInt(e.currentTarget.dataset.itemId);
        this.updateQuantity(itemId, 1);
      });
    });

    // Botões de diminuir quantidade
    const minusButtons = this.querySelectorAll(".quantity-minus");
    minusButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const itemId = parseInt(e.currentTarget.dataset.itemId);
        this.updateQuantity(itemId, -1);
      });
    });

    // Botões de remover item
    const removeButtons = this.querySelectorAll(".cart-remove-btn");
    removeButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const itemId = parseInt(e.currentTarget.dataset.itemId);
        this.removeItem(itemId);
      });
    });
  }

  updateQuantity(itemId, change) {
    // Atualiza no cartService
    if (change > 0) {
      cartService.incrementQuantity(itemId);
    } else {
      cartService.decrementQuantity(itemId);
    }

    // Atualiza a UI
    this.cartItems = cartService.getItems();
    const item = this.cartItems.find((i) => i.id === itemId);

    if (item) {
      const row = this.querySelector(`[data-item-id="${itemId}"]`)?.closest(
        ".cart-table-row"
      );
      if (row) {
        const quantityInput = row.querySelector(".quantity-input");
        const totalCell = row.querySelector(".cart-total-cell");

        if (quantityInput) {
          quantityInput.value = item.quantity;
        }

        if (totalCell && !totalCell.classList.contains("cart-free-text")) {
          const itemTotal = (item.price * item.quantity)
            .toFixed(2)
            .replace(".", ",");
          totalCell.textContent = `R$ ${itemTotal}`;
        }
      }
    }
  }

  removeItem(itemId) {
    // Remove a linha com animação suave
    const row = this.querySelector(`[data-item-id="${itemId}"]`)?.closest(
      ".cart-table-row"
    );

    if (row) {
      if (window.gsap) {
        window.gsap.to(row, {
          opacity: 0,
          height: 0,
          padding: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            row.remove();
            // Remove do cartService após a animação
            cartService.removeItem(itemId);
            this.cartItems = cartService.getItems();
          },
        });
      } else {
        row.remove();
        cartService.removeItem(itemId);
        this.cartItems = cartService.getItems();
      }
    }
  }

  updateCartDisplay() {
    // Atualiza apenas a seção do carrinho sem re-renderizar tudo
    const cartTableItems = this.querySelector(".cart-table-items");
    if (cartTableItems && this.cartItems) {
      // Re-renderiza apenas os itens do carrinho
      const itemsHTML = this.cartItems
        .map(
          (item) => `
        <div class="cart-table-row">
          <div class="cart-product-cell">
            <img src="${item.image}" alt="${
            item.name
          }" class="cart-product-image" />
            <div class="cart-product-info">
              <h3 class="cart-product-name">${item.name}</h3>
              <p class="cart-product-volume">${item.volume}</p>
            </div>
          </div>
          
          <div class="cart-price-cell">
            R$ ${item.price.toFixed(2).replace(".", ",")}
          </div>
          
          <div class="cart-quantity-cell">
            <div class="quantity-controls">
              <button class="quantity-btn quantity-minus" data-item-id="${
                item.id
              }">
                <svg width="12" height="2" viewBox="0 0 12 2" fill="none">
                  <line x1="0" y1="1" x2="12" y2="1" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>
              <input type="text" class="quantity-input" value="${
                item.quantity
              }" readonly />
              <button class="quantity-btn quantity-plus" data-item-id="${
                item.id
              }">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" stroke-width="2"/>
                  <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="cart-total-cell">
            R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}
          </div>
          
          <button class="cart-remove-btn" data-item-id="${item.id}">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" stroke-width="1.5"/>
              <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" stroke-width="1.5"/>
            </svg>
          </button>
        </div>
      `
        )
        .join("");

      const freeItemsHTML = `
        <div class="cart-table-row cart-free-item">
          <div class="cart-product-cell">
            <img src="./images/edp.webp" alt="Amostra Miss Dior EDP" class="cart-product-image" />
            <div class="cart-product-info">
              <h3 class="cart-product-name">Amostra Miss Dior EDP 1ml</h3>
            </div>
          </div>
          <div class="cart-price-cell">-</div>
          <div class="cart-quantity-cell">1</div>
          <div class="cart-total-cell cart-free-text">Grátis</div>
        </div>

        <div class="cart-table-row cart-free-item">
          <div class="cart-product-cell">
            <img src="./images/pouch.webp" alt="Holiday Empty Pouch" class="cart-product-image" />
            <div class="cart-product-info">
              <h3 class="cart-product-name">Holiday Empty Pouch</h3>
            </div>
          </div>
          <div class="cart-price-cell">-</div>
          <div class="cart-quantity-cell">1</div>
          <div class="cart-total-cell cart-free-text">Grátis</div>
        </div>
      `;

      cartTableItems.innerHTML = itemsHTML + freeItemsHTML;

      // Re-inicializa os event listeners
      this.initCartControls();
    }
  }

  render() {
    const subtotal = this.calculateSubtotal();

    this.innerHTML = `
      <app-navigation></app-navigation>

      <main class="finalizar-compra-page">
        <!-- Hero Section -->
        <section class="checkout-hero">
          <div class="checkout-hero-content">
            <h1 class="checkout-hero-title">Finalizar Compra</h1>
            <p class="checkout-hero-subtitle">
              Refine seu pedido com a Arte de Presentear Dior e escreva uma mensagem personalizada.
            </p>
          </div>
        </section>

        <!-- Main Checkout Container -->
        <div class="checkout-container">
          <!-- Left Column: Form -->
          <div class="checkout-form-section">
            <div class="checkout-section">
              <h2 class="checkout-section-title">Informações de Contato</h2>
              <form class="checkout-form">
                <div class="form-group">
                  <label for="email">E-mail</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Digite seu e-mail"
                    required
                  />
                </div>
              </form>
            </div>

            <div class="checkout-section">
              <h2 class="checkout-section-title">Endereço de Entrega</h2>
              <form class="checkout-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="firstName">Nome</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      placeholder="Nome"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="lastName">Sobrenome</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      placeholder="Sobrenome"
                      required
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="address">Endereço</label>
                  <input 
                    type="text" 
                    id="address" 
                    name="address" 
                    placeholder="Rua, número"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="complement">Complemento</label>
                  <input 
                    type="text" 
                    id="complement" 
                    name="complement" 
                    placeholder="Apartamento, bloco, etc (opcional)"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="city">Cidade</label>
                    <input 
                      type="text" 
                      id="city" 
                      name="city" 
                      placeholder="Cidade"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="state">Estado</label>
                    <select id="state" name="state" required>
                      <option value="">Selecione</option>
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="zipCode">CEP</label>
                    <input 
                      type="text" 
                      id="zipCode" 
                      name="zipCode" 
                      placeholder="00000-000"
                      required
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="phone">Telefone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
              </form>
            </div>

            <div class="checkout-section">
              <h2 class="checkout-section-title">Método de Pagamento</h2>
              <div class="payment-methods">
                <label class="payment-method-option">
                  <input type="radio" name="payment" value="credit" checked />
                  <span class="payment-method-label">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    Cartão de Crédito
                  </span>
                </label>
                <label class="payment-method-option">
                  <input type="radio" name="payment" value="pix" />
                  <span class="payment-method-label">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    </svg>
                    PIX
                  </span>
                </label>
                <label class="payment-method-option">
                  <input type="radio" name="payment" value="boleto" />
                  <span class="payment-method-label">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="9" y1="15" x2="15" y2="15"></line>
                    </svg>
                    Boleto Bancário
                  </span>
                </label>
              </div>
            </div>
          </div>

          <!-- Right Column: Order Summary -->
          <div class="checkout-summary-section">
            <div class="order-summary">
              <h2 class="order-summary-title">Meu Carrinho</h2>
              
              <!-- Header da tabela -->
              <div class="cart-table-header">
                <div class="header-produto">Produto</div>
                <div class="header-preco">Preço</div>
                <div class="header-quantidade">Quantidade</div>
                <div class="header-total">Total</div>
              </div>

              <!-- Items do carrinho -->
              <div class="cart-table-items">
                ${this.cartItems
                  .map(
                    (item) => `
                  <div class="cart-table-row">
                    <div class="cart-product-cell">
                      <img src="${item.image}" alt="${
                      item.name
                    }" class="cart-product-image" />
                      <div class="cart-product-info">
                        <h3 class="cart-product-name">${item.name}</h3>
                        <p class="cart-product-volume">${item.volume}</p>
                      </div>
                    </div>
                    
                    <div class="cart-price-cell">
                      R$ ${item.price.toFixed(2).replace(".", ",")}
                    </div>
                    
                    <div class="cart-quantity-cell">
                      <div class="quantity-controls">
                        <button class="quantity-btn quantity-minus" data-item-id="${
                          item.id
                        }">
                          <svg width="12" height="2" viewBox="0 0 12 2" fill="none">
                            <line x1="0" y1="1" x2="12" y2="1" stroke="currentColor" stroke-width="2"/>
                          </svg>
                        </button>
                        <input type="text" class="quantity-input" value="${
                          item.quantity
                        }" readonly />
                        <button class="quantity-btn quantity-plus" data-item-id="${
                          item.id
                        }">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" stroke-width="2"/>
                            <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" stroke-width="2"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div class="cart-total-cell">
                      R$ ${(item.price * item.quantity)
                        .toFixed(2)
                        .replace(".", ",")}
                    </div>
                    
                    <button class="cart-remove-btn" data-item-id="${item.id}">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" stroke-width="1.5"/>
                        <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" stroke-width="1.5"/>
                      </svg>
                    </button>
                  </div>
                `
                  )
                  .join("")}
                
                <!-- Amostras Grátis -->
                <div class="cart-table-row cart-free-item">
                  <div class="cart-product-cell">
                    <img src="./images/edp.webp" alt="Amostra Miss Dior EDP" class="cart-product-image" />
                    <div class="cart-product-info">
                      <h3 class="cart-product-name">Amostra Miss Dior EDP 1ml</h3>
                    </div>
                  </div>
                  <div class="cart-price-cell">-</div>
                  <div class="cart-quantity-cell">1</div>
                  <div class="cart-total-cell cart-free-text">Grátis</div>
                </div>

                <div class="cart-table-row cart-free-item">
                  <div class="cart-product-cell">
                    <img src="./images/pouch.webp" alt="Holiday Empty Pouch" class="cart-product-image" />
                    <div class="cart-product-info">
                      <h3 class="cart-product-name">Holiday Empty Pouch</h3>
                    </div>
                  </div>
                  <div class="cart-price-cell">-</div>
                  <div class="cart-quantity-cell">1</div>
                  <div class="cart-total-cell cart-free-text">Grátis</div>
                </div>
              </div>

              <div class="cart-footer">
                <button class="checkout-submit-btn">
                  Finalizar Pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer-section></footer-section>
    `;
  }
}

customElements.define("finalizar-compra-page", FinalizarCompraPage);
