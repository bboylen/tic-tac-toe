const gameBoard = (() => {
  const square = () => {
    symbol = "";
    return { symbol };
  };

  let board = [];

  const getBoard = () => board;

  const initialize = () => {
    for (i = 0; i < 9; i++) {
      const newSquare = square();
      board.push(newSquare);
    }
  };

  const modifyBoard = (symbol, squareId) => {
    board[squareId].symbol = symbol;
  }

  return {
    getBoard,
    initialize,
    modifyBoard
  };
})();

const Player = (sign) => {
  const getSign = () => sign;
  return { getSign };
};

const gameController = (() => {
  const player1 = Player("X");
  const player2 = Player("O");

  let player1Turn = true;

  const switchTurn = () => {
    player1Turn = !player1Turn;
  };

  const playMessage = () => {
    let player = player1Turn ? "Player 1's (X)" : "Player 2's (O)";
    document.getElementsByClassName("message-block")[0].textContent = `It is ${player} turn:`;
  };

  // start game
  

  const playTurn = () => {
    // check victory ?

    playMessage();

    // add event listeners (only ones not clicked yet) ?
    displayController.setListeners(getSquares(), updateSquare);
    // on click find object of click
    // add mark to square
    // switch whose turn
    // play turn again?
  };

  const updateSquare = (e) => {
    let square = e.target;
    let squareId = Number(square.dataset.id);
    let symbol = "";

    if (player1Turn) {
      symbol = "X";
    } else {
      symbol = "O";
    }; 

    displayController.setText(symbol, square);
    gameBoard.modifyBoard(symbol, squareId);
  };

  const startGame = (() => {
    gameBoard.initialize();
    playTurn();
  });

  // check victory
  return {
    updateSquare,
    playTurn,
    startGame
  };
})();

const displayController = (() => {
  getSquares = () => document.getElementsByClassName("board")[0].children;

  const setListeners = (elementList, targetFunction) => {
    for (element of elementList) {
      // if doesnt contain text content or if data-clicked = yes
      element.addEventListener("click", targetFunction);
    }
  };

  const setText = (symbol, square) => {
    square.textContent = symbol;
  }

  return {
    getSquares,
    setListeners,
    setText
  };
})();

gameController.startGame();