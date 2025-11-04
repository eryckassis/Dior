import "../components/AppNavigation.js";
import "../components/FooterSection.js";
import "../styles/login.css";

export class LoginPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.initSwitch();
    this.initButtonAnimations();
    this.initForgotPassword();
  }

  initForgotPassword() {
    const forgotLink = this.querySelector(".form__link");
    const modal = this.querySelector(".forgot-password-modal");
    const modalBackdrop = this.querySelector(".forgot-password-backdrop");
    const closeBtn = this.querySelector(".forgot-modal-close");
    const sendBtn = this.querySelector(".forgot-send-btn");
    const passwordToggle = this.querySelector(".password-toggle");

    if (forgotLink) {
      forgotLink.addEventListener("click", (e) => {
        e.preventDefault();
        this.openForgotPasswordModal();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeForgotPasswordModal());
    }

    if (modalBackdrop) {
      modalBackdrop.addEventListener("click", () =>
        this.closeForgotPasswordModal()
      );
    }

    if (sendBtn) {
      sendBtn.addEventListener("click", () => this.sendPasswordReset());
    }

    // Toggle password visibility
    if (passwordToggle) {
      passwordToggle.addEventListener("click", () =>
        this.togglePasswordVisibility()
      );
    }
  }

  togglePasswordVisibility() {
    const passwordInputWrapper = this.querySelector(
      ".login-input-wrapper:has(input[type='password']), .login-input-wrapper:has(input[type='text'][placeholder*='senha'])"
    );
    const passwordInput = passwordInputWrapper?.querySelector("input");
    const toggleBtn = passwordInputWrapper?.querySelector(".password-toggle");

    if (!passwordInput || !toggleBtn) return;

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
      `;
    } else {
      passwordInput.type = "password";
      toggleBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      `;
    }
  }

  openForgotPasswordModal() {
    const modal = this.querySelector(".forgot-password-modal");
    const backdrop = this.querySelector(".forgot-password-backdrop");

    if (!modal || !backdrop) return;

    backdrop.style.display = "block";
    modal.style.display = "block";

    if (window.gsap) {
      window.gsap
        .timeline()
        .to(backdrop, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        })
        .fromTo(
          modal,
          { opacity: 0, scale: 0.9, y: -20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" },
          "-=0.2"
        );
    } else {
      backdrop.style.opacity = "1";
      modal.style.opacity = "1";
    }
  }

  closeForgotPasswordModal() {
    const modal = this.querySelector(".forgot-password-modal");
    const backdrop = this.querySelector(".forgot-password-backdrop");

    if (!modal || !backdrop) return;

    if (window.gsap) {
      window.gsap
        .timeline({
          onComplete: () => {
            modal.style.display = "none";
            backdrop.style.display = "none";
            // Reset form
            const input = this.querySelector(".forgot-email-input");
            const message = this.querySelector(".forgot-message");
            if (input) input.value = "";
            if (message) message.style.display = "none";
          },
        })
        .to(modal, {
          opacity: 0,
          scale: 0.9,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
        })
        .to(
          backdrop,
          {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
          },
          "-=0.2"
        );
    } else {
      modal.style.display = "none";
      backdrop.style.display = "none";
    }
  }

  sendPasswordReset() {
    const input = this.querySelector(".forgot-email-input");
    const message = this.querySelector(".forgot-message");

    if (!input || !input.value.trim()) {
      message.textContent = "Por favor, insira um email válido";
      message.style.color = "#e74c3c";
      message.style.display = "block";
      return;
    }

    // Simulação de envio
    message.textContent = "Email de recuperação enviado com sucesso!";
    message.style.color = "#27ae60";
    message.style.display = "block";

    setTimeout(() => {
      this.closeForgotPasswordModal();
    }, 2000);
  }

  initButtonAnimations() {
    // Removido - não vamos usar mais a animação de hover nas linhas
    return;
  }

  initSwitch() {
    // Prevent form submit default for demo
    const forms = this.querySelectorAll("form");
    forms.forEach((f) =>
      f.addEventListener("submit", (e) => e.preventDefault())
    );
  }

  render() {
    this.innerHTML = `
      <div class="login-page">
        <app-navigation></app-navigation>

        <div class="all-content">
          <main class="main">
            <div class="container b-container" id="b-container">
              <form id="b-form" class="form" method="" action="">
                <h2 class="form_title">Entrar com email e senha</h2>
                <p class="form_subtitle">Para acessar sua conta</p>

                <div class="login-input-wrapper">
                  <input 
                    class="form__input" 
                    type="email" 
                    placeholder="Ex.: exemplo@mail.com"
                    required 
                  />
                </div>

                <div class="login-input-wrapper">
                  <input 
                    class="form__input" 
                    type="password" 
                    placeholder="Adicione sua senha"
                    required 
                  />
                  <button type="button" class="password-toggle" aria-label="Mostrar senha">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </div>

                <a class="form__link" href="#" id="forgot-password-link">Esqueci minha senha</a>
                
                <button class="form__button" type="submit">Entrar</button>

                <div class="login-footer">
                  <p class="login-footer-text">Não tem uma conta? Cadastre-se</p>
                  <a href="#" class="signup-link-footer">Login</a>
                  <button type="button" class="email-code-button">Receber código de acesso por email</button>
                </div>
              </form>
            </div>

            <div class="switch" id="switch-cnt">
              <div class="switch__video">
                <video autoplay muted loop playsinline>
                  <source src="./videos/diorVideo.mp4" type="video/mp4">
                </video>
              </div>

              <div class="switch__container" id="switch-c1">
                <h2 class="switch__title title"></h2>
              </div>
            </div>
          </main>
        </div>

        <!-- Forgot Password Modal -->
        <div class="forgot-password-backdrop"></div>
        <div class="forgot-password-modal">
          <button class="forgot-modal-close" aria-label="Fechar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <h2 class="forgot-modal-title">Esqueci minha senha</h2>
          <p class="forgot-modal-subtitle">Digite seu email para receber instruções de recuperação</p>

          <input 
            type="email" 
            class="forgot-email-input" 
            placeholder="Digite seu email"
          />

          <button class="forgot-send-btn">Enviar</button>

          <p class="forgot-message"></p>
        </div>

        <footer-section></footer-section>
      </div>
    `;
  }
}

customElements.define("login-page", LoginPage);
