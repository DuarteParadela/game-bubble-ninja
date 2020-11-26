import { WIDTH, ctx } from "./world.js";

let playerRight = new Image();

playerRight.src = "../images/kirby-right.png";

let playerLeft = new Image();
playerLeft.src = "../images/kirby-left.png";

export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 15;
    this.radius = 40;
    this.state = {
      rightKeyPressed: false,
      leftKeyPressed: false,
    };
    this.image = playerRight;
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.x - this.radius,
      this.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
  }

  update() {
    if (this.state.leftKeyPressed) {
      this.x -= this.dx;
      this.image = playerLeft;
    }
    if (this.state.rightKeyPressed) {
      this.x += this.dx;
      this.image = playerRight;
    }

    if (this.x + this.radius > WIDTH) {
      this.x = WIDTH - this.radius;
    }
    if (this.x < this.radius) {
      this.x = this.radius;
    }
    this.draw();
  }
}
