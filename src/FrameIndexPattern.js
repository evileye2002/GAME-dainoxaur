export default class FrameIndexPattern {
  constructor(animationConfig) {
    this.currentTime = 0;
    this.isPlay = true;
    this.animationConfig = animationConfig;
    this.duration = animationConfig.duration ?? 500;
  }

  get frame() {
    const { frames } = this.animationConfig;
    for (let i = frames.length - 1; i >= 0; i--) {
      if (this.currentTime >= frames[i].time) {
        return frames[i].frame;
      }
    }
  }

  step(delta) {
    if (this.isPlay) {
      this.currentTime += delta;
      if (this.currentTime >= this.duration) {
        this.currentTime = 0;
      }
    }
  }

  stop() {
    this.isPlay = false;
  }
}
