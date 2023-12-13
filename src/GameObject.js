export default class GameObject {
  constructor({ position }) {
    this.position = position;
    this.children = {};
  }

  stepEntry(delta, root) {
    this.children.forEach((child) => child.stepEntry(delta, root));

    this.step(delta, root);
  }

  step(_delta) {}

  draw(ctx, x, y) {
    const drawPosX = this.position.x;
    const drawPosY = this.position.x;

    drawImage(ctx, x, y);

    this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
  }

  drawImage(ctx, drawPosX, drawPosY) {}

  addChild(gameObject) {
    this.children.push(gameObject);
  }

  removeChild(gameObject) {
    this.children = this.children.filter((g) => {
      return gameObject !== g;
    });
  }
}
