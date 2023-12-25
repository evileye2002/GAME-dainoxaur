import { State } from "../State.js";

export const states = {
  PRESS: 0,
  RELEASE: 1,
};

export class ButtonPress extends State {
  constructor(config) {
    super("PRESS");
    this.btn = config.btn;
    this.newFrame = config.pressFrame;
  }

  enter() {
    this.btn.frame = this.newFrame;
  }

  handlerImput(imput) {
    if (imput === "RELEASE") this.btn.setState(states.RELEASE);
  }
}

export class ButtonRelease extends State {
  constructor(config) {
    super("RELEASE");
    this.btn = config.btn;
    this.newFrame = config.releaseFrame;
  }

  enter() {
    this.btn.frame = this.newFrame;
  }

  handlerImput(imput) {
    if (imput === "PRESS") this.btn.setState(states.PRESS);
  }
}
