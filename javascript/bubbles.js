import { WIDTH, HEIGHT, ctx } from "./world.js";

let bubble = new Image();

bubble.src = "../images/bubble.png";

export class Bubble {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.image = bubble;
  }

  draw() {
    if (!bubble.complete) {
      return;
    }
    ctx.drawImage(
      this.image,
      this.x - this.radius,
      this.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
  }

  update() {
    if (this.x + this.radius > WIDTH || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > HEIGHT || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}
