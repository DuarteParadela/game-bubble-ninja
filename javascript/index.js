const canvas = document.querySelector("canvas");
let WIDTH = 1280;
let HEIGHT = 800;
// Règle la taille du canvas sur la taille de la fenêtre
canvas.width = WIDTH;
canvas.height = HEIGHT;

const ctx = canvas.getContext("2d");

let state = {
  rightKeyPressed: false,
  leftKeyPressed: false,
};
// Arc / Circle

// ctx.beginPath();
// ctx.arc(300, 300, 30, 0, Math.PI*2, false);
// ctx.strokeStyle = "blue";
// ctx.stroke();

// Fais apparaitre 3 cercles à une position random dans la fenêtre
// for (let i = 0; i<3; i++) {
//     let x = Math.random() * window.WIDTH;
//     let y = Math.random() * window.HEIGHT;
//     ctx.beginPath();
//     ctx.arc(x, y, 30, 0, Math.PI * 2, false);
//     ctx.strokeStyle = "blue";
//     ctx.stroke();
// }

//La multiplication par la taille du canvas permet de conserver cette valeur au sein du canva

// Variables dx et dy gèrent la vitesse de déplacement de l'élément dans le canvas

// Variable radius gèrent le diamètre de l'élément

// window.addEventListener("mousemove", function (event) {});

var img = new Image(); // Crée un nouvel élément Image
img.src = "../images/IDLE-RIGHT.png";

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 15;
    this.size = 40;
  }
  draw() {
    ctx.beginPath();
    ctx.drawImage(img, this.x, this.y, this.size, this.size);
    // ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.strokeStyle = "blue";
    ctx.stroke();
  }

  update() {
    if (state.leftKeyPressed) {
      this.x -= this.dx;
    }
    if (state.rightKeyPressed) {
      this.x += this.dx;
    }

    if (this.x + this.size > WIDTH) {
      this.x = WIDTH - this.size;
    }
    if (this.x < 0) {
      this.x = 0;
    }
    this.draw();
  }
}

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = "blue";
    ctx.stroke();
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

let circleArray = [];

for (let i = 0; i < 50; i++) {
  let radius = 50;
  let x = Math.random() * (WIDTH - radius * 2) + radius;
  let y = Math.random() * (HEIGHT - radius * 2) + radius;
  let dx = 5;
  let dy = 5;
  circleArray.push(new Circle(x, y, dx, dy, radius));
}

let player = new Player(WIDTH / 2, HEIGHT - 40);

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  circleArray.forEach((elem) => {
    elem.update();
  });
  player.update();
}

animate();

function keyDown(event) {
  switch (event.keyCode) {
    case 37:
      state.leftKeyPressed = true;
      break;
    case 39:
      state.rightKeyPressed = true;
      break;
  }
}

function keyUp(event) {
  switch (event.keyCode) {
    case 37:
      state.leftKeyPressed = false;
      break;
    case 39:
      state.rightKeyPressed = false;
      break;
  }
}

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
