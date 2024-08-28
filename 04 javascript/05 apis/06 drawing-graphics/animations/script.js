const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgb(0,0,0)';
ctx.fillRect(0,0,width,height);

ctx.translate(width / 2, height / 2);

function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let length = 250;
let moveOffset = 20;

function drawTriangle(x, y, length) {
  ctx.moveTo(x, y);
  ctx.lineTo(x + length, y);
  const triHeight = (length / 2) * Math.tan(degToRad(60));
  ctx.lineTo(x + length / 2, y + triHeight);
  ctx.lineTo(x, y);
  ctx.fill();
}

for (let i = 0; i < length; i++) {
  ctx.fillStyle = `rgb(${255 - length} 0 ${255 - length} / 90%)`;
  ctx.beginPath();
  drawTriangle(moveOffset, moveOffset, length);
  length--;
  moveOffset += 1;
  ctx.rotate(degToRad(5));
}
