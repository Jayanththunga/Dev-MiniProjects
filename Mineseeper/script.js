let game = [];
let boxLength = 0,
  Bombs = 0,
  remainingBombs = 0;
let conditions = [
  "unrevealed",
  "revealed-bomb",
  "revealed-safe",
  "bomb",
  "flag-bomb",
  "flag-safe",
];
let Bombslist = [];
let box = {
  x: 0,
  y: 0,
  condition: "",
};

document.getElementById("generateGrid").addEventListener("click", function () {
  boxLength = document.getElementById("boxLength").value;
  Bombs = document.getElementById("Bombs").value;
  remainingBombs = Bombs;

  let gridContainer = document.getElementById("gridContainer");
  gridContainer.innerHTML = "";

  if (boxLength < 1 || Bombs > (boxLength * boxLength) / 2 || Bombs < 1) {
    alert("Not Valid");
    return;
  }

  let size = parseInt(boxLength);
  gridContainer.style.width = `${size * 40}px`;

  for (let x = 0; x < size; x++) {
    let row = [];
    for (let y = 0; y < size; y++) {
      let gridItem = document.createElement("div");
      gridItem.classList.add("grid-item", "unrevealed");
      gridContainer.appendChild(gridItem);

      let newbox = { ...box, x: x, y: y, condition: "unrevealed" };
      gridItem.boxData = newbox;

      gridItem.dataset.x = x;
      gridItem.dataset.y = y;
      gridItem.dataset.condition = "unrevealed";

      gridItem.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        addFlag(gridItem);
        calculateRemainingBombs();
      });

      gridItem.addEventListener("click", function (e) {
        calculateRemainingBombs();
        checkGame(gridItem);
      });

      row.push(gridItem);
    }
    game.push(row);
  }

  generateBombs();
  document.querySelector("#generateGrid").disabled = true;
  document.querySelector("#game-container").appendChild(gridContainer);
});

function generateRandom() {
  let x = Math.floor(Math.random() * boxLength);
  let y = Math.floor(Math.random() * boxLength);
  return { x, y };
}

function generateBombs() {
  let i = 0;
  while (i < Bombs) {
    let bomb = generateRandom();
    let exists = Bombslist.some((b) => b.x === bomb.x && b.y === bomb.y);
    if (!exists) {
      Bombslist.push(bomb);
      i++;
    }
  }

  for (let bmb of Bombslist) {
    let { x, y } = bmb;
    game[x][y].boxData.condition = "bomb";
    game[x][y].classList.remove("unrevealed");
    game[x][y].classList.add("bomb");
    game[x][y].setAttribute("data-condition", "bomb");
  }
}

function addFlag(gridItem) {
  let isBomb = gridItem.boxData.condition === "bomb";
  let isSafe = gridItem.boxData.condition === "unrevealed";
  let flagSafe = gridItem.boxData.condition === "flag-safe";
  let flagBomb = gridItem.boxData.condition === "flag-bomb";

  if (isBomb) {
    gridItem.boxData.condition = "flag-bomb";
    gridItem.classList.remove("bomb");
    gridItem.classList.add("flag-bomb");
  }

  if (isSafe) {
    gridItem.boxData.condition = "flag-safe";
    gridItem.classList.remove("unrevealed");
    gridItem.classList.add("flag-safe");
  }

  if (flagBomb) {
    gridItem.boxData.condition = "bomb";
    gridItem.classList.remove("flag-bomb");
    gridItem.classList.add("bomb");
  }

  if (flagSafe) {
    gridItem.boxData.condition = "unrevealed";
    gridItem.classList.remove("flag-safe");
    gridItem.classList.add("unrevealed");
  }
}

function checkGame(gridItem) {
  let isBomb = gridItem.boxData.condition === "bomb";
  let isSafe = gridItem.boxData.condition === "unrevealed";

  if (isBomb) {
    gridItem.boxData.condition = "revealed-bomb";
    gridItem.classList.remove("bomb");
    gridItem.classList.add("revealed-bomb");
    Lose();
  }

  if (isSafe) {
    displaySafe(gridItem);
    gridItem.disabled = true;
    checkWon();
  }
}

function calculateRemainingBombs() {
  remainingBombs = 0;
  game.forEach((row) => {
    row.forEach((gridItem) => {
      if (gridItem.classList.contains("bomb")) remainingBombs++;
    });
  });

  document.querySelector("#RemMineDisplay").innerHTML = "Remaining Mine left = " + remainingBombs
}

function displaySafe(gridItem) {
  gridItem.boxData.condition = "revealed-safe";
  gridItem.classList.remove("unrevealed");
  gridItem.classList.add("revealed-safe");
  let gridValue = calculateGridValue(gridItem);

  if (gridValue === 0) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let newx = parseInt(gridItem.boxData.x) + i;
        let newy = parseInt(gridItem.boxData.y) + j;

        if (
          newx >= 0 &&
          newx < boxLength &&
          newy >= 0 &&
          newy < boxLength &&
          game[newx][newy].boxData.condition === "unrevealed"
        ) {
          displaySafe(game[newx][newy]);
        }
      }
    }
  } else {
    gridItem.textContent = gridValue;
  }
}

function calculateGridValue(gridItem) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let newx = parseInt(gridItem.boxData.x) + i;
      let newy = parseInt(gridItem.boxData.y) + j;

      if (
        newx >= 0 &&
        newx < boxLength &&
        newy >= 0 &&
        newy < boxLength &&
        (game[newx][newy].classList.contains("bomb") ||
          game[newx][newy].classList.contains("flag-bomb"))
      ) {
        count++;
      }
    }
  }
  return count;
}

function Lose() {
  disableElements();
  document.getElementById("displayResult").innerHTML = "You lost the game";
}

function won() {
  disableElements();
  document.getElementById("displayResult").innerHTML = "You won the game";
}

function disableElements() {
  game.forEach((row) => {
    row.forEach((gridItem) => {
        gridItem.classList.add('disabled');
    });
  });
}

function checkWon() {
  if (remainingBombs === 0) won();

  let gamewon = true;
  game.forEach((row) => {
    row.forEach((gridItem) => {
      if (
        gridItem.classList.contains("unrevealed") ||
        gridItem.classList.contains("bomb")
      )
        gamewon = false;
    });
  });

  if (gamewon) won();
}

// restart game

document.getElementById("NewGame").addEventListener("click", ()=>{
  window.location.reload();
})
