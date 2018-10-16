// gameBoard object implemented using a gameBoardFactory() funcion as IIFE

const gameBoard = (function gameBoardFactory() {
  //state
  let board = [[null, null, null], [null, null, null], [null, null, null]];

  //private methods
  const isMarkerValid = (marker) => {
    const validMarkers = ['X', 'O'];
    return (validMarkers.includes(marker))? true : false;
  };

  const areRowColumnValid = (position) => {
    const validValues = [0, 1, 2];
    const [row, column] = position;
    return (validValues.includes(row) && validValues.includes(column))? true : false;
  };

  const isPositionVacant = (position) => {
      const [row, column] = position;
      return board[row][column] === null;
  };

  const copyBoard = () => {
    const [rows, columns] = [board.length - 1, board[0].length - 1];
    const copy = [];
    for (let i = 0; i <= rows; i++) {
        copy.push([]);
        for (let j = 0; j <= columns; j++) {
          copy[i].push(board[i][j]);
        }
    }
    return copy;
  };

  const getTranspose = (matrix) => {
     // if the matrix argument is undefined, initialize matrix to copy of private state
     // variable 'board'. Having the optional matrix arg makes getTranspose() testable
     matrix = matrix || copyBoard();
     for (let row = 0; row <= 2; row++) {
         for (let column = row + 1; column <= 2; column++) {
             const temp = matrix[row][column];
             matrix[row][column] = matrix[column][row];
             matrix[column][row] = temp;
         };
     };
     return matrix;
  };


  //public methods
  const clear = () => {
    board = [[null, null, null], [null, null, null], [null, null, null]];
    return board;
  };

  const placeMarker = (position, marker) => {
    const [row, column] = position;
    if (isPositionVacant(position) &&
        isMarkerValid(marker) &&
        areRowColumnValid(position)) {
        board[row][column] = marker;
    }
    return board;
  };

  const hasWinner = () => {
      const transposed = getTranspose();
      const forwardDiagonal = [board[0][0], board[1][1], board[2][2]];
      const reverseDiagonal = [board[0][2], board[1][1], board[2][0]];
      const hasThreeConsecutive = (array) => {
          return array.every((element) => element === 'X') ||
                 array.every((element) => element === 'O')
      };
      let winner = false;
      for (let row = 0; row <= 2; row++) {
          winner = winner ||
                   hasThreeConsecutive(board[row]) ||
                   hasThreeConsecutive(transposed[row]);
      }
      winner =  winner ||
                hasThreeConsecutive(forwardDiagonal) ||
                hasThreeConsecutive(reverseDiagonal);
      return winner;
  };

  const show = () => copyBoard();

  return {clear, placeMarker, hasWinner, show};
})();

export default gameBoard;
