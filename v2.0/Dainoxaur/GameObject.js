import { VectorTo } from "./utils.js";

export class GameObject {
  constructor(config) {
    this.resource = config.resource;
    this.columns = config.columns ?? 1;
    this.rows = config.rows ?? 1;
    this.frame = config.frame ?? 0;
    this.frameMap = new Map();
    this.frameSize = config.frameSize ?? new VectorTo(16, 16);
    this.position = config.position ?? new VectorTo(0, 0);
    this.scale = config.scale ?? 1;

    this.buildFrameMap();
  }

  draw(ctx) {
    if (!this.resource.isLoaded) return;

    let frameCoordX = 0;
    let frameCoordY = 0;
    const frame = this.frameMap.get(this.frame);
    if (frame) {
      frameCoordX = frame.x;
      frameCoordY = frame.y;
    }

    const frameSizeX = this.frameSize.x;
    const frameSizeY = this.frameSize.y;

    ctx.drawImage(
      this.resource.image,
      frameCoordX,
      frameCoordY,
      frameSizeX,
      frameSizeY,
      this.position.x,
      this.position.y,
      frameSizeX * this.scale,
      frameSizeY * this.scale
    );
  }

  update(deltaTime) {}

  buildFrameMap() {
    let frameCount = 0;
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        this.frameMap.set(
          frameCount,
          new VectorTo(this.frameSize.x * col, this.frameSize.y * row)
        );
        frameCount++;
      }
    }
  }
}
