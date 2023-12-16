import VectorTo from "./VectorTo.js";

export default class Sprite {
  constructor({
    resource,
    frameSize,
    rows,
    columns,
    frame,
    scale,
    animation,
    position,
  }) {
    this.resource = resource;
    this.frameSize = frameSize ?? new VectorTo(16, 16);
    this.columns = columns ?? 1;
    this.rows = rows ?? 1;
    this.frame = frame ?? 0;
    this.frameMap = new Map();
    this.scale = scale ?? 1;
    this.position = position ?? new VectorTo(0, 0);
    this.animation = animation ?? null;
    this.buildFrameMap();
  }

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

  step(delta) {
    if (!this.animation) return;

    this.animation.step(delta);
    this.frame = this.animation.frame;
  }

  stop() {
    this.animation.stop();
  }

  drawImage(ctx, x, y) {
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
      x,
      y,
      frameSizeX * this.scale,
      frameSizeY * this.scale
    );
  }
}
