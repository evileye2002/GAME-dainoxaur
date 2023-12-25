export class ButtonImputHandler {
  constructor(btn) {
    this.lastKey = "RELEASE";
    this.btn = btn;

    if (btn.element === null) return;
    this.btn.element.addEventListener("mousedown", () => {
      this.lastKey = "PRESS";
    });

    this.btn.element.addEventListener("mouseup", () => {
      this.lastKey = "RELEASE";
    });

    this.btn.element.addEventListener("touchstart", () => {
      this.lastKey = "PRESS";
    });

    this.btn.element.addEventListener("touchstop", () => {
      this.lastKey = "RELEASE";
    });
  }
}
