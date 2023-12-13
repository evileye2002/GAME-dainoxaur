import Animations from "../src/Animations.js";
import FrameIndexPattern from "../src/FrameIndexPattern.js";
import GameLoop from "../src/GameLoop.js";
import { gridCells } from "../src/gridCells.js";
import Resources from "../src/Resources.js";
import Sprite from "../src/Sprites.js";
import VectorTo from "../src/VectorTo.js";
import { action } from "./action.js";
import {
  DEAD,
  FALLING,
  JUMP,
  MOVE_LEFT,
  MOVE_RIGHT,
  STANDING,
} from "./dinoAnimation.js";
import { drawEnemies, updateEnemies } from "./enemy.js";

//#region Fields
let isGameOver = false;
let isSetReset = false;
let isWatingToStart = true;
let SCORE = 0;
let HIGH_SCORE = 0;
let GAME_SPEED = 0;
const GAME_SPEED_INCREMENT = 0.5;
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const resources = {
  dino_right: "/games/dino_jump/sprites/olaf_right.png",
  enemy_left: "/games/dino_jump/sprites/kira_left.png",
  sky: "/games/dino_jump/sprites/sky.png",
  grass: "/games/dino_jump/sprites/grass.png",
  ground: "/games/dino_jump/sprites/ground.png",
  bush: "/games/dino_jump/sprites/bush.png",
};
const resourceClass = new Resources(resources);

//canvas.width = 600;
//#endregion

//#region Background
const sky = new Sprite({
  resource: resourceClass.images.sky,
  frameSize: new VectorTo(600, 300),
  position: new VectorTo(0, 0),
  scale: 0.6,
});
const grass = new Sprite({
  resource: resourceClass.images.grass,
  frameSize: new VectorTo(600, 300),
  position: new VectorTo(0, -12),
  scale: 0.6,
});
const ground = new Sprite({
  resource: resourceClass.images.ground,
  frameSize: new VectorTo(600, 300),
  position: new VectorTo(0, 38),
  scale: 0.4,
});
const bush = new Sprite({
  resource: resourceClass.images.bush,
  frameSize: new VectorTo(600, 300),
  position: new VectorTo(0, 40),
  scale: 0.4,
});
//#endregion

//#region  Character
const dino = new Sprite({
  resource: resourceClass.images.dino_right,
  frameSize: new VectorTo(24, 24),
  rows: 7,
  columns: 6,
  frame: 0,
  position: new VectorTo(gridCells(0), gridCells(8)),
  animation: new Animations({
    moveRight: new FrameIndexPattern(MOVE_RIGHT),
    jump: new FrameIndexPattern(JUMP),
    falling: new FrameIndexPattern(FALLING),
    dead: new FrameIndexPattern(DEAD),
    standing: new FrameIndexPattern(STANDING),
  }),
});
const dinoDestinationPos = dino.position.duplicate();
const enemies = [];
//#endregion

//#region Game
const draw = (delta) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Sky
  sky.drawImage(ctx, sky.position.x, sky.position.y);
  sky.drawImage(ctx, sky.position.x + 340, sky.position.y);
  sky.drawImage(ctx, sky.position.x + 680, sky.position.y);

  //Grass
  grass.drawImage(ctx, grass.position.x, grass.position.y);
  grass.drawImage(ctx, grass.position.x + 346, grass.position.y);
  grass.drawImage(ctx, grass.position.x + 692, grass.position.y);

  //Ground
  ground.drawImage(ctx, ground.position.x, ground.position.y);
  ground.drawImage(ctx, ground.position.x + 230, ground.position.y);
  ground.drawImage(ctx, ground.position.x + 460, ground.position.y);

  //Characters
  const dinoOfSet = new VectorTo(5, -22);
  const dinoPosX = dino.position.x + dinoOfSet.x;
  const dinoPosY = dino.position.y + dinoOfSet.y;
  dino.drawImage(ctx, dinoPosX, dinoPosY);

  if (!isGameOver && !isWatingToStart) {
    drawEnemies(ctx, enemies, delta, GAME_SPEED);
  }

  //Bush
  bush.drawImage(ctx, bush.position.x, bush.position.y);
  bush.drawImage(ctx, bush.position.x + 230, bush.position.y);
  bush.drawImage(ctx, bush.position.x + 460, bush.position.y);

  if (isGameOver) {
    // ctx.font = "40px Verdana";
    // ctx.fillStyle = "gray";
    // ctx.fillText("Game Over", canvas.width / 4.5, canvas.height / 2);
  }
};

const update = (delta) => {
  if (isGameOver) {
    dino.frame = 27;

    setReset();
  }
  if (isGameOver || isWatingToStart) return;

  SCORE += delta * 0.01;
  setGameSpeed();

  //Sky
  sky.position.x -= 0.5 + GAME_SPEED;
  if (sky.position.x < -340) {
    sky.position.x = sky.position.x + 340;
  }

  //Grass
  grass.position.x -= 0.5 + GAME_SPEED;
  if (grass.position.x < -346) {
    grass.position.x = grass.position.x + 346;
  }

  //Ground
  ground.position.x -= 1.5 + GAME_SPEED;
  if (ground.position.x < -230) {
    ground.position.x = ground.position.x + 230;
  }

  //Bush
  bush.position.x -= 1.5 + GAME_SPEED;
  if (bush.position.x < -230) {
    bush.position.x = bush.position.x + 230;
  }

  isGameOver = updateEnemies(dino, enemies);
  action(delta, dino, dinoDestinationPos);
  dino.step(delta);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
//#endregion

function setReset() {
  if (!isSetReset) {
    isSetReset = true;

    setTimeout(() => {
      window.addEventListener("keydown", reset);
      window.addEventListener("touchstart", reset);
    }, 1000);
  }
}

function reset(e) {
  if (e.type !== "touchstart" && e.code !== "ArrowUp") {
    return;
  }
  window.removeEventListener("keydown", reset);
  window.removeEventListener("touchstart", reset);

  isSetReset = false;
  isGameOver = false;
  isWatingToStart = false;
  SCORE = 0;
  GAME_SPEED = 0;
  enemies.splice(0, enemies.length);

  for (let i = 0; i < 3; i++) {
    enemies.push(
      new Sprite({
        resource: resourceClass.images.enemy_left,
        frameSize: new VectorTo(24, 24),
        rows: 7,
        columns: 6,
        frame: 0,
        position: new VectorTo(gridCells(18), gridCells(8)),
        animation: new Animations({
          moveLeft: new FrameIndexPattern(MOVE_LEFT),
          standing: new FrameIndexPattern(STANDING),
          jump: new FrameIndexPattern(JUMP),
        }),
      })
    );
  }
}

function setGameSpeed() {
  if (500 / Math.floor(SCORE) == 1) {
    GAME_SPEED = GAME_SPEED_INCREMENT * 1;
    console.log(GAME_SPEED);
  }
  if (2000 / Math.floor(SCORE) == 1) {
    GAME_SPEED = GAME_SPEED_INCREMENT * 2;
    console.log(GAME_SPEED);
  }

  if (3500 / Math.floor(SCORE) == 1) {
    GAME_SPEED = GAME_SPEED_INCREMENT * 3;
    console.log(GAME_SPEED);
  }

  if (5000 / Math.floor(SCORE) == 1) {
    GAME_SPEED = GAME_SPEED_INCREMENT * 4;
    console.log(GAME_SPEED);
  }
  if (6500 / Math.floor(SCORE) == 1) {
    GAME_SPEED = GAME_SPEED_INCREMENT * 5;
    console.log(GAME_SPEED);
  }
}

window.addEventListener("keydown", reset);
window.addEventListener("touchstart", reset);
