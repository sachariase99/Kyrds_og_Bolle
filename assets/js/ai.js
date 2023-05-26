// Initialiserer den aktuelle spiller ('X' starter)
let currentPlayer = 'X';
let aiDifficulty = 'easy';

// Spillebrættet repræsenteret som en matrix
let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

function aiPlayerTurn() {
    let bestMove;

    if (aiDifficulty === 'easy') {
        bestMove = getRandomMove();
    } else if (aiDifficulty === 'medium') {
        bestMove = getBestMoveWithDepthLimit(3); // Adjust the depth limit as desired
    } else if (aiDifficulty === 'hard') {
        bestMove = getBestMoveWithAlphaBetaPruning();
    }

    gameBoard[bestMove.row][bestMove.col] = '0';
    document.getElementById('board').rows[bestMove.row].cells[bestMove.col].innerText = '0';

    if (checkWin(bestMove.row, bestMove.col)) {
        alert('AI Player (0) wins!');
        resetBoard();
    } else if (checkDraw()) {
        alert('Draw!');
        resetBoard();
    } else {
        currentPlayer = 'X';
    }
}

function getRandomMove() {
    let emptyCells = [];
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (gameBoard[row][col] === '') {
                emptyCells.push({ row, col });
            }
        }
    }

    if (emptyCells.length === 0) {
        return null; // No empty cells available
    }

    // Randomly select an empty cell
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
}

function getBestMoveWithDepthLimit(depthLimit) {
    // AI player is always '0'
    let bestScore = -Infinity;
    let bestMove;

    // Loop through all empty cells
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameBoard[i][j] === '') {
                // Make the move for the AI player
                gameBoard[i][j] = '0';

                // Calculate the score for this move using the minimax algorithm with depth limit
                let score = minimaxWithDepthLimit(gameBoard, depthLimit, 0, false);

                // Undo the move
                gameBoard[i][j] = '';

                // Update the best score and move if needed
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = { row: i, col: j };
                }
            }
        }
    }
    return bestMove;
}

// Funktionen til at udføre et træk
function initiateMove(row, col) {
    // Tjekker om feltet er tomt
    if (gameBoard[row][col] === '') {
        // Opdaterer spillebrættet med den aktuelle spillers symbol
        gameBoard[row][col] = currentPlayer;
        // Opdaterer den tilsvarende celle i HTML-tabellen med den aktuelle spillers symbol
        document.getElementById('board').rows[row].cells[col].innerText = currentPlayer;

        // Tjekker om den aktuelle spiller har vundet
        if (checkWin(row, col)) {
            // Viser en besked med den aktuelle spillers symbol og vinderbeskeden
            alert(currentPlayer + ' vandt!');
            // Nulstiller spillebrættet
            resetBoard();
        } else if (checkDraw()) { // Tjekker om det er uafgjort (ingen flere tomme felter)
            // Viser en besked om uafgjort
            alert('Uafgjort!');
            // Nulstiller spillebrættet
            resetBoard();
        } else {
            // Skifter til den næste spiller
            currentPlayer = (currentPlayer === 'X') ? '0' : 'X';

            // Efter den menneskelige spillers tur, udfører AI-spilleren sin tur, hvis det er dens tur
            if (currentPlayer === '0') {
                aiPlayerTurn();
            }
        }
    }
}

// Funktionen til at tjekke om den aktuelle spiller har vundet
function checkWin(row, col) {
    let symbol = gameBoard[row][col];

    // Tjekker vandret række
    if (gameBoard[row][0] === symbol && gameBoard[row][1] === symbol && gameBoard[row][2] === symbol) {
        return true;
    }

    // Tjekker lodret række
    if (gameBoard[col][0] === symbol && gameBoard[col][1] === symbol && gameBoard[col][2] === symbol) {
        return true;
    }

    // Tjekker diagonalt
    if ((row === col || row + col === 2) &&
        ((gameBoard[0][0] === symbol && gameBoard[1][1] === symbol && gameBoard[2][2] === symbol) ||
            (gameBoard[0][2] === symbol && gameBoard[1][1] === symbol && gameBoard[2][0] === symbol))) {
        return true;
    }

    return false;
}

// Funktionen til at tjekke om spillet er uafgjort
function checkDraw() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            // Hvis der er et tomt felt, er spillet ikke uafgjort endnu
            if (gameBoard[row][col] === '') {
                return false;
            }
        }
    }
    // Hvis der ikke er flere tomme felter, er spillet uafgjort
    return true;
}

// Funktionen til at nulstille spillebrættet
function resetBoard() {
    // Nulstiller spillebrættet til tomme værdier
    gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    // Nulstiller tekstindholdet i alle celler i HTML-tabellen
    let cells = document.getElementsByTagName('td');
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
    }

    // Sætter den aktuelle spiller til at være 'X' igen
    currentPlayer = 'X';
}

// AI

function getBestMove() {
    // AI player is always '0'
    let bestScore = -Infinity;
    let bestMove;

    // Loop through all empty cells
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameBoard[i][j] === '') {
                // Make the move for the AI player
                gameBoard[i][j] = '0';

                // Calculate the score for this move using the minimax algorithm
                let score = minimax(gameBoard, 0, false, -Infinity, Infinity);

                // Undo the move
                gameBoard[i][j] = '';

                // Update the best score and move if needed
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = { row: i, col: j };
                }
            }
        }
    }

    return bestMove;
}

function minimaxWithAlphaBetaPruning(board, depth, isMaximizingPlayer, alpha, beta) {
    // Base cases: check if the game is over
    let result = checkResult(board);
    if (result !== null) {
        return score(result, depth);
    }

    if (isMaximizingPlayer) {
        let maxScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = '0';
                    let score = minimaxWithAlphaBetaPruning(board, depth + 1, false, alpha, beta);
                    board[i][j] = '';
                    maxScore = Math.max(maxScore, score);
                    alpha = Math.max(alpha, score);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
        }
        return maxScore;
    } else {
        let minScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'X';
                    let score = minimaxWithAlphaBetaPruning(board, depth + 1, true, alpha, beta);
                    board[i][j] = '';
                    minScore = Math.min(minScore, score);
                    beta = Math.min(beta, score);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
        }
        return minScore;
    }
}


function minimaxWithDepthLimit(board, depthLimit, depth, isMaximizingPlayer) {
    // Base cases: check if the game is over or depth limit reached
    let result = checkResult(board);
    if (result !== null || depth === depthLimit) {
        return score(result, depth);
    }

    if (isMaximizingPlayer) {
        let maxScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = '0';
                    let score = minimaxWithDepthLimit(board, depthLimit, depth + 1, false);
                    board[i][j] = '';
                    maxScore = Math.max(maxScore, score);
                }
            }
        }
        return maxScore;
    } else {
        let minScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'X';
                    let score = minimaxWithDepthLimit(board, depthLimit, depth + 1, true);
                    board[i][j] = '';
                    minScore = Math.min(minScore, score);
                }
            }
        }
        return minScore;
    }
}

function getBestMoveWithAlphaBetaPruning() {
    // AI player is always '0'
    let bestScore = -Infinity;
    let bestMove;

    // Loop through all empty cells
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameBoard[i][j] === '') {
                // Make the move for the AI player
                gameBoard[i][j] = '0';

                // Calculate the score for this move using the minimax algorithm with alpha-beta pruning
                let score = minimaxWithAlphaBetaPruning(gameBoard, 0, false, -Infinity, Infinity);

                // Undo the move
                gameBoard[i][j] = '';

                // Update the best score and move if needed
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = { row: i, col: j };
                }
            }
        }
    }

    return bestMove;
}

function score(result, depth) {
    if (result === 'X') {
        return -10 + depth;
    } else if (result === '0') {
        return 10 - depth;
    } else {
        return 0;
    }
}

// Helper function to check if the game is over and return the result
function checkResult(board) {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return board[i][0];
        }
    }

    // Check columns
    for (let j = 0; j < 3; j++) {
        if (board[0][j] !== '' && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
            return board[0][j];
        }
    }

    // Check diagonals
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    }
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
    }

    // Check for a draw
    let isDraw = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                isDraw = false;
                break;
            }
        }
        if (!isDraw) {
            break;
        }
    }
    if (isDraw) {
        return 'draw';
    }

    // Game is not over
    return null;
}
