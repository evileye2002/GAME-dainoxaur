export class VectorTo {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  duplicate() {
    return new VectorTo(this.x, this.y);
  }
}

export class Resources {
  constructor(toLoadImages) {
    this.toLoadImages = toLoadImages;
    this.images = {};

    Object.keys(this.toLoadImages).forEach((key) => {
      const img = new Image();
      img.src = this.toLoadImages[key];
      this.images[key] = {
        image: img,
        isLoaded: false,
      };

      img.onload = () => {
        this.images[key].isLoaded = true;
      };
    });
  }
}

export const MOVE_LEFT = animation({
  rootFrame: 5,
  n: 6,
  duration: 400,
  directionRight: false,
});

export const MOVE_RIGHT = animation({
  rootFrame: 0,
  n: 6,
  duration: 400,
  directionRight: true,
});

export const JUMPING = animation({
  rootFrame: 38,
  n: 1,
  duration: 400,
  directionRight: true,
});

export const FALLING = animation({
  rootFrame: 18,
  n: 1,
  duration: 400,
  directionRight: true,
});

export const DIVING = animation({
  rootFrame: 9,
  n: 1,
  duration: 400,
  directionRight: true,
});

export const DYING = animation({
  rootFrame: 24,
  n: 1,
  duration: 400,
  directionRight: true,
});

export const BITING = animation({
  rootFrame: 6,
  n: 6,
  duration: 400,
  directionRight: true,
});

export function getRamdomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function animation(config) {
  const frames = [];

  if (config.n > 1) {
    for (let i = 0; i < config.n; i++) {
      frames.push({
        time: i * (config.duration / config.n),
        frame: config.directionRight
          ? config.rootFrame + i
          : config.rootFrame - i,
      });
    }
  } else {
    frames.push({
      time: 0,
      frame: config.rootFrame,
    });
  }

  return { duration: config.duration, frames };
}
