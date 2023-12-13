import Imput, { RIGHT, UP } from "./Imput.js";

let isJumpPressed = false;
let isJumpInProcess = false;
let isFalling = false;
let JUMP_HEIGHT = 80;
let GROUND = 128;
let JUMP_SPEED = 4;
let GRAVITY = 3;
let FLOAT_TIME = 105;

function onJumpPressed() {
  isJumpPressed = true;
}

function onJumpReleased() {
  isJumpPressed = false;
}

export function action(delta, dino) {
  if (isJumpPressed) isJumpInProcess = true;

  if (isJumpInProcess && !isFalling) {
    if (dino.position.y > JUMP_HEIGHT) {
      dino.position.y -= JUMP_SPEED;
      dino.animation.play("jump");
    } else {
      if (FLOAT_TIME < 0) {
        dino.animation.play("falling");
        isFalling = true;
        FLOAT_TIME = 105;
      } else {
        FLOAT_TIME -= delta;
      }
    }
  } else {
    if (dino.position.y < GROUND) {
      dino.position.y += GRAVITY;
    } else {
      dino.animation.play("moveRight");
      isFalling = false;
      isJumpInProcess = false;
    }
  }
}

const imput = new Imput(onJumpPressed, onJumpReleased);
