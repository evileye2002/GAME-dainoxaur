function animations(rootFrame = 0, n = 6, directionRight = true) {
  const durations = {
    6: 500,
    5: 400,
    4: 500,
    3: 500,
  };

  const frames = [];

  const duration = durations[n];
  for (let i = 0; i < n; i++) {
    frames.push({
      time: i * (duration / n),
      frame: directionRight ? rootFrame + i : rootFrame - i,
    });
  }

  return { duration, frames };
}

function stopAnimations(rootFrame = 0) {
  return {
    duration: 400,
    frames: [
      {
        time: 0,
        frame: rootFrame,
      },
    ],
  };
}

export const MOVE_RIGHT = animations(0);
export const DEAD = stopAnimations(24);
export const MOVE_LEFT = animations(11, 6, false);
export const JUMP = stopAnimations(20);
export const FALLING = stopAnimations(18);
export const STANDING = stopAnimations(6);
