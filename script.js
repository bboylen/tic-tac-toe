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
  };

  return {
    getBoard,
    initialize,
    modifyBoard,
  };
})();

const Player = (sign) => {
  const getSign = () => sign;
  return { getSign };
};

const displayController = (() => {
  getSquares = () => document.getElementsByClassName("board")[0].children;

  const setListeners = (elementList, targetFunction) => {
    for (element of elementList) {
      if (element.innerHTML !== "X" && element.innerHTML != "O") {
        element.addEventListener("click", targetFunction);
      }
    }
  };

  const removeListener = (element, targetFunction) => {
    element.removeEventListener("click", targetFunction);
  };

  const setText = (symbol, square) => {
    square.textContent = symbol;
  };

  return {
    getSquares,
    setListeners,
    setText,
    removeListener,
  };
})();

const gameController = (() => {
  const player1 = Player("X");
  const player2 = Player("O");

  let player1Turn = true;
  let waitingForClick = true;

  const switchTurn = () => {
    player1Turn = !player1Turn;
  };

  const playMessage = () => {
    let player = player1Turn ? "Player 1's (X)" : "Player 2's (O)";
    document.getElementsByClassName(
      "message-block"
    )[0].textContent = `It is ${player} turn:`;
  };

  const setUpRound = () => {
    // check victory ?

    playMessage();
  };

  const updateSquare = (e) => {
    let square = e.target;
    let squareId = Number(square.dataset.id);
    let symbol = "";

    if (player1Turn) {
      symbol = "X";
    } else {
      symbol = "O";
    }

    displayController.setText(symbol, square);
    gameBoard.modifyBoard(symbol, squareId);
    displayController.removeListener(square, updateSquare);
    switchTurn();
    playMessage();
  };

  const checkVictory = () => {
    board = gameBoard.getBoard();
    checkBoard = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      [board[2], board[4], board[6]],
      [board[0], board[4], board[8]],
    ];
    let win = checkBoard.some(function (array) {
      if (
        array.every(function (square) {
          return square.symbol === "X" ? true : false;
        }) ||
        array.every(function (square) {
          return square.symbol === "O" ? true : false;
        })
      ) {
        return true;
      }
    });
    console.log(win);
  };

  const startGame = (() => {
    gameBoard.initialize();
    displayController.setListeners(getSquares(), updateSquare);
    playMessage();
  })();

  return {
    checkVictory,
  };
})();
