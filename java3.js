const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentPlayer;
let gameBoard;
let gameActive;

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');

startGame();

function startGame() {
    gameBoard = Array.from(Array(9).keys());
    gameActive = true;
    currentPlayer = X_CLASS;
    statusDisplay.textContent = "Player X's Turn";
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
}

function handleClick(cellIndex) {
    if (!gameActive || typeof gameBoard[cellIndex] !== 'number') return;

    placeMarker(cellIndex, currentPlayer);
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isBoardFull()) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
        statusDisplay.textContent = currentPlayer === X_CLASS ? "Player X's Turn" : "Player O's Turn";
    }
}

function placeMarker(cellIndex, player) {
    gameBoard[cellIndex] = player;
    cells[cellIndex].classList.add(player);
}

function checkWin(player) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return gameBoard[index] === player;
        });
    });
}

function isBoardFull() {
    return gameBoard.every(cell => {
        return typeof cell === 'string';
    });
}

function endGame(draw) {
    if (draw) {
        statusDisplay.textContent = "It's a draw!";
    } else {
        statusDisplay.textContent = `${currentPlayer === X_CLASS ? "Player X" : "Player O"} wins!`;
    }
    gameActive = false;
}

function resetGame() {
    startGame();
}
function placeMarker(cellIndex, player) {
    gameBoard[cellIndex] = player;
    cells[cellIndex].classList.add(player);
    cells[cellIndex].textContent = player.toUpperCase(); // Display X or O in the cell
}
function resetGame() {
    startGame(); // Reset game state
    clearBoard(); // Clear the board UI
}

function clearBoard() {
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.textContent = ''; // Clear the content of each cell
    });
}
