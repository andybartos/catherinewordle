
const answer = "MIRROR";
const game = document.getElementById("game");
const message = document.getElementById("message");
const keyboard = document.getElementById("keyboard");

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
    keyboard.style.display = "none";
  } else {
    row++;
    createRow();
  }
}

function handleInput(key) {
  if (message.textContent) return;
  if (/^[A-Z]$/.test(key) && currentGuess.length < 6) {
    currentGuess += key;
    document.getElementById(`tile-${row}-${currentGuess.length - 1}`).textContent = key;
  } else if (key === "←" && currentGuess.length > 0) {
    document.getElementById(`tile-${row}-${currentGuess.length - 1}`).textContent = "";
    currentGuess = currentGuess.slice(0, -1);
  } else if (key === "ENTER" && currentGuess.length === 6) {
    updateTiles(currentGuess);
    currentGuess = "";
  }
}

function createKeyboard() {
  const keys = [
    "QWERTYUIOP",
    "ASDFGHJKL",
    "←ZXCVBNMENTER"
  ];
  keys.forEach(rowKeys => {
    const rowDiv = document.createElement("div");
    for (let k of rowKeys) {
      const btn = document.createElement("button");
      btn.textContent = k === "←" ? "⌫" : k === "ENTER" ? "⏎" : k;
      btn.className = "key";
      btn.onclick = () => handleInput(k === "⌫" ? "←" : k === "⏎" ? "ENTER" : k);
      rowDiv.appendChild(btn);
    }
    keyboard.appendChild(rowDiv);
  });
}

document.addEventListener("keydown", (e) => {
  handleInput(e.key.toUpperCase());
});

createRow();
createKeyboard();
