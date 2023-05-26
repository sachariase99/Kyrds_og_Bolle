// Initialiserer den aktuelle spiller ('X' starter)
let currentPlayer = 'X';

// Spillebrættet repræsenteret som en matrix
let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

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