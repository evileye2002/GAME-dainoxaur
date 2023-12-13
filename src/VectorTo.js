export default class VectorTo {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  duplicate() {
    return new VectorTo(this.x, this.y);
  }
}
