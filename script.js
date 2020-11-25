const gameBoard = (() => {
  const square = () => {
    symbol = "";
    return { symbol };
  };

  let board = [];

  const getBoard = () => board;

  const initialize = () => {
    for (i = 0; i < 3; i++) {
      board.push([]);
      for (j = 0; j < 3; j++) {
        const newSquare = square;
        board[i].push(newSquare);
      }
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
})();

// const displayController = (() => {

// })();
