// ============================================================================
// HOME PAGE - Página inicial usando Web Components
// ============================================================================

import "../components/AppNavigation.js";
import "../components/HeroSection.js";
import "../components/TextContent.js";
import "../components/VideoSection.js";
import "../components/KeyholeSection.js";
import "../components/AnimatedSections.js";

export class HomePage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
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

      <!-- Keyhole Reveal Section -->
      <keyhole-section
        image="./images/Image 2 Dior.jpg"
        subtitle="Dior Backstage Glow Maximizer Palette"
        title="Uma nova visão da icônica paleta de iluminadores"
        button-text="Descubra"
      ></keyhole-section>

      <!-- Animated Scroll Sections -->
      <animated-sections></animated-sections>
    `;
  }
}

customElements.define("home-page", HomePage);
