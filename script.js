const scene = document.getElementById("scene");
const sceneFade = document.getElementById("sceneFade");
const video = document.getElementById("finalVideo");
const powerBtn = document.getElementById("powerBtn");
const clickSound = document.getElementById("clickSound");
const music = document.getElementById("music");

const START_FRAME = "assets/frame-00.jpg";
const REVERSE_HOLD = 300; 
const FADE_TIME = 800; 
const MUSIC_FRAME = "assets/frame-06.jpg"; 

const frames = [
  { src: "assets/frame-01.jpg", hold: 400 },
  { src: "assets/frame-02.jpg", hold: 400 },
  { src: "assets/frame-03.jpg", hold: 400 },
  { src: "assets/frame-04.jpg", hold: 400 },
  { src: "assets/frame-05.jpg", hold: 400 },
  { src: "assets/frame-06.jpg", hold: 900 },
  { src: "assets/frame-07.jpg", hold: 700 },
  { src: "assets/frame-08.jpg", hold: 700 },
  { src: "assets/frame-09.jpg", hold: 700 }
];

let isOn = false;

const FRAME_FADE = 250; 

function showFrame(src) {
  sceneFade.src = src;
  sceneFade.classList.add("show");
  setTimeout(() => {
    scene.src = src;
    sceneFade.classList.remove("show");
  }, FRAME_FADE);
}

function turnOn() {
  powerBtn.disabled = true;
  powerBtn.setAttribute("aria-checked", "true");

  let time = 0;
  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    setTimeout(() => {
      showFrame(frame.src);
      if (frame.src === MUSIC_FRAME) {
        music.currentTime = 0;
        music.play().catch(() => {});
      }
    }, time);
    time += frame.hold;
  }

  setTimeout(() => {
    video.classList.add("show");
    video.currentTime = 0;
    video.play().catch(() => {});
    powerBtn.disabled = false;
    isOn = true;
  }, time);
}

function turnOff() {
  powerBtn.disabled = true;
  powerBtn.setAttribute("aria-checked", "false");
  isOn = false;

  video.classList.remove("show"); 
  music.pause();
  music.currentTime = 0;

  setTimeout(() => {
    video.pause();
  }, FADE_TIME);

  let time = FADE_TIME;
  for (let i = frames.length - 2; i >= 0; i--) {
    setTimeout(() => {
      showFrame(frames[i].src);
    }, time);
    time += REVERSE_HOLD;
  }

  setTimeout(() => {
    showFrame(START_FRAME);
  }, time);

  setTimeout(() => {
    powerBtn.disabled = false;
  }, time + FRAME_FADE);
}

powerBtn.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});

  if (isOn) {
    turnOff();
  } else {
    turnOn();
  }
});