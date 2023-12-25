import { Character2D } from "./Character2D.js";
import { ImputHandler } from "./ImputHandler.js";
import { Biting, Diving, Dying, Falling, Jumping, Walking } from "./State.js";

export class Player extends Character2D {
  constructor(config) {
    super(config);

    this.imput = new ImputHandler(this);
    this.jumpKey = config.jumpKey;
    this.diveKey = config.diveKey;

    this.states = [
      new Walking(this),
      new Jumping(this),
      new Falling(this),
      new Diving(this),
      new Dying(this),
      new Biting(this),
    ];
    this.currentState = this.states[0];

    this.ground = this.position.duplicate();
    this.weight = 0.4;
    this.vY = 0;
  }

  update(deltaTime) {
    this.currentState.handlerImput(this.imput.lastKey);

    this.position.y += this.vY;
    if (!this.onGround()) {
      this.vY += this.weight;
    } else this.vY = 0;

    if (this.position.y > this.ground.y) this.position.y = this.ground.y;
  }

  onGround() {
    return this.position.y >= this.ground.y;
  }

  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
}
