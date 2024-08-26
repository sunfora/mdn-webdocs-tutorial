var canvas = document.querySelector(".example");
var width = (canvas.width = window.innerWidth);
var height = (canvas.height = window.innerHeight);

var ctx = canvas.getContext("2d");

if (ctx === null) {
    throw Error("canvas 2d is not supported");
}

function clear(ctx) {
  ctx.fillStyle = "rgb(0 0 0)";
  ctx.fillRect(0, 0, width, height);
}

function drawRects(ctx) {
  ctx.fillStyle = "rgb(255 0 0)";
  ctx.fillRect(50, 50, 100, 150);

  ctx.fillStyle = "rgb(0 255 0)";
  ctx.fillRect(75, 75, 100, 100);

  ctx.fillStyle = "rgb(255 0 255 / 75%)";
  ctx.fillRect(25, 100, 175, 50);

  ctx.fillRect(200, 200, 50, 50);
  ctx.fillRect(200, 250, 50, 50);
  ctx.fillRect(200, 350, 50, 50);

  ctx.strokeStyle = "rgb(255 255 255)";
  ctx.lineWidth = 5;
  ctx.strokeRect(25, 25, 175, 200);
}

function drawPath(ctx) {
  ctx.strokeStyle = "rgb(255 0 0)";
  ctx.fillStyle = "rgb(255 0 0)";
  ctx.beginPath();
  ctx.moveTo(50, 50);
  // draw your path
  ctx.lineTo(50, 100);
  ctx.lineTo(100, 150);
  ctx.lineTo(150, 100);
  ctx.stroke();
  ctx.fill();
}

function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

function drawTriangle(ctx, x, y, angle, sideLength) {
  ctx.fillStyle = "rgb(255 0 0)";
  ctx.beginPath();
  ctx.moveTo(x, y);

  const radius = sideLength / Math.sqrt(3);
  
  const pointAtAngle = angle => {
    return {
      x: x + radius * Math.sin(degToRad(-angle)),
      y: y + radius * Math.cos(degToRad(-angle))
    };
  };

  const first  = pointAtAngle(angle); 
  const second = pointAtAngle(angle + 120); 
  const third  = pointAtAngle(angle + 240); 
  
  ctx.moveTo(first.x, first.y);
  ctx.lineTo(second.x, second.y);
  ctx.lineTo(third.x, third.y);
  ctx.lineTo(first.x, first.y);

  ctx.stroke();
  ctx.fill();
}

function drawCircles(ctx) {
  ctx.fillStyle = "rgb(0 0 255)";
  ctx.beginPath();
  ctx.arc(150, 106, 50, degToRad(0), degToRad(360), false);
  ctx.fill();

  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(200, 106, 50, degToRad(-45), degToRad(45), true);
  ctx.lineTo(200, 106);
  ctx.fill();
}

let angle = 1;

function loop() {
  clear(ctx);
  drawCircles(ctx);
  drawTriangle(ctx, 150, 106, angle, 50 * Math.sqrt(3));

  angle += 1;
  requestAnimationFrame(loop);
}

loop();
