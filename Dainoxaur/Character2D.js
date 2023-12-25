import { GameObject } from "./GameObject.js";
import { VectorTo } from "./utils.js";

export class Character2D extends GameObject {
  constructor(config) {
    super(config);

    this.speed = config.speed ?? 0.13;
    this.animation = config.animation ?? null;
  }

  update(deltaTime) {}

  step(deltaTime) {
    if (!this.animation) return;

    this.animation.step(deltaTime);
    this.frame = this.animation.frame;
  }

  stop() {
    this.animation.stop();
  }
}
