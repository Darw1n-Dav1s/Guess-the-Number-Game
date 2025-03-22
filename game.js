function displayMessage(message) {
    document.querySelector(".message").textContent = message;
  }
  
  // Function to reset the game

  function resetGame() {
    secretNumber = Math.floor(Math.random() * 20) + 1;
    score = 20;
    displayMessage("Start guessing...");
    document.querySelector(".number").textContent = "?";
    document.querySelector(".guess").value = "";         // Reset the guess input field
    document.querySelector(".score").textContent = score;
    document.querySelector("body").style.backgroundColor = "#303030"; 
  }
  
  
  let secretNumber = Math.floor(Math.random() * 20) + 1;
  let score = 20;
  let highscore = 0;
  
  console.log(secretNumber);
  
  const checkBtn = document.querySelector(".check");
  
  checkBtn.addEventListener("click", () => {
    let guess = Number(document.querySelector(".guess").value);
  
    if (!guess) {
    
    } else if (secretNumber === guess) {
      document.querySelector("body").style.background = "#60b947"; 
      displayMessage("You guessed it right!");
      document.querySelector(".number").textContent = secretNumber;
      document.querySelector(".highscore").innerHTML = score;
    } else if (secretNumber > guess) {
      if (score > 0) {
        score = score - 1;
        document.querySelector(".score").textContent = score;
        displayMessage("Too low!");
      } else {
        displayMessage("You Lost!");
        document.querySelector("body").style.backgroundColor = "red";
        document.querySelector("h1").textContent = "Answer is:";
        document.querySelector(".number").textContent = secretNumber;
      }
    } else if (secretNumber < guess) {
      if (score > 0) {
        score = score - 1;
        document.querySelector(".score").textContent = score;
        displayMessage("Too High!");
      } else {
        displayMessage("You Lost!");
        document.querySelector("body").style.backgroundColor = "red";
        document.querySelector("h1").textContent = "Answer is:";
        document.querySelector(".number").textContent = secretNumber;
      }
    }
  });
  
 
  const againBtn = document.querySelector(".again"); 

  againBtn.addEventListener("click", () => {
    resetGame();
  });
  

  resetGame();
  
                                                                        