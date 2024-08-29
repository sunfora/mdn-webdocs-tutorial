const media = document.querySelector("video");
const controls = document.querySelector(".controls");

const play = document.querySelector(".play");
const stop = document.querySelector(".stop");
const rwd = document.querySelector(".rwd");
const fwd = document.querySelector(".fwd");

const timerWrapper = document.querySelector(".timer");
const timer = document.querySelector(".timer span");
const timerBar = document.querySelector(".timer div");

media.removeAttribute("controls");
controls.style.visibility = "visible";

play.addEventListener("click", playPauseMedia);

timer.addEventListener("mouseover", () => {
  timer.classList.add("can-copy");
});

timer.addEventListener("click", () => {
  if (timer.classList.contains("can-copy")) {
    navigator.clipboard.writeText(timer.textContent);
    timer.classList.remove("can-copy");
  }
});

const Icons = {
  PLAY: "P",
  PAUSE: "u"
};

function setIcon(element, icon) {
  element.setAttribute("data-icon", Icons[icon]);
}

function playMedia() {
  media.play();
  setIcon(play, "PAUSE");
}

function pauseMedia() {
  media.pause();
  setIcon(play, "PLAY");
}

function playPauseMedia() {
  if (media.paused) {
    playMedia();
  } else {
    pauseMedia();
  }
}

stop.addEventListener("click", stopMedia);
media.addEventListener("ended", stopMedia);

function stopMedia() {
  media.pause();
  media.currentTime = 0;
  setIcon(play, "PLAY");
}

document.addEventListener("mousedown", startContinious);
document.addEventListener("touchstart", startContinious);

document.addEventListener("mouseup", stopContinious);
document.addEventListener("touchend", stopContinious);

let continiousControls = [];

function stopContinious(event) {
  for (const control of continiousControls) {
    if (control.active) {
      control.stop(event);
    }
  }
}

function startContinious(event) {
  stopContinious();
  for (const control of continiousControls) {
    if (   control.targets?.includes(event.target)
        || control.elem === event.target) {
      control.start(event);
      break;
    }
  }
}

class Mover {
  active = false;
  speed = 200;

  constructor(elem) {
    this.elem = elem;
  }

  startAction() {
    if (!this.active) {
      this.active = true;
      this.elem.classList.add("active");
      this.interval = setInterval(() => this.action(), this.speed);
    }
  }

  stopAction() {
    if (this.active) {
      this.active = false;
      clearInterval(this.interval);
      this.elem.classList.remove("active");
    }
  }

  stop() {
    this.stopAction();
    playMedia();
  }

  start() {
    pauseMedia();
    this.startAction();
  }
}

const STEP = 5;

const forward = new Mover(fwd);
forward.action = function () {
  if (media.currentTime >= media.duration - STEP) {
    this.stopAction();
    stopMedia();
  } else {
    media.currentTime += STEP;
  }
}

const backward = new Mover(rwd);
backward.action = function () {
  if (media.currentTime <= STEP) {
    this.stopAction();
    stopMedia();
  } else {
    media.currentTime -= STEP;
  }
}

continiousControls.push(forward);
continiousControls.push(backward);


media.addEventListener("timeupdate", setTime);

function setTime() {
  /* seconds in hour */
  const sih = 60 * 60;
  /* seconds in minute */
  const sim = 60;

  const hours = Math.floor(media.currentTime / sih);
  const withoutHours = media.currentTime - hours * sih;

  const minutes = Math.floor(withoutHours / sim);
  const withoutMinutes = withoutHours - minutes * sim;

  const seconds = Math.floor(withoutMinutes);

  const minuteValue = minutes.toString().padStart(2, "0");
  const secondValue = seconds.toString().padStart(2, "0");
  
  if (hours > 0) {
    timer.textContent = `${hours}:${minuteValue}:${secondValue}`;
  } else {
    timer.textContent = `${minuteValue}:${secondValue}`;
  }

  const barLength =
    timerWrapper.clientWidth * (media.currentTime / media.duration);
  timerBar.style.width = `${barLength}px`;
}

const timerBarMover = {
  elem: timerWrapper,
  targets: [timerWrapper, timerBar],
  active: false,
  controller: null,

  start(event) {
    if (!this.active) {
      this.active = true;
      pauseMedia();
      this.controller = new AbortController();
      this.action(event);
      document.addEventListener(
        "mousemove", (e) => this.action(e), {signal: this.controller.signal}
      );
      document.addEventListener(
        "touchmove", (e) => this.action(e), {signal: this.controller.signal}
      );
    }
  },

  stop() {
    if (this.active) {
      this.active = false;
      this.controller.abort();
      this.controller = null;
      playMedia();
    }
  },

  action(event) {
    const width = this.elem.getBoundingClientRect().width;
    const x = this.elem.getBoundingClientRect().x;
    const perc = Math.min(Math.max(0, (event.clientX - x) / width), 1);
    media.currentTime = perc * media.duration;
    timerBar.style.width = `${width * perc}px`;
  }
}

continiousControls.push(timerBarMover);
