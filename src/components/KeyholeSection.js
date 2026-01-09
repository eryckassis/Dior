// ============================================================================
// KEYHOLE SECTION WEB COMPONENT - Seção com efeito keyhole
// ============================================================================

export class KeyholeSection extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const image = this.getAttribute("image") || "/images/Image 2 Dior.jpg";
    const subtitle =
      this.getAttribute("subtitle") || "Dior Backstage Glow Maximizer Palette";
    const title =
      this.getAttribute("title") ||
      "Uma nova visão da icônica paleta de iluminadores";
    const buttonText = this.getAttribute("button-text") || "Descubra";

    this.render(image, subtitle, title, buttonText);
  }

  render(image, subtitle, title, buttonText) {
    this.innerHTML = `
      <section class="keyhole-section">
        <div class="keyhole-container">
          <div class="keyhole-image">
            <img
              src="${image}"
              alt="Dior product reveal"
              loading="lazy"
            />
          </div>
          <div class="keyhole-overlay"></div>
          <div class="keyhole-content">
            <p class="keyhole-subtitle">${subtitle}</p>
            <h2 class="keyhole-title">
              ${title}
            </h2>
            <a href="#" class="keyhole-button" data-block="button">
              <span class="button__label">${buttonText}</span>
              <span class="button__flair"></span>
            </a>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("keyhole-section", KeyholeSection);
