import VectorTo from "../VectorTo.js";
import { gridCells } from "../gridCells.js";
import { moveTowards } from "../moveTowards.js";

const ENEMY_INTERVAL_MIN = 2000;
const ENEMY_INTERVAL_MAX = 2500;
let ENEMY_NEXT_INTERVAL = 0;
const destinationPos = new VectorTo(gridCells(-2), gridCells(8));

function getRamdomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setNextEnemyTime() {
  const num = getRamdomNumber(ENEMY_INTERVAL_MIN, ENEMY_INTERVAL_MAX);
  ENEMY_NEXT_INTERVAL = num;
}

function drawEnemy(ctx, enemies, detta) {
  enemies.forEach((enemy) => {
    const enemyOfSet = new VectorTo(8, 0);
    const enemyPosX = enemy.position.x + enemyOfSet.x;
    const enemyPosY = enemy.position.y + enemyOfSet.y;

    if (enemy.position.x > destinationPos.x) {
      moveTowards(enemy, destinationPos, 2);
      enemy.drawImage(ctx, enemyPosX, enemyPosY);
    } else {
      if (ENEMY_NEXT_INTERVAL < 0) {
        enemy.position.x = 300;
        setNextEnemyTime();
      }
      ENEMY_NEXT_INTERVAL -= detta;
    }
    enemy.step(detta);
  });
}

export { getRamdomNumber, drawEnemy };
