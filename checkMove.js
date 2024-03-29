// white pieces 1 black pieces 2 maybe

let gameBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
function checkForValidMove(selectedPiece, selectedSquare) {
  // if pawn
  if (selectedPiece.id.at(1) === "p") {
    return checkPawnMovement(selectedPiece, selectedSquare);
  }
  // if rook
  if (selectedPiece.id.at(1) === "r") {
    return checkRookMovement(selectedPiece, selectedSquare);
  }
  // if knight
  if (selectedPiece.id.at(1) === "n") {
    return checkKnightMovement(selectedPiece, selectedSquare);
  }
  // if bishop
  if (selectedPiece.id.at(1) === "b") {
    return checkBishopMovement(selectedPiece, selectedSquare);
  }
  // if queen
  if (selectedPiece.id.at(1) === "q") {
    return checkQueenMovement(selectedPiece, selectedSquare);
  }
  // if king
  if (selectedPiece.id.at(1) === "k") {
    return checkKingMovement(selectedPiece, selectedSquare);
  }
}

function getPosition(selectedPiece) {
  let currentLocation = selectedPiece.classList[1];
  currentLocation = currentLocation.split("-")[1];
  return currentLocation;
}

function checkPawnMovement(selectedPiece, selectedSquare) {
  // &This only checks for current players moves
  // ! still need to check if any pieces are in the way

  let currentLocation = getPosition(selectedPiece);

  let x = parseInt(currentLocation.at(0));
  let y = parseInt(currentLocation.at(1));

  let newX = parseInt(selectedSquare.id.at(0));
  let newY = parseInt(selectedSquare.id.at(1));

  if (newX !== x) return false;

  if (y === 2) {
    if (newY === y + 2) {
      if (gameBoard[gameBoard.length - y - 2][x - 1] !== 0) return false;
      else return true;
    }
  }

  if (newY !== y + 1) return false;

  return true;
}

function checkRookMovement(selectedPiece, selectedSquare) {
  // ! this can be done more effeciently
  let currentLocation = getPosition(selectedPiece);
  let x = currentLocation.split("")[0];
  x = parseInt(x);
  let y = currentLocation.split("")[1];
  y = parseInt(y);
  let xMoves = [];
  let yMoves = [];

  /* check x-axis */
  // check left
  for (let i = x - 1; i > 0; i--) {
    if (gameBoard[y][i] !== 0) {
      break;
    }
    const square = document.getElementById(`${i}${y}`);
    if (square.classList.contains("contsains-piece")) {
    }
    xMoves.push(`${i}${y}`);
  }
  // check right
  for (let i = x + 1; i <= 8; i++) {
    const square = document.getElementById(`${i}${y}`);
    if (square.classList.contains("contains-piece")) break;
    xMoves.push(`${i}${y}`);
  }

  /* check y-axis */
  //check forward
  for (let i = y + 1; i < 8; i++) {
    const square = document.getElementById(`${x}${i}`);
    if (square.classList.contains("contains-piece")) break;
    yMoves.push(`${x}${i}`);
  }
  //check backward
  for (let i = y - 1; i > 0; i--) {
    const square = document.getElementById(`${x}${i}`);
    if (square.classList.contains("contains-piece")) break;
    yMoves.push(`${x}${i}`);
  }

  if (xMoves.includes(selectedSquare.id)) return true;
  if (yMoves.includes(selectedSquare.id)) return true;
  return false;
}

function checkKnightMovement(selectedPiece, selectedSquare) {
  let currentLocation = getPosition(selectedPiece);
  let x = currentLocation.split("")[0];
  x = parseInt(x);
  let y = currentLocation.split("")[1];
  y = parseInt(y);
  let moveToX = parseInt(selectedSquare.id.at(0));
  let moveToY = parseInt(selectedSquare.id.at(1));
  if (moveToX === x + 1 || moveToX === x - 1) {
    if (moveToY === y + 2 || moveToY === y - 2) return true;
  }
  if (moveToX === x + 2 || moveToX === x - 2) {
    if (moveToY === y + 1 || moveToY === y - 1) return true;
  }
  return false;
}

function checkBishopMovement(selectedPiece, selectedSquare) {
  let currentLocation = getPosition(selectedPiece);
  let x = currentLocation.split("")[0];
  x = parseInt(x);
  let y = currentLocation.split("")[1];
  y = parseInt(y);

  let moveToX = parseInt(selectedSquare.id.at(0));
  let moveToY = parseInt(selectedSquare.id.at(1));
  let xTemp = x;
  let yTemp = y;
  let xMod = 1;
  let yMod = 1;
  if (x > moveToX) xMod = -1;
  if (y > moveToY) yMod = -1;

  // it will never be more than 8
  for (let i = 0; i < 8; i++) {
    xTemp += xMod;
    yTemp += yMod;

    if (gameBoard[gameBoard.length - yTemp][xTemp - 1] !== 0) return false; // probably something like this
    if (xTemp === moveToX && yTemp === moveToY) return true;
  }
  return false;
}

function checkQueenMovement(selectedPiece, selectedSquare) {}

function checkKingMovement(selectedPiece, selectedSquare) {}

/*
Implement game board using 2d array instead of marking pieces in html
*/
