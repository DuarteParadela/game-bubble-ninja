import { Player } from "./player.js";
import { WIDTH, HEIGHT, ctx, canvas } from "./world.js";
import { Bubble } from "./bubbles.js";

// Variables dx et dy gèrent la vitesse de déplacement de l'élément dans le canvas

// let bgImage = new Image();
// bgImage.src = "../images/bg2.gif";

let counter = 0;
setInterval(function () {
  counter++;
}, 100);

setInterval(function () {
  createNewBubble();
}, 3700);

setInterval(function () {
  removeBubble();
}, 5000);

let bubbleArray = [];

function createNewBubble() {
  let radius = 50;
  let x = radius + Math.random() * (WIDTH - radius * 2);
  let y = radius + Math.random() * (HEIGHT / 2);
  let dx = 5;
  let dy = 5;
  bubbleArray.push(new Bubble(x, y, dx, dy, radius));
}

function removeBubble() {
  if (bubbleArray.length > 5) {
    bubbleArray.shift();
  }
}

// function init() {
//   for (let i = 0; i < 1; i++) {
//     let radius = 50;
//     createNewBubble();
//   }
// }

let player = new Player(WIDTH / 2, HEIGHT - 40);

function getDistance(xpos1, ypos1, xpos2, ypos2) {
  let result = Math.sqrt(
    Math.pow(xpos2 - xpos1, 2) + Math.pow(ypos2 - ypos1, 2)
  );
  return result;
}

function checkCollision(player, bubble) {
  let distance = getDistance(player.x, player.y, bubble.x, bubble.y);
  if (distance < bubble.radius + player.radius) {
    alert(
      `GAME OVER.\nYou scored ${counter} points\n ${bubbleArray.length} bubbles were flying around`
    );
    cancelAnimationFrame(request);
    document.location.reload();
  }
}

let request;

// function background() {
//   ctx.drawImage(bgImage, 0, 0, WIDTH, HEIGHT);
// }

function drawScores(text, x, y) {
  ctx.font = "30px Arial";
  ctx.strokeStyle = "White";
  ctx.lineWidth = 5;
  ctx.strokeText(text, x, y);
  ctx.fillStyle = "black";
  ctx.fillText(text, x, y);
}

function animate() {
  request = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // background();
  drawScores(`Score: ${counter}`, 30, 50);
  drawScores(`Number of bubbles: ${bubbleArray.length}`, 970, 50);
  bubbleArray.forEach((bubble) => {
    bubble.update();
    checkCollision(player, bubble);
  });
  player.update();
}

animate();
// init();

function keyDown(event) {
  switch (event.keyCode) {
    case 37:
      player.state.leftKeyPressed = true;
      break;
    case 39:
      player.state.rightKeyPressed = true;
      break;
  }
}

function keyUp(event) {
  switch (event.keyCode) {
    case 37:
      player.state.leftKeyPressed = false;
      break;
    case 39:
      player.state.rightKeyPressed = false;
      break;
  }
}

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
