// ============================================================================
// VIDEO SECTION WEB COMPONENT - Seção com vídeo simples
// ============================================================================

export class VideoSection extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const videoSrc =
      this.getAttribute("video") || "./videos/videosection1.2.mp4";
    const id = this.getAttribute("section-id") || "depth-meaning";

    this.render(videoSrc, id);
  }

  render(videoSrc, id) {
    this.innerHTML = `
      <article class="grid-item" id="${id}">
        <figure class="grid-item__wrapper">
          <figcaption class="grid-copy"></figcaption>
          <video
            src="${videoSrc}"
            autoplay
            muted
            loop
            playsinline
          ></video>
        </figure>
      </article>
    `;
  }
}

customElements.define("video-section", VideoSection);
