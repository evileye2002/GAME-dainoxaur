import { Character2D } from "./Character2D.js";

export class Enemy extends Character2D {
  constructor(config, gameSizeX, gameSizeY) {
    super(config);

    this.gameSizeX = gameSizeX;
    this.gameSizeY = gameSizeY;
    this.markedForDeletion = false;
  }

  update(deltaTime) {
    this.position.x -= this.speed * deltaTime;
    if (this.position.x < 0 - this.frameSize.x) {
      this.markedForDeletion = true;
    }
  }
}
