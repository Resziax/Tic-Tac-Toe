let currentPlayer = "X";

const cells = document.querySelectorAll("td");
cells.forEach((cell) => {
  cell.addEventListener("click", handleMove);
});

function handleMove(event) {
  console.log("handleMove called");
  const cell = event.target;
  if (cell.textContent !== "") {
    return;
  }
  cell.textContent = currentPlayer;
  console.log(`Placed ${currentPlayer} in cell ${cell.dataset.cellIndex}`);

  if (checkForWinner()) {
    displayMessage(`Player ${currentPlayer} wins!`);
    cells.forEach((cell) => {
      cell.removeEventListener("click", handleMove);
    });
  } else if (checkForTie()) {
    displayMessage("It's a tie!");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    console.log(`Switched to ${currentPlayer}`);
  }
}

function checkForWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < winningCombos.length; i++) {
    const combo = winningCombos[i];
    if (
      cells[combo[0]].textContent === currentPlayer &&
      cells[combo[1]].textContent === currentPlayer &&
      cells[combo[2]].textContent === currentPlayer
    ) {
      return true;
    }
  }
  return false;
}

function checkForTie() {
  const allCellsFilled = [...cells].every((cell) => {
    return cell.textContent !== "";
  });
  if (allCellsFilled) {
    return true;
  }
  return false;
}

function displayMessage(message) {
  const messageContainer = document.getElementById("message");
  messageContainer.textContent = message;
}

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetGame);

function resetGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
  });

  displayMessage("");

  currentPlayer = "X";

  cells.forEach((cell) => {
    cell.addEventListener("click", handleMove);
  });
}


