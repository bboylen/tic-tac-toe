const gameBoard = (() => {
  const square = () => {
    symbol = "";
    return { symbol };
  };

  let board = [];

  const getBoard = () => board;

  const initialize = () => {
    for (i = 0; i < 9; i++) {
      const newSquare = square;
      board.push(newSquare);
    }
  };

  return {
    getBoard,
    initialize,
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
  }

  const playMessage = () => {
    let player = player1Turn ? "Player 1's (X)" : "Player 2's (O)";
    console.log(`It is ${player} turn:`);
    // message.innerHTML = message
  }

  // start game

  const playTurn = () => {
    // check victory ?
    // add event listeners (only ones not clicked yet) ?
    // on click find object of click 
    // add mark to square
    // switch whose turn
    // play turn again?
  }

  const updateSquare = (e) => {
    squareId = e.target.dataset.id;
    console.log(squareId);
  }

  // check victory
  return {
    updateSquare
  }
})();


const displayController = (() => {
  getSquares = () => document.getElementsByClassName("board")[0].children;

  setListeners = (elementList, targetFunction) => {
    for (element of elementList) {
      element.addEventListener("click", targetFunction);
    }
  }

  return {
    getSquares,
    setListeners
  }
})();
