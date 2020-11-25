const canvas = document.querySelector("canvas");
let WIDTH = 1280;
let HEIGHT = 800;

// let WIDTH = window.innerWidth;
// let HEIGHT = window.innerHeight;

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

// class Chronometer {
//   constructor() {
//   this.currentTime = 0;
//   this.intervalId = 0;
//   }
//   this.intervalId = setInterval(() => {
//     this.currentTime++;
//   }, 1000)

//   getMinutes() {
//     return Math.floor(this.currentTime / 60);
//   };

//   getSeconds() {
//     return this.currentTime % 60;
//   };

//   twoDigitsNumber(time) {
//     if (time < 10) {
//       return '0'+time;
//     }
//     return time.toString();
//   };

//   resetClock() {
//     this.currentTime = 0;
//   };
// }
//   const chronometer = new Chronometer();

//   function printMinutes() {
//     const minutes = chronometer.getMinutes();
//     return chronometer.twoDigitsNumber(minutes);
//   }

//   function printSeconds() {
//     const seconds = chronometer.getSeconds();
//     return chronometer.twoDigitsNumber(seconds);
//   }

//   function printTime() {

//   }

let counter = 0;
setInterval(function () {
  counter++;
  document.getElementById("Score-point").textContent = counter;
}, 200);

setInterval(function () {
  createNewCircle();
}, 5000);

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 15;
    this.radius = 40;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = "red";
    ctx.stroke();
  }

  update() {
    if (state.leftKeyPressed) {
      this.x -= this.dx;
    }
    if (state.rightKeyPressed) {
      this.x += this.dx;
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

function createNewCircle() {
  let radius = 50;
  let x = Math.random() * (WIDTH - radius * 2) + radius;
  let y = Math.random() * (HEIGHT - radius * 2) + radius;
  let dx = 5;
  let dy = 5;
  circleArray.push(new Circle(x, y, dx, dy, radius));
}

// function init() {
//   for (let i = 0; i < 5; i++) {
//     let radius = 50;
//     let x = Math.random() * (WIDTH - radius * 2) + radius;
//     let y = Math.random() * (HEIGHT - radius * 2) + radius;
//     let dx = 5;
//     let dy = 5;
//     circleArray.push(new Circle(x, y, dx, dy, radius));
//   }
// }

let player = new Player(WIDTH / 2, HEIGHT - 40);

function getDistance(xpos1, ypos1, xpos2, ypos2) {
  let result = Math.sqrt(
    Math.pow(xpos2 - xpos1, 2) + Math.pow(ypos2 - ypos1, 2)
  );
  return result;
}

function checkCollision(player, circle) {
  let distance = getDistance(player.x, player.y, circle.x, circle.y);
  if (distance < circle.radius + player.radius) {
    alert(`GAME OVER.\nYou scored ${counter} points`);
    cancelAnimationFrame(request);
    document.location.reload();
    // console.log("hey");
  }
}

let request;

function animate() {
  request = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  circleArray.forEach((circle) => {
    circle.update();
    checkCollision(player, circle);
  });
  player.update();
}

// init();
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
