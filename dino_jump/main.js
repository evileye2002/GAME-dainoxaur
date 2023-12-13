import Animations from "../Animations.js";
import FrameIndexPattern from "../FrameIndexPattern.js";
import GameLoop from "../GameLoop.js";
import { gridCells } from "../gridCells.js";
import { moveTowards } from "../moveTowards.js";
import Resources from "../Resources.js";
import Sprite from "../Sprites.js";
import VectorTo from "../VectorTo.js";
import { jump } from "./jumping.js";
import {
  FALLING,
  JUMP,
  MOVE_LEFT,
  MOVE_RIGHT,
  STANDING,
} from "./dinoAnimation.js";
import { drawEnemy } from "./enemy.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const resources = {
  dino_right: "/games/dino_jump/sprites/olaf_right.png",
  enemy_left: "/games/dino_jump/sprites/kira_left.png",
};
const resourceClass = new Resources(resources);
const dino = new Sprite({
  resource: resourceClass.images.dino_right,
  frameSize: new VectorTo(24, 24),
  rows: 7,
  columns: 6,
  frame: 0,
  position: new VectorTo(gridCells(0), gridCells(8)),
  animation: new Animations({
    moveRight: new FrameIndexPattern(MOVE_RIGHT),
    standing: new FrameIndexPattern(STANDING),
    jump: new FrameIndexPattern(JUMP),
    falling: new FrameIndexPattern(FALLING),
  }),
});
const dinoDestinationPos = dino.position.duplicate();
const enemies = [];
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

const draw = (delta) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const dinoOfSet = new VectorTo(5, 0);
  const dinoPosX = dino.position.x + dinoOfSet.x;
  const dinoPosY = dino.position.y + dinoOfSet.y;
  dino.drawImage(ctx, dinoPosX, dinoPosY);

  drawEnemy(ctx, enemies, delta);
};

const update = (delta) => {
  jump(delta, dino, dinoDestinationPos);

  dino.step(delta);
  //enemy.step(delta);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
