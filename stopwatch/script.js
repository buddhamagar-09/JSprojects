let hour = 0;
let min = 0;
let sec = 0;
let ms = 0;
let timer = null;
let isRunning = false;

const time_display = document.querySelector("#time_display");
let start_stop = document.querySelector("#stop_startbtn");
let reset = document.querySelector("#resetbtn");
reset.textContent = "Reset";
start_stop.textContent = "Start";
time_display.textContent = "00:00:00:00";

function updateTime() {
  ms += 10;
  if (ms == 1000) {
    sec++;
    ms = 0;
  }
  if (sec == 60) {
    sec = 0;
    min++;
  }
  if (min == 60) {
    min = 0;
    hour++;
  }
  let h = hour < 10 ? "0" + hour : hour;
  let m = min < 10 ? "0" + min : min;
  let s = sec < 10 ? "0" + sec : sec;
  let milisec = Math.floor(ms / 10);
  milisec = milisec < 10 ? "0" + milisec : milisec;
  time_display.textContent = `${h}:${m}:${s}:${milisec}`;
}

start_stop.addEventListener("click", () => {
  if (!isRunning) {
    timer = setInterval(updateTime, 10);
    start_stop.textContent = "Stop";
    isRunning = true;
  } else {
    clearInterval(timer);
    start_stop.textContent = "Start";
    isRunning = false;
  }
});

reset.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  hour = 0;
  min = 0;
  sec = 0;
  time_display.textContent = "00:00:00:00";
  start_stop.textContent = "Start";
  isRunning = false;
});

