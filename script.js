
const answer = "MIRROR";
const game = document.getElementById("game");
const message = document.getElementById("message");

let currentGuess = "";
let row = 0;

function createRow() {
  for (let i = 0; i < 6; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.id = `tile-${row}-${i}`;
    game.appendChild(tile);
  }
}

function updateTiles(guess) {
  for (let i = 0; i < 6; i++) {
    const tile = document.getElementById(`tile-${row}-${i}`);
    tile.textContent = guess[i];
    if (guess[i] === answer[i]) {
      tile.classList.add("correct");
    } else if (answer.includes(guess[i])) {
      tile.classList.add("present");
    } else {
      tile.classList.add("absent");
    }
  }
  if (guess === answer) {
    message.textContent = "Well done boo! I love you so much ❤️";
  } else {
    row++;
    createRow();
  }
}

document.addEventListener("keydown", (e) => {
  if (message.textContent) return;
  if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < 6) {
    currentGuess += e.key.toUpperCase();
    document.getElementById(`tile-${row}-${currentGuess.length - 1}`).textContent = e.key.toUpperCase();
  } else if (e.key === "Backspace" && currentGuess.length > 0) {
    document.getElementById(`tile-${row}-${currentGuess.length - 1}`).textContent = "";
    currentGuess = currentGuess.slice(0, -1);
  } else if (e.key === "Enter" && currentGuess.length === 6) {
    updateTiles(currentGuess);
    currentGuess = "";
  }
});

createRow();
