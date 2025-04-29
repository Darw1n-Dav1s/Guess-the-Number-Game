let secretNumber, score, highscore = 0, timer, timeLeft;
let highscores = JSON.parse(localStorage.getItem("highscores")) || [];

const gameContainer = document.getElementById("gameContainer");
const startScreen = document.getElementById("start-screen");

function displayMessage(msg) {
  document.querySelector(".message").textContent = msg;
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 60;
  document.getElementById("time").textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      displayMessage("Time's up! You lost.");
      document.body.style.backgroundColor = "red";
      document.querySelector(".number").textContent = secretNumber;
    }
  }, 1000);
}

function updateLeaderboard() {
  const leaderboard = document.getElementById("leaderboard");
  leaderboard.innerHTML = "";
  highscores.slice(0, 5).forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = `#${index + 1} - Score: ${entry.score}`;
    leaderboard.appendChild(li);
  });
}

function saveHighscore(newScore) {
  highscores.push({ score: newScore });
  highscores.sort((a, b) => b.score - a.score);
  highscores = highscores.slice(0, 5);
  localStorage.setItem("highscores", JSON.stringify(highscores));
}

function resetGame() {
  secretNumber = Math.floor(Math.random() * 20) + 1;
  score = 20;
  displayMessage("Start guessing...");
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector(".score").textContent = score;
  document.body.style.backgroundColor = "#121212";
  document.querySelector("h1").textContent = "Guess My Number";
  startTimer();
  updateLeaderboard();
}

document.querySelector(".check").addEventListener("click", () => {
  const guess = Number(document.querySelector(".guess").value);
  if (!guess) return;

  if (secretNumber === guess) {
    displayMessage("You guessed it right!");
    document.querySelector(".number").textContent = secretNumber;
    document.body.style.backgroundColor = "#60b947";
    clearInterval(timer);

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
      saveHighscore(score);
      updateLeaderboard();
    }
  } else {
    if (score > 1) {
      score--;
      document.querySelector(".score").textContent = score;
      displayMessage(guess < secretNumber ? "Too low!" : "Too high!");
    } else {
      displayMessage("You lost!");
      document.body.style.backgroundColor = "red";
      document.querySelector(".number").textContent = secretNumber;
      clearInterval(timer);
    }
  }
});

document.querySelector(".again").addEventListener("click", resetGame);

document.getElementById("startBtn").addEventListener("click", () => {
  startScreen.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  resetGame();
});
