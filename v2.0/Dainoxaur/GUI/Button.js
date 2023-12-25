import { GameObject } from "../GameObject.js";
import { ButtonImputHandler } from "./ButtonImputHandler.js";
import { ButtonPress, ButtonRelease } from "./ButtonState.js";

export class Button extends GameObject {
  constructor(config) {
    super(config);

    this.states = [
      new ButtonPress({ btn: this, pressFrame: config.stateFrame.press }),
      new ButtonRelease({ btn: this, releaseFrame: config.stateFrame.release }),
    ];
    this.currentState = this.states[0];
    this.element = document.getElementById(config.id);
    this.imput = new ButtonImputHandler(this);
  }

  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }

  update() {
    this.currentState.handlerImput(this.imput.lastKey);
  }
}
