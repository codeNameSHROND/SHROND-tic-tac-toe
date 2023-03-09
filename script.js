const winnerAudio = new Audio("winSound.mp3");
const tieAudio = new Audio("drawSound.mp3");

const header = document.getElementById("header");
const boxes = document.querySelectorAll(".box");
const notify = document.querySelector(".notification");

const resultBox = document.querySelectorAll(".resultBox");

const boxClasses = [
  ".box1",
  ".box2",
  ".box3",
  ".box4",
  ".box5",
  ".box6",
  ".box7",
  ".box8",
  ".box9",
];

let currentPlayer = "Player 1";
let currentColor = "red";
let winner = null;

header.style.color = currentColor;

// Array constructor function. The fill method
// is called on this array, which fills all
// the elements of the array with a null value.
const boxColors = Array(9).fill(null);

let notAvailable = [null];
let winnerBoxes = [];
let end = false;

function check(index) {
  // This calculates the row and column of the clicked box.
  // Math.floor(index / 3) calculates the row index (0, 1, or 2) of the box in the grid
  // index % 3 calculates the column index (0, 1, or 2) of the box in the grid
  const row = Math.floor(index / 3);
  const col = index % 3;

  // console.log("row = " + row + ", col = " + col);

  // Check row
  if (
    boxColors[row * 3] === currentColor &&
    boxColors[row * 3 + 1] === currentColor &&
    boxColors[row * 3 + 2] === currentColor
  ) {
    winnerBoxes.push(row * 3, row * 3 + 1, row * 3 + 2);
    return true;
  }

  // Check column
  if (
    boxColors[col] === currentColor &&
    boxColors[col + 3] === currentColor &&
    boxColors[col + 6] === currentColor
  ) {
    winnerBoxes.push(col, col + 3, col + 6);
    return true;
  }

  // Check diagonal
  if (index % 2 === 0) {
    // console.log("index % 2 = " + (index % 2));
    if (
      boxColors[0] === currentColor &&
      boxColors[4] === currentColor &&
      boxColors[8] === currentColor
    ) {
      winnerBoxes.push(0, 4, 8);
      return true;
    }
    if (
      boxColors[2] === currentColor &&
      boxColors[4] === currentColor &&
      boxColors[6] === currentColor
    ) {
      winnerBoxes.push(2, 4, 6);
      return true;
    }
  }

  return false;
}

function updateBoxes(hide) {
  console.log(hide);
  const winnerBoxesSet = new Set(winnerBoxes);
  for (let i = 0; i < 9; i++) {
    if (!winnerBoxesSet.has(i)) {
      if (hide) {
        document.querySelector(boxClasses[i]).classList.add("hide");
        document.querySelector(boxClasses[i]).classList.remove("win");
      } else {
        document.querySelector(boxClasses[i]).classList.remove("hide");
        document.querySelector(boxClasses[i]).classList.remove("win");
        document.querySelector(boxClasses[i]).innerHTML =
          '<i class="fa-solid fa-fire""></i>';
      }
    } else {
      if (hide) {
        document.querySelector(boxClasses[i]).classList.remove("hide");
        document.querySelector(boxClasses[i]).classList.add("win");
        document.querySelector(boxClasses[i]).innerHTML =
          '<i class="fa-regular fa-star"></i>';
      } else {
        document.querySelector(boxClasses[i]).classList.remove("hide");
        document.querySelector(boxClasses[i]).classList.remove("win");
        document.querySelector(boxClasses[i]).innerHTML =
          '<i class="fa-solid fa-fire"></i>';
      }
    }
    if (hide == "tie") {
      console.log(hide);
      document.querySelector(boxClasses[i]).innerHTML =
        '<i class="fa-solid fa-xmark"></i>';
    }
  }
}

function update(index) {
  index = index - 1;
  // console.log("index = " + index);

  if (end) {
    notify.innerText = "Match finished. Reset the game";
    return;
  }

  if (notAvailable.includes(index)) {
    // console.log("not available");
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
    winnerAudio.play();
    // console.log("winner Boxes: " + winnerBoxes);
    updateBoxes(true);
  } else if (boxColors.every((color) => color !== null)) {
    end = true;
    header.innerText = "It's a tie";
    header.style.color = " black";
    notify.innerText = "Player 1 vs Player 2";
    tieAudio.play();
    updateBoxes("tie");
  } else {
    // ternary operator/tion sir, shorthand sa if else
    currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
    currentColor = currentColor === "red" ? "blue" : "red";

    // kani sir para muusob pud ang color sa text, base sa current player
    header.innerText = currentPlayer;
    header.style.color = currentColor;
    resultBox.style.borderColor = currentColor;
  }
}

function reset() {
  currentPlayer = "Player 1";
  currentColor = "red";
  notify.innerText = "Select your box";
  end = false;

  winner = null;
  boxColors.fill(null);
  notAvailable = [];
  winnerBoxes = [];

  boxes.forEach((box) => {
    box.style.background = "";
  });

  header.innerText = currentPlayer;
  header.style.color = currentColor;

  updateBoxes(false);
}
