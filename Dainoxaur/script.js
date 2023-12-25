import { Animation, FramePattern } from "./Animation.js";
import { Character2D } from "./Character2D.js";
import { Enemy } from "./Enemy.js";
import { Button } from "./GUI/Button.js";
import { MainMenu } from "./GUI/MainMenu.js";
import { GameObject } from "./GameObject.js";
import { ImputHandler } from "./ImputHandler.js";
import { Player } from "./Player.js";
import { Scene } from "./Scene.js";
import {
  BITING,
  DIVING,
  DYING,
  FALLING,
  JUMPING,
  MOVE_LEFT,
  MOVE_RIGHT,
  Resources,
  VectorTo,
  getRamdomNumber,
} from "./utils.js";

window.addEventListener("load", load);

function load() {
  const mainCanvas = document.getElementById("main-game");
  const mainCtx = mainCanvas.getContext("2d");
  mainCanvas.width = 320;
  mainCanvas.height = 180;

  const resource = new Resources({
    player: "olaf_right.png",
    enemy: "kira_left.png",
    menu: "GUI/box.png",
    icons: "GUI/icons.png",
  });

  const player = new Player({
    resource: resource.images.player,
    frameSize: new VectorTo(24, 24),
    rows: 7,
    columns: 6,
    frame: 0,
    position: new VectorTo(0 * 16 + 10, 11 * 16 - 22),
    jumpKey: ["ArrowUp", "Space"],
    diveKey: ["ArrowDown", "S"],
    animation: new Animation({
      walking: new FramePattern(MOVE_RIGHT),
      jumping: new FramePattern(JUMPING),
      falling: new FramePattern(FALLING),
      diving: new FramePattern(DIVING),
      dying: new FramePattern(DYING),
      biting: new FramePattern(BITING),
    }),
  });

  const mainScene = new Scene();
  mainScene.addObject(player);

  // Menu
  const menuGameOver = new MainMenu({
    background: resource.images.menu.image,
    title: "Game Over",
    body: `
    <ul>
      Score
      <li>0000</li>
    </ul>
    <ul>
      Hight Score
      <li>0000</li>
    </ul>`,
    footer: `
    <canvas id="btn-restart" class="btn-icon" width="32px" height="32px"</canvas>
    `,
  });
  menuGameOver.init(document.querySelector(".game-container"));

  const btnRestart = new Button({
    resource: resource.images.icons,
    frameSize: new VectorTo(32, 32),
    rows: 10,
    columns: 10,
    frame: 98,
    id: "btn-restart",
    stateFrame: {
      press: 99,
      release: 98,
    },
  });
  menuGameOver.addBtnIcon(
    document.getElementById("btn-restart").getContext("2d"),
    btnRestart
  );

  // Update
  let enemyInterval = 1500;
  let enemyTimer = 0;
  let speed = 0.13;
  function GameUpdate(deltaTime) {
    mainScene.objects = mainScene.objects.filter(
      (child) => !child.markedForDeletion
    );

    if (enemyTimer > enemyInterval) {
      mainScene.addObject(
        new Enemy(
          {
            resource: resource.images.enemy,
            frameSize: new VectorTo(24, 24),
            rows: 7,
            columns: 6,
            frame: 5,
            speed: speed > 0.3 ? 0.3 : (speed += 0.001),
            position: new VectorTo(22 * 16 + 10, 11 * 16 - 22),
            animation: new Animation({
              moveLeft: new FramePattern(MOVE_LEFT),
            }),
          },
          mainCanvas.width,
          mainCanvas.height
        )
      );
      enemyTimer = 0;
      enemyInterval = getRamdomNumber(1500 - 1500 * speed, 2500 - 2500 * speed);
    } else {
      enemyTimer += deltaTime;
    }

    mainScene.update(deltaTime);
    menuGameOver.update();

    menuGameOver.toggleDisable(true);
  }

  // GameLoop
  let lastTime = 0;
  function GameLoop(timestamp) {
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    mainScene.draw(mainCtx);
    menuGameOver.draw();
    GameUpdate(deltaTime);

    requestAnimationFrame(GameLoop);
  }
  GameLoop(0);
}
