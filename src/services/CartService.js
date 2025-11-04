// ============================================================================
// CART SERVICE - Gerenciamento centralizado do carrinho com LocalStorage
// ============================================================================

class CartService {
  constructor() {
    this.STORAGE_KEY = "dior_cart";
    this.listeners = [];
  }

  // Obtém todos os itens do carrinho
  getItems() {
    try {
      const items = localStorage.getItem(this.STORAGE_KEY);
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error("Erro ao ler carrinho:", error);
      return [];
    }
  }

  // Salva os itens no carrinho
  saveItems(items) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
      this.notifyListeners();
    } catch (error) {
      console.error("Erro ao salvar carrinho:", error);
    }
  }

  // Adiciona um item ao carrinho
  addItem(product) {
    const items = this.getItems();
    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
      // Se o item já existe, aumenta a quantidade
      existingItem.quantity += 1;
    } else {
      // Se não existe, adiciona novo item
      items.push({
        id: product.id,
        name: product.name,
        volume: product.volume,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
    }

    this.saveItems(items);
    return items;
  }

  // Remove um item do carrinho
  removeItem(itemId) {
    const items = this.getItems();
    const filteredItems = items.filter((item) => item.id !== itemId);
    this.saveItems(filteredItems);
    return filteredItems;
  }

  // Atualiza a quantidade de um item
  updateQuantity(itemId, quantity) {
    const items = this.getItems();
    const item = items.find((i) => i.id === itemId);

    if (item && quantity > 0 && quantity <= 10) {
      item.quantity = quantity;
      this.saveItems(items);
    }

    return items;
  }

  // Incrementa a quantidade de um item
  incrementQuantity(itemId) {
    const items = this.getItems();
    const item = items.find((i) => i.id === itemId);

    if (item && item.quantity < 10) {
      item.quantity += 1;
      this.saveItems(items);
    }

    return items;
  }

  // Decrementa a quantidade de um item
  decrementQuantity(itemId) {
    const items = this.getItems();
    const item = items.find((i) => i.id === itemId);

    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.saveItems(items);
    }

    return items;
  }

  // Calcula o total do carrinho
  getTotal() {
    const items = this.getItems();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Obtém a quantidade total de itens
  getTotalItems() {
    const items = this.getItems();
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  // Limpa o carrinho
  clearCart() {
    this.saveItems([]);
    return [];
  }

  // Adiciona um listener para mudanças no carrinho
  addListener(callback) {
    this.listeners.push(callback);
  }

  // Remove um listener
  removeListener(callback) {
    this.listeners = this.listeners.filter((listener) => listener !== callback);
  }

  // Notifica todos os listeners sobre mudanças
  notifyListeners() {
    const items = this.getItems();
    this.listeners.forEach((callback) => callback(items));
  }

  // Inicializa o carrinho com itens padrão (apenas se estiver vazio)
  initializeDefaultItems() {
    const items = this.getItems();
    if (items.length === 0) {
      const defaultItems = [
        {
          id: 1,
          name: "Miss Dior Essence",
          volume: "35 ml",
          price: 799.0,
          quantity: 1,
          image: "./images/dioressence1.webp",
        },
        {
          id: 2,
          name: "Miss Dior Parfum",
          volume: "35 ml",
          price: 665.0,
          quantity: 1,
          image: "./images/parfum1.webp",
        },
      ];
      this.saveItems(defaultItems);
    }
  }
}

// Exporta uma instância única (Singleton)
export const cartService = new CartService();
