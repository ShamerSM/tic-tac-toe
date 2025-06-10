window.addEventListener("DOMContentLoaded", () => {
  const resultText = document.getElementById("resultText");
  const resultBox = document.getElementById("result");
  const playAgainButton = document.getElementById("play-again");

  const clickSound = document.getElementById("clickSound");
  const moveSound = document.getElementById("moveSound");
  const winSound = document.getElementById("winSound");
  const drawSound = document.getElementById("drawSound");

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

    const cells = document.querySelectorAll("[data-cell]");
    cells.forEach((cell) => {
      const newCell = cell.cloneNode(true);
      newCell.textContent = "";
      newCell.className = "cell";
      cell.parentNode.replaceChild(newCell, cell);
    });

    const freshCells = document.querySelectorAll("[data-cell]");
    freshCells.forEach((cell) => {
      cell.addEventListener("click", handleClick, { once: true });
    });
  }

  function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? "X" : "O";
    cell.textContent = currentClass;
    cell.classList.add(currentClass);

    // 🔊 Move sound
    moveSound?.play().catch(() => {});

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
      drawSound?.play().catch(() => {});
    } else {
      resultText.textContent = `${isXTurn ? "X" : "O"} Wins!`;
      winSound?.play().catch(() => {});
    }
    resultBox.classList.remove("hide");
  }

  function checkWin(currentClass) {
    const cells = document.querySelectorAll("[data-cell]");
    return WINNING_COMBINATIONS.some((combo) =>
      combo.every((i) => cells[i].classList.contains(currentClass))
    );
  }

  function isDraw() {
    const cells = document.querySelectorAll("[data-cell]");
    return [...cells].every((cell) =>
      cell.classList.contains("X") || cell.classList.contains("O")
    );
  }

  playAgainButton.addEventListener("click", () => {
    clickSound?.play().catch(() => {});
    startGame();
  });

  startGame();
});
