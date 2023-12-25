export class Scene {
  constructor() {
    this.objects = [];
  }

  draw(ctx) {
    this.objects.forEach((child) => {
      child.draw(ctx);
    });
  }

  update(deltaTime) {
    this.objects.forEach((child) => {
      child.update(deltaTime);
      child.step(deltaTime);
    });
  }

  addObject(child) {
    this.objects.push(child);
  }
}
