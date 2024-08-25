const canvas = document.querySelector(".example") as HTMLCanvasElement;
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const ctx = canvas.getContext("2d");

if (ctx === null) {
  throw Error("canvas 2d is not supported");
}

ctx.fillStyle = "rgb(0 0 0)";
ctx.fillRect(0, 0, width, height);



