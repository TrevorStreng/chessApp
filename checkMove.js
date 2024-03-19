// let selectedPiece;
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
    return checkPawnMovement(selectedPiece, selectedSquare);
  }
  // if bishop
  if (selectedPiece.id.at(1) === "b") {
    return checkPawnMovement(selectedPiece, selectedSquare);
  }
  // if queen
  if (selectedPiece.id.at(1) === "q") {
    return checkPawnMovement(selectedPiece, selectedSquare);
  }
  // if king
  if (selectedPiece.id.at(1) === "k") {
    return checkPawnMovement(selectedPiece, selectedSquare);
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

  // get list of possible moves
  let moves = [];
  let move1 = currentLocation.split("");
  move1[1] = parseInt(move1[1]);
  move1[1] += 1;
  move1 = move1.join("");
  moves.push(move1);
  if (selectedPiece.classList.contains("original-position")) {
    let move2 = currentLocation.split("");
    move2[1] = parseInt(move2[1]);
    move2[1] += 2;
    move2 = move2.join("");
    moves.push(move2);
  }

  // get allowed moves
  // checks if moves array has any pieces on it and slice everything after
  for (let i = 0; i < moves.length; i++) {
    const square = document.getElementById(`${moves[i]}`);
    if (square.classList.contains("contains-piece")) {
      moves.slice(i, moves.length - 1);
    }
  }

  if (moves.includes(selectedSquare.id)) return true;
  return false;
}

function checkRookMovement(selectedPiece, selectedSquare) {
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
    const square = document.getElementById(`${i}${y}`);
    if (square.classList.contains("contsains-piece")) {
      break;
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
