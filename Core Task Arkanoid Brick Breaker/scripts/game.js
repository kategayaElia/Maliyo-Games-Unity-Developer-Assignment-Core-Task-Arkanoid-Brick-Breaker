// scripts/game.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let paddle, ball, bricks;
let gameRunning = false;
let soundManager = new SoundManager();
let currentLevel = 1;

function startGame(levelNumber) {
  currentLevel = levelNumber;
  paddle = new Paddle(canvas.width, canvas.height);
  ball = new Ball(canvas.width, canvas.height, soundManager);
  bricks = generateLevel(levelNumber);
  gameRunning = true;
  showStatus("");
  document.getElementById("endControls").style.display = "none";
  loop();
}

function loop() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  paddle.draw(ctx);
  ball.update(paddle, bricks, onGameOver);
  ball.draw(ctx);
  bricks.forEach(b => b.draw(ctx));

  if (bricks.every(b => b.destroyed)) {
    showStatus("YOU WIN!");
    soundManager.play("win");
    gameRunning = false;
    
    // Unlock next level
    if (currentLevel >= unlockedLevel && currentLevel < 50) {
      unlockedLevel = currentLevel + 1;
      localStorage.setItem('unlockedLevel', unlockedLevel);
      updateLevelButtons();
    }
    
    showEndControls();
  }

  requestAnimationFrame(loop);
}

function onGameOver() {
  showStatus("YOU LOSE!");
  gameRunning = false;
  showEndControls();
}

function showEndControls() {
  document.getElementById("endControls").style.display = "block";
  document.getElementById("levelInfo").innerText = "LEVEL " + currentLevel;
}

// Controls
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") paddle.moveLeft();
  if (e.key === "ArrowRight") paddle.moveRight();
});

// Front page Play button
document.getElementById("playBtn").onclick = () => {
  document.getElementById("frontPage").style.display = "none";
  document.getElementById("levelSelect").style.display = "block";
};

// Level unlock system
let unlockedLevel = parseInt(localStorage.getItem('unlockedLevel')) || 1;

function updateLevelButtons() {
  const buttons = levelsGrid.children;
  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];
    const levelNum = i + 1;
    
    if (levelNum <= unlockedLevel) {
      // Unlock this level
      btn.innerText = levelNum;
      btn.className = "levelBtn";
      btn.onclick = () => {
        document.getElementById("levelSelect").style.display = "none";
        document.getElementById("gameContainer").style.display = "block";
        startGame(levelNum);
      };
    }
  }
}

// Generate 50 level buttons dynamically
const levelsGrid = document.getElementById("levelsGrid");
for (let i = 1; i <= 50; i++) {
  let btn = document.createElement("button");
  
  if (i <= unlockedLevel) {
    // Unlocked level
    btn.innerText = i;
    btn.className = "levelBtn";
    btn.onclick = () => {
      document.getElementById("levelSelect").style.display = "none";
      document.getElementById("gameContainer").style.display = "block";
      startGame(i);
    };
  } else {
    // Locked level
    btn.innerText = "🔒";
    btn.className = "levelLocked";
    btn.onclick = null;
  }
  
  levelsGrid.appendChild(btn);
}

// End screen buttons
document.getElementById("Home").onclick = () => {
  document.getElementById("gameContainer").style.display = "none";
  document.getElementById("frontPage").style.display = "block";
};

document.getElementById("Levels").onclick = () => {
  document.getElementById("gameContainer").style.display = "none";
  document.getElementById("levelSelect").style.display = "block";
};

document.getElementById("restartBtn").onclick = () => {
  startGame(currentLevel);
};

// Sound toggles
document.getElementById("toggleSound").onclick = () => {
  soundManager.toggleSound();
};

document.getElementById("toggleMusic").onclick = () => {
  soundManager.toggleMusic();
};
