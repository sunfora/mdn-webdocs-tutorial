var canvas = document.querySelector(".example");
var width = (canvas.width = window.innerWidth);
var height = (canvas.height = window.innerHeight);
var ctx = canvas.getContext("2d");
if (ctx === null) {
    throw Error("canvas 2d is not supported");
}
ctx.fillStyle = "rgb(0 0 0)";
ctx.fillRect(0, 0, width, height);
