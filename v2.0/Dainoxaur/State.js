export const states = {
  WALKING: 0,
  JUMPING: 1,
  FALLING: 2,
  DIVING: 3,
  DYING: 4,
  BITE: 5,
};

export class State {
  constructor(state) {
    this.state = this.state;
  }
}

export class Walking extends State {
  constructor(player) {
    super("WALKING");
    this.player = player;
  }

  enter() {
    this.player.animation.play("walking");
  }

  handlerImput(imput) {
    if (imput === "keydown-UP") this.player.setState(states.JUMPING);
    else if (imput === "keydown-DOWN") this.player.setState(states.BITE);
  }
}

export class Jumping extends State {
  constructor(player) {
    super("JUMPING");
    this.player = player;
  }

  enter() {
    this.player.animation.play("jumping");
    if (this.player.onGround()) this.player.vY -= 6;
  }

  handlerImput(imput) {
    if (imput === "keydown-DOWN") this.player.setState(states.DIVING);
    else if (this.player.vY > 0) this.player.setState(states.FALLING);
  }
}

export class Falling extends State {
  constructor(player) {
    super("FALLING");
    this.player = player;
  }

  enter() {
    this.player.animation.play("falling");
  }

  handlerImput(imput) {
    if (imput === "keydown-DOWN") this.player.setState(states.DIVING);
    else if (this.player.onGround()) this.player.setState(states.WALKING);
  }
}

export class Diving extends State {
  constructor(player) {
    super("DIVING");
    this.player = player;
  }

  enter() {
    this.player.animation.play("diving");
    if (!this.player.onGround()) this.player.vY += 8;
  }

  handlerImput(imput) {
    if (this.player.onGround()) this.player.setState(states.WALKING);
  }
}

export class Dying extends State {
  constructor(player) {
    super("DYING");
    this.player = player;
  }

  enter() {
    this.player.animation.play("dying");
  }

  handlerImput(imput) {}
}

export class Biting extends State {
  constructor(player) {
    super("BITING");
    this.player = player;
  }

  enter() {
    this.player.animation.play("biting");
  }

  handlerImput(imput) {
    if (imput === "keyup-DOWN") this.player.setState(states.WALKING);
  }
}
