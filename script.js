const gameBoard = (() => {
  let square = () => {
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

  const removeSymbolValues = () => {
    board=[];
  }
  return {
    getBoard,
    initialize,
    modifyBoard,
    removeSymbolValues
  };
})();

const Player = (sign) => {
  const getSign = () => sign;
  return { getSign };
};

const displayController = (() => {
  getSquares = () => document.getElementsByClassName("board")[0].children;

  const setSquareListeners = (elementList, targetFunction) => {
    for (element of elementList) {
      if (element.innerHTML !== "X" && element.innerHTML != "O") {
        element.addEventListener("click", targetFunction);
      }
    }
  };

  const setButtonListener = (targetFunction) => {
    btn = document
      .getElementById("play-again-button")
      .addEventListener("click", targetFunction);
  };

  const removeListener = (element, targetFunction) => {
    element.removeEventListener("click", targetFunction);
  };

  const setText = (symbol, square) => {
    square.textContent = symbol;
  };

  const playMessage = (player1Turn) => {
    let player = player1Turn ? "Player 1's (X)" : "Player 2's (O)";
    document.getElementsByClassName(
      "message-block"
    )[0].textContent = `It is ${player} turn:`;
  };

  const gameOverMessage = (player1Turn) => {
    let player = player1Turn ? "Player 1" : "Player 2";
    document.getElementsByClassName(
      "message-block"
    )[0].textContent = `${player} wins!`;
  };

  const tieMessage = () => {
    document.getElementsByClassName("message-block")[0].textContent =
      "It's a tie!";
  };

  const showButton = () => {
    document.getElementById("play-again-button").style.display = "inline-block";
  };

  const hideButton = () => {
    document.getElementById("play-again-button").style.display = "none";
  }
  const removeBoardText = () => {
    squares = getSquares();
    for (square of squares) {
      setText("",square);
    }
  }

  return {
    getSquares,
    setSquareListeners,
    setButtonListener,
    setText,
    removeListener,
    playMessage,
    gameOverMessage,
    tieMessage,
    showButton,
    hideButton,
    removeBoardText
  };
})();

const gameController = (() => {
  const player1 = Player("X");
  const player2 = Player("O");

  let player1Turn = true;

  const switchTurn = () => {
    player1Turn = !player1Turn;
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

    if (checkVictory()) {
      displayController.gameOverMessage(player1Turn);
      return endGame();
    }
    
    if (checkTie()) {
      displayController.tieMessage();
      return endGame();
    }

    displayController.removeListener(square, updateSquare);
    switchTurn();
    displayController.playMessage(player1Turn);
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

    return checkBoard.some(function (array) {
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
  };

  const checkTie = () => {
    board = gameBoard.getBoard();
    return board.every(function (square) {
      return square.symbol !== "";
    })
  }

  const endGame = () => {
    displayController.showButton();
  };

  const resetGame = () => {
    displayController.removeBoardText();
    gameBoard.removeSymbolValues();
    displayController.hideButton();
    startGame();
  }

  const startGame = (() => {
    gameBoard.initialize();
    displayController.setSquareListeners(getSquares(), updateSquare);
    displayController.setButtonListener(resetGame);
    player1Turn = true;
    displayController.playMessage(player1Turn);
  });

  startGame();
})();
