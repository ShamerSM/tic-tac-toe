const cells = document.querySelectorAll("[data-cell]");
const resultText = document.getElementById("resultText");
const resultBox = document.getElementById("result");
let isXTurn = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function startGame() {
  isXTurn = true;
  resultBox.classList.add("hide");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
    cell.addEventListener("click", handleClick, { once: true });
  });
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? "X" : "O";
  cell.textContent = currentClass;
  cell.classList.add(currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isXTurn = !isXTurn;
  }
}

function endGame(draw) {
  if (draw) {
    resultText.textContent = "It's a Draw!";
  } else {
    resultText.textContent = `${isXTurn ? "X" : "O"} Wins!`;
  }
  resultBox.classList.remove("hide");
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combo) =>
    combo.every((i) => cells[i].classList.contains(currentClass))
  );
}

function isDraw() {
  return [...cells].every((cell) => cell.classList.contains("X") || cell.classList.contains("O"));
}

// Start game when page loads
startGame();