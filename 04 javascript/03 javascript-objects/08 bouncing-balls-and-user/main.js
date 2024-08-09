// setup canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.color = "white";
    this.size = 10;
    this.keys = new Set();
  }

  move() {
    for (const key of this.keys) {
      switch (key) {
        case "a":
          this.x -= this.velX;
          break;
        case "d":
          this.x += this.velX;
          break;
        case "w":
          this.y -= this.velY;
          break;
        case "s":
          this.y += this.velY;
          break;
      }
    }
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    if ((this.x + this.size) >= width) {
      this.x -= this.size;
    }

    if ((this.x - this.size) <= 0) {
      this.x += this.size;
    }

    if ((this.y + this.size) >= height) {
      this.y -= this.size;
    }

    if ((this.y - this.size) <= 0) {
      this.y += this.size;
    }
  }

  collisionDetect(balls) {
    for (const ball of balls) {
      const dx = this.x - ball.x;
      const dy = this.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const hasCollision = distance < this.size + ball.size;

      if (hasCollision) {
        ball.exists = false;
        this.size += ball.size / 10;
        this.velX = 20 / (this.size / 10);
        this.velY = 20 / (this.size / 10);
      }
    }
  }
}

class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true;
    this.cwith = new Map();
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  velExchange(ball) {
    const x_1 = [this.x, this.y];
    const x_2 = [ball.x, ball.y];

    const v_1 = [this.velX, this.velY];
    const v_2 = [ball.velX, ball.velY];

    const m_1 = this.size ** 3;
    const m_2 = ball.size ** 3;

    [this.velX, this.velY] = ptdiff(
      v_1,
      scale(
        (2 * m_2) / (m_1 + m_2)
        *
        dot(
          ptdiff(v_1, v_2),
          ptdiff(x_1, x_2))
        /
        dot(
          ptdiff(x_1, x_2),
          ptdiff(x_1, x_2)),
        ptdiff(x_1, x_2)));

    [ball.velX, ball.velY] = ptdiff(
      v_2,
      scale(
        (2 * m_1) / (m_1 + m_2)
        *
        dot(
          ptdiff(v_2, v_1),
          ptdiff(x_2, x_1))
        /
        dot(
          ptdiff(x_2, x_1),
          ptdiff(x_2, x_1)),
        ptdiff(x_2, x_1)));
  }

  collisionDetect(balls) {
    for (const ball of balls) {
      if (this !== ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const hasCollision = distance < this.size + ball.size;

        if (hasCollision && !this.cwith.get(ball)) {
          this.cwith.set(ball, true);
          ball.cwith.set(this, true);
          this.velExchange(ball);
          ball.color = this.color = randomRGB();
        } else if (!hasCollision) {
          this.cwith.delete(ball);
          ball.cwith.delete(this);
        }
      }
    }
  }
}


function ptdiff([a, b], [c, d]) {
  return [a - c, b - d];
}

function scale(a, [x, y]) {
  return [a * x, a * y];
}

function dot([a, b], [c, d]) {
  return a * c + b * d;
}

function startGame() {
  const start = Date.now();

  ctx.fillStyle = "rgb(0 0 0 / 100%)";
  ctx.fillRect(0, 0, width, height);


  const user = new EvilCircle(0, 0);
  user.x = random(user.size, width - user.size);
  user.y = random(user.size, height - user.size);

  const balls = [];

  while (balls.length < 25) {
    const size = random(10, 20);
    const ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomRGB(),
      size
    );

    balls.push(ball);
  }

  const controller = new AbortController();

  window.addEventListener("keydown", e => 
    {
      user.keys.add(e.key);
    },
    {signal: controller.signal}
  );

  window.addEventListener("keyup", e => {
    user.keys.delete(e.key);
  },
    {signal: controller.signal}
  );

  const counter = document.querySelector(".counter");

  function loop() {
    const remaining = balls.filter(x => x.exists);
    counter.textContent = `Ball count: ${remaining.length}`;

    ctx.fillStyle = "rgb(0 0 0 / 25%)";
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls.filter(x => x.exists)) {
      ball.draw();
      ball.update();
      ball.collisionDetect(remaining);
    }

    user.draw();
    user.move();
    user.checkBounds();
    user.collisionDetect(remaining);

    
    if (remaining.length) { 
      requestAnimationFrame(loop);
    } else {
      endGame();
    }
  }

  function endGame() {
    controller.abort();

    ctx.fillStyle = "rgb(0 0 0 / 100%)";
    ctx.fillRect(0, 0, width, height);

    const results = document.createElement("div");
    results.classList.add("results");
    
    const header = document.createElement("h2");
    header.textContent = "Game Over";

    const time = document.createElement("p");
    const seconds = Math.floor((Date.now() - start) / 1000);
    time.textContent = `time: ${seconds}s`;
   
    const button = document.createElement("button");
    button.textContent = "restart";
    button.addEventListener("click", () => {
      results.remove();
      startGame()
    });

    results.appendChild(header);
    results.appendChild(time);
    results.appendChild(button);

    document.body.appendChild(results);
  }

  loop();
}

startGame();
