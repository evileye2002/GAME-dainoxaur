export class ImputHandler {
  constructor(player) {
    this.lastKey = "";
    this.player = player;

    window.addEventListener("keydown", (e) => {
      if (
        e.code === this.player.jumpKey[0] ||
        e.code === this.player.jumpKey[1]
      ) {
        this.lastKey = "keydown-UP";
      }

      if (
        e.code === this.player.diveKey[0] ||
        e.code === this.player.diveKey[1]
      ) {
        this.lastKey = "keydown-DOWN";
      }
    });

    window.addEventListener("keyup", (e) => {
      if (
        e.code === this.player.jumpKey[0] ||
        e.code === this.player.jumpKey[1]
      ) {
        this.lastKey = "keyup-UP";
      }

      if (
        e.code === this.player.diveKey[0] ||
        e.code === this.player.diveKey[1]
      ) {
        this.lastKey = "keyup-DOWN";
      }
    });
  }
}
