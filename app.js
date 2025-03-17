let gameseq = [];
let userseq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = 0; // To keep track of the highest score

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (!started) {
    console.log("game is started");
    started = true;

    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 150);
}

function levelUp() {
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * btns.length); // Fix: ensure all colors are included
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameseq.push(randColor);
  console.log(gameseq);
  btnFlash(randBtn); // Fix: renamed from gameflash to btnFlash
}

function checkAns(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length === gameseq.length) {
      setTimeout(levelUp, 1000); // Add some delay before leveling up
    }
  } else {
    if (level > highScore) {
      highScore = level; // Update high score if the current level is higher
    }
    h2.innerHTML = `Game Over! Your score was <b>${level}</b>. Highest score: <b>${highScore}</b> <br> Press any key to restart.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function (){
      document.querySelector("body").style.backgroundColor = "white";
    },150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  btnFlash(btn); // Fix: renamed from userflash to btnFlash

  let userColor = btn.getAttribute("id");
  userseq.push(userColor);

  checkAns(userseq.length - 1); // Check the user's answer after every button press
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset(){
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
}
