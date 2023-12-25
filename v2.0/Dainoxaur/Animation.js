export class Animation {
  constructor(patterns) {
    this.patterns = patterns;
    this.activeKey = Object.keys(this.patterns)[0];
  }

  get frame() {
    return this.patterns[this.activeKey].frame;
  }

  step(deltaTime) {
    this.patterns[this.activeKey].step(deltaTime);
  }

  play(key, startAtTime = 0) {
    if (this.activeKey === key) {
      return;
    }

    this.activeKey = key;
    this.patterns[this.activeKey].currentTime = startAtTime;
  }

  stop() {
    this.patterns[this.activeKey].stop();
  }
}

export class FramePattern {
  constructor(config) {
    this.currentTime = 0;
    this.isPlay = true;
    this.config = config;
    this.duration = config.duration ?? 500;
  }

  get frame() {
    const { frames } = this.config;
    for (let i = frames.length - 1; i >= 0; i--) {
      if (this.currentTime >= frames[i].time) {
        return frames[i].frame;
      }
    }
  }

  step(deltaTime) {
    if (this.isPlay) {
      this.currentTime += deltaTime;
      if (this.currentTime >= this.duration) {
        this.currentTime = 0;
      }
    }
  }

  stop() {
    this.isPlay = false;
  }
}
