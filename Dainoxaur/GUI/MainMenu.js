export class MainMenu {
  constructor(config) {
    this.config = config;
    this.children = [];
    this.background = config.background;
    this.background.classList.add("background");
    this.isDisable = false;
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("main-menu");
    this.element.innerHTML = `
        ${this.config.background.outerHTML}
        <div class="content">
          <div class="header">
            <h2>${this.config.title}</h2>
          </div>
          
          <div class="body">
            ${this.config.body}
          </div>
          
          <div class="footer">
            ${this.config.footer}
          </div>
        </div>
  `;
  }

  toggleDisable(value) {
    if (value) {
      this.element.classList.add("disable");
      this.isDisable = true;
    } else {
      this.element.classList.remove("disable");
      this.isDisable = false;
    }
  }

  addBtnIcon(ctx, btn) {
    this.children.push({ ctx, btn });
  }

  draw() {
    if (this.isDisable) return;
    this.children.forEach((child) => {
      child.btn.draw(child.ctx);
    });
  }

  update() {
    if (this.isDisable) return;
    this.children.forEach((child) => {
      child.btn.update();
    });
  }
}
