import Animations from "../src/Animations.js";
import FrameIndexPattern from "../src/FrameIndexPattern.js";
import GameLoop from "../src/GameLoop.js";
import { gridCells } from "../src/gridCells.js";
import Process from "../src/Process.js";
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
  PLAY_HOLD,
  PLAY_IDLE,
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
  icons: "/games/dino_jump/sprites/GUI/IconButtons.png",
  textButtons: "/games/dino_jump/sprites/GUI/TextButtons.png",
  boxs: "/games/dino_jump/sprites/GUI/Boxs.png",
  gameOverTitle: "/games/dino_jump/sprites/GUI/GameOver.png",
};
const resourceClass = new Resources(resources);
//#endregion

const process = new Process("dino_jump", {
  highScore: 0,
  jumpKey: "ArrowUp",
  isDrawBackground: true,
});
let saveFile = process.getSaveFile();
HIGH_SCORE = saveFile.highScore;

//#region GUI
const score = document.getElementById("score");

const menuStartCanvas = document.getElementById("canvas-start");
const ctxMenuStart = menuStartCanvas.getContext("2d");
const menuStart = new Sprite({
  resource: resourceClass.images.textButtons,
  frameSize: new VectorTo(64, 32),
  rows: 3,
  columns: 3,
  frame: 7,
  animation: new Animations({
    playIdle: new FrameIndexPattern(PLAY_IDLE),
    playHold: new FrameIndexPattern(PLAY_HOLD),
  }),
});
menuStartCanvas.addEventListener("mousedown", () => {
  menuStart.animation.play("playHold");
});
menuStartCanvas.addEventListener("mouseup", (e) => {
  menuStart.frame = 1;
  reset(e);
});

const divGameOver = document.querySelector(".menu.menu-game-over");
const menuGameOverCanvas = document.getElementById("canvas-game-over");
const ctxMenuGameOver = menuGameOverCanvas.getContext("2d");
const menuGameOver = new Sprite({
  resource: resourceClass.images.boxs,
  frameSize: new VectorTo(194, 144),
  rows: 1,
  columns: 2,
  frame: 0,
});

const txtGameOverCanvas = document.getElementById("canvas-game-over-title");
const ctxTxtGameOver = txtGameOverCanvas.getContext("2d");
const txtGameOver = new Sprite({
  resource: resourceClass.images.gameOverTitle,
  frameSize: new VectorTo(194, 144),
  rows: 1,
  columns: 2,
  frame: 0,
});

const btnRestartCanvas = document.getElementById("canvas-restart");
const ctxBtnRestart = btnRestartCanvas.getContext("2d");
const btnRestart = new Sprite({
  resource: resourceClass.images.icons,
  frameSize: new VectorTo(32, 32),
  rows: 10,
  columns: 10,
  frame: 98,
});

btnRestartCanvas.addEventListener("mousedown", () => {
  btnRestart.frame = 99;
});
btnRestartCanvas.addEventListener("mouseup", (e) => {
  btnRestart.frame = 98;
  reset(e);
});

const btnSettingCanvas = document.getElementById("canvas-setting");
const ctxBtnSetting = btnSettingCanvas.getContext("2d");
const btnSetting = new Sprite({
  resource: resourceClass.images.icons,
  frameSize: new VectorTo(32, 32),
  rows: 10,
  columns: 10,
  frame: 18,
});
btnSettingCanvas.addEventListener("mousedown", () => {
  btnSetting.frame = 19;
});
btnSettingCanvas.addEventListener("mouseup", () => {
  btnSetting.frame = 18;
});
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
  position: new VectorTo(0, -8),
  scale: 0.6,
});
const ground = new Sprite({
  resource: resourceClass.images.ground,
  frameSize: new VectorTo(600, 300),
  position: new VectorTo(0, 50),
  scale: 0.4,
});
const bush = new Sprite({
  resource: resourceClass.images.bush,
  frameSize: new VectorTo(600, 300),
  position: new VectorTo(0, 60),
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
  position: new VectorTo(gridCells(0), gridCells(9)),
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

  //Menu
  menuStart.drawImage(ctxMenuStart, 0, 0);

  if (saveFile.isDrawBackground) {
    //Sky
    sky.drawImage(ctx, sky.position.x, sky.position.y);
    sky.drawImage(ctx, sky.position.x + 340, sky.position.y);
    sky.drawImage(ctx, sky.position.x + 680, sky.position.y);

    //Grass
    grass.drawImage(ctx, grass.position.x, grass.position.y);
    grass.drawImage(ctx, grass.position.x + 346, grass.position.y);
    grass.drawImage(ctx, grass.position.x + 692, grass.position.y);
  }

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
    menuStartCanvas.classList.add("invisible");
  }

  //Bush
  bush.drawImage(ctx, bush.position.x, bush.position.y);
  bush.drawImage(ctx, bush.position.x + 230, bush.position.y);
  bush.drawImage(ctx, bush.position.x + 460, bush.position.y);

  if (isGameOver || isWatingToStart) {
    btnSetting.drawImage(ctxBtnSetting, 0, 0);
    btnRestart.drawImage(ctxBtnRestart, 0, 0);
    btnSettingCanvas.classList.remove("invisible");
  } else {
    btnSettingCanvas.classList.add("invisible");
  }
};

const update = (delta) => {
  if (isGameOver) {
    dino.frame = 27;

    setReset();
  }
  if (isGameOver || isWatingToStart) {
    menuStart.step(delta);
    return;
  }

  SCORE += delta * 0.01;
  score.textContent = String(Math.floor(SCORE)).padStart(4, "0");
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
  ground.position.x -= 2 + GAME_SPEED;
  if (ground.position.x < -230) {
    ground.position.x = ground.position.x + 230;
  }

  //Bush
  bush.position.x -= 2 + GAME_SPEED;
  if (bush.position.x < -230) {
    bush.position.x = bush.position.x + 230;
  }

  isGameOver = updateEnemies(dino, enemies);
  if (isGameOver) {
    //Update high score
    if (Math.floor(SCORE) > HIGH_SCORE) {
      saveFile.highScore = Math.floor(SCORE);
      process.save(saveFile);
    }

    menuGameOver.drawImage(ctxMenuGameOver, 0, 0);
    menuGameOverCanvas.classList.remove("invisible");
    divGameOver.classList.remove("invisible");
    txtGameOver.drawImage(ctxTxtGameOver, 0, 0);
  }

  action(delta, dino, dinoDestinationPos);
  dino.step(delta);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();

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
  if (e.type !== "touchstart" && e.type !== "mouseup" && e.code !== "ArrowUp") {
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
  // menuGameOverCanvas.classList.add("invisible");
  divGameOver.classList.add("invisible");

  for (let i = 0; i < 5; i++) {
    enemies.push(
      new Sprite({
        resource: resourceClass.images.enemy_left,
        frameSize: new VectorTo(24, 24),
        rows: 7,
        columns: 6,
        frame: 0,
        position: new VectorTo(gridCells(22), gridCells(9)),
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
  }
  if (2000 / Math.floor(SCORE) == 1) {
    GAME_SPEED = GAME_SPEED_INCREMENT * 2;
  }

  if (3500 / Math.floor(SCORE) == 1) {
    GAME_SPEED = GAME_SPEED_INCREMENT * 3;
  }

  if (5000 / Math.floor(SCORE) == 1) {
    GAME_SPEED = GAME_SPEED_INCREMENT * 4;
  }
}
//#endregion

window.addEventListener("keydown", reset);
window.addEventListener("touchstart", reset);
