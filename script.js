document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function createBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => handleCellClick(i));
            board.appendChild(cell);
        }
        
        // Add touch event listener here
        board.addEventListener('touchstart', handleTouchStart);
    }

    function handleCellClick(index) {
        if (gameState[index] !== '' || checkWinner()) return;

        gameState[index] = currentPlayer;
        document.querySelectorAll('.cell')[index].textContent = currentPlayer;

        if (checkWinner()) {
            status.textContent = `Player ${currentPlayer} wins!`;
            return;
        }

        if (gameState.every(cell => cell !== '')) {
            status.textContent = "It's a draw!";
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkWinner() {
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });
    }

    function restartGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        status.textContent = `Player ${currentPlayer}'s turn`;
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
        });
    }

    function handleTouchStart(event) {
        event.preventDefault();
        const touch = event.touches[0];
        const cell = document.elementFromPoint(touch.clientX, touch.clientY);
        if (cell && cell.classList.contains('cell')) {
            const index = Array.from(cell.parentElement.children).indexOf(cell);
            handleCellClick(index);
        }
    }

    restartButton.addEventListener('click', restartGame);

    createBoard();
    status.textContent = `Player ${currentPlayer}'s turn`;
});