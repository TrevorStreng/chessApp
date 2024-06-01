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

  // let currentLocation = getPosition(selectedPiece);

  // let x = parseInt(currentLocation.at(0));
  // let y = parseInt(currentLocation.at(1));

  // let newX = parseInt(selectedSquare.id.at(0));
  // let newY = parseInt(selectedSquare.id.at(1));

  // if (newX !== x) return false;

  // if (y === 2) {
  //   if (newY === y + 2) {
  //     if (gameBoard[gameBoard.length - y - 2][x - 1] !== 0) return false;
  //     else return true;
  //   }
  // }

  // if (newY !== y + 1) return false;

  // return true;

  // needs to only  move forward
  // needs to work for both players
  // needs to be able to move two places at first

  let currentLocation = getPosition(selectedPiece);

  let x = parseInt(currentLocation.at(0));
  let y = parseInt(currentLocation.at(1));

  // ! this only allows for player to be white

  // if initPosition then allow to move 2 spaces
  let initPosition = false;

  if(selectedPiece.id.startsWith('w') && y === 2) initPosition = true
  if(selectedPiece.id.startsWith('b') && y === gameBoard.length - 1) initPosition = true

  let moveToX = parseInt(selectedSquare.id.at(0));
  let moveToY = parseInt(selectedSquare.id.at(1));

  let moveX = x === moveToX ? true : false
  let moveY = false;
  if(selectedPiece.id.startsWith('w')) {
    if(y + 1 === moveToY) moveY = true
    if(initPosition && y + 2 === moveToY) moveY = true
  } else {
    if(y - 1 === moveToY) moveY = true
    if(initPosition && y - 2 === moveToY) moveY = true
  }


  return moveX && moveY
}

function checkRookMovement(selectedPiece, selectedSquare) {
  // TODO: this can be done more effeciently
  let currentLocation = getPosition(selectedPiece);
  let x = currentLocation.split("")[0];
  x = parseInt(x);
  let y = currentLocation.split("")[1];
  y = parseInt(y);

  let moveToX = parseInt(selectedSquare.id.at(0));
  let moveToY = parseInt(selectedSquare.id.at(1));

  let moveX = x - moveToX !== 0 ? true : false
  let moveY = y - moveToY !== 0 ? true : false

  if(moveX && moveY) return false

  let xMod = 1;
  let yMod = 1;
  if (x > moveToX) xMod = -1;
  if (y > moveToY) yMod = -1;

  for(let i = 0; i < gameBoard.length; i++) {
    if(moveX) {
      x += xMod
    } else {
      y += yMod
    }

    if (gameBoard[gameBoard.length - y][x - 1] !== 0) return false;
    if (x === moveToX && y === moveToY) return true;
  }
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

    if (gameBoard[gameBoard.length - yTemp][xTemp - 1] !== 0) return false;
    if (xTemp === moveToX && yTemp === moveToY) return true;
  }
  return false;
}

function checkQueenMovement(selectedPiece, selectedSquare) {
  let currentLocation = getPosition(selectedPiece);
  let x = currentLocation.split("")[0];
  x = parseInt(x);
  let y = currentLocation.split("")[1];
  y = parseInt(y);

  let moveToX = parseInt(selectedSquare.id.at(0));
  let moveToY = parseInt(selectedSquare.id.at(1));
  let xTemp = x;
  let yTemp = y;
  // mods 'modifiers' are checking to see if needing to move forward or backwards
  let xMod = 1;
  let yMod = 1;
  if (x > moveToX) xMod = -1;
  if (y > moveToY) yMod = -1;

  // check to see if moving in x direction, y directrion, or diagnol
  let veritcal = x - moveToX === 0 ? true : false;
  let horizontal = y - moveToY === 0 ? true : false;
  let diagnol = false;
  if(!veritcal && !horizontal) diagnol = true

  for(let i = 0; i < 8; i++) {
    if(diagnol) {
      xTemp += xMod;
      yTemp += yMod;
    } else if(veritcal) {
      yTemp += yMod
    } else if(horizontal) {
      xTemp += xMod
    }

    if (gameBoard[gameBoard.length - yTemp][xTemp - 1] !== 0) return false;
    if (xTemp === moveToX && yTemp === moveToY) return true;
  }
  return false
}

function checkKingMovement(selectedPiece, selectedSquare) {
  let currentLocation = getPosition(selectedPiece);
  let x = currentLocation.split("")[0];
  x = parseInt(x);
  let y = currentLocation.split("")[1];
  y = parseInt(y);

  let moveToX = parseInt(selectedSquare.id.at(0));
  let moveToY = parseInt(selectedSquare.id.at(1));

  let validX = false;
  let validY = false;
  if(moveToX === x + 1 || moveToX === x - 1 || moveToX === x) validX = true
  if(moveToY === y + 1 || moveToY === y - 1 || moveToY === y) validY = true

  return validX && validY
}

function takePiece() {
  
}

/*
check to see if a piece is needed to be taken.
check if piece.name.at(0) !== to other piece 
*/
