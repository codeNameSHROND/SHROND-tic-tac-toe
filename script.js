const header = document.getElementById("header");
const boxes = document.querySelectorAll(".box");
const notify = document.querySelector(".notification");

let currentPlayer = "Player 1";
let currentColor = "red";
let winner = null;

header.style.color = currentColor;

// Array constructor function. The fill method
// is called on this array, which fills all
// the elements of the array with a null value.
const boxColors = Array(9).fill(null);

let notAvailable = [null];
let end = false;

function update(index) {
  index = index - 1;
  console.log("index = " + index);

  if (end) {
    notify.innerText = "Match finished. Reset the game";
    return;
  }

  if (notAvailable.includes(index)) {
    console.log("not available");
    notify.innerText = "Box not avialable";
    return;
  }

  notAvailable.push(index);
  notify.innerText = "Select your box";

  boxColors[index] = currentColor;

  boxes[index].style.background = currentColor;

  if (check(index)) {
    end = true;
    winner = currentPlayer;
    header.innerText = winner + " wins";
    notify.innerText = "Congratulations";
  } else if (boxColors.every((color) => color !== null)) {
    end = true;
    header.innerText = "It's a tie";
    header.style.color = " black";
    notify.innerText = "Player 1 vs Player 2";
  } else {
    // ternary operator/tion sir, shorthand sa if else
    currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
    currentColor = currentColor === "red" ? "blue" : "red";

    // kani sir para muusob pud ang color sa text, base sa current player
    header.innerText = currentPlayer;
    header.style.color = currentColor;
  }
}

function check(index) {
  // This calculates the row and column of the clicked box.
  // Math.floor(index / 3) calculates the row index (0, 1, or 2) of the box in the grid
  // index % 3 calculates the column index (0, 1, or 2) of the box in the grid
  const row = Math.floor(index / 3);
  const col = index % 3;

  console.log("row = " + row + ", col = " + col);

  // Check row
  if (
    boxColors[row * 3] === currentColor &&
    boxColors[row * 3 + 1] === currentColor &&
    boxColors[row * 3 + 2] === currentColor
  ) {
    return true;
  }

  // Check column
  if (
    boxColors[col] === currentColor &&
    boxColors[col + 3] === currentColor &&
    boxColors[col + 6] === currentColor
  ) {
    return true;
  }

  // Check diagonal
  if (index % 2 === 0) {
    console.log("index % 2 = " + (index % 2));
    if (
      boxColors[0] === currentColor &&
      boxColors[4] === currentColor &&
      boxColors[8] === currentColor
    ) {
      return true;
    }
    if (
      boxColors[2] === currentColor &&
      boxColors[4] === currentColor &&
      boxColors[6] === currentColor
    ) {
      return true;
    }
  }

  return false;
}

function reset() {
  currentPlayer = "Player 1";
  currentColor = "red";
  notify.innerText = "Select your box";
  end = false;

  winner = null;
  boxColors.fill(null);
  notAvailable = [];

  boxes.forEach((box) => {
    box.style.background = "";
  });

  header.innerText = currentPlayer;
  header.style.color = currentColor;
}
