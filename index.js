let playerColor = "white"; // ^ change this is changing currrent player

function colorSquares() {
  const board = document.querySelector(".board");

  const posArr = ["a", "b", "c", "d", "e", "f", "g", "h"];

  for (let i = 0; i < 64; i++) {
    const square = document.createElement("div");
    const row = 8 - Math.floor(i / 8);
    const column = (i % 8) + 1;
    const squareLocation = `${column}${row}`;
    square.classList.add("square");
    square.classList.add((i + Math.floor(i / 8)) % 2 === 0 ? "dark" : "light");
    square.setAttribute("id", squareLocation);
    board.appendChild(square);
    square.setAttribute("onclick", "setSelectedSquare(this)");
  }
}

function addGamePieces() {
  const pieces = {
    whitePieces: [
      {
        name: "wr",
        code: "&#9814",
      },
      {
        name: "wn",
        code: "&#9816",
      },
      {
        name: "wb",
        code: "	&#9815",
      },
      {
        name: "wq",
        code: "&#9813",
      },
      {
        name: "wk",
        code: "&#9812",
      },
      {
        name: "wp",
        code: "&#9817",
      },
    ],
    blackPieces: [
      {
        name: "br",
        code: "&#9820",
      },
      {
        name: "bn",
        code: "&#9822",
      },
      {
        name: "bb",
        code: "	&#9821",
      },
      {
        name: "bq",
        code: "&#9819",
      },
      {
        name: "bk",
        code: "&#9818",
      },
      {
        name: "bp",
        code: "&#9823",
      },
    ],
  };

  // place pieces on board
  placeBlackPieces(pieces.blackPieces);
  placeWhitePieces(pieces.whitePieces);
}

// ! need to make each piece have its own unique identifier

function placeBlackPieces(blackPieces) {
  const board = document.querySelector(".board");
  let blackPiecesPointer = 0;
  let pointerIncrement = true;

  // ^ Black pieces - 6 === whiter pieces
  for (let i = 0; i < 16; i++) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.style.width = "12.5%";
    piece.style.height = "12.5%";
    if (i >= 8) {
      // place pawns
      piece.innerHTML = blackPieces[blackPieces.length - 1].code;
      piece.setAttribute("id", blackPieces[blackPieces.length - 1].name);
      const move = (i % 8) * 100;
      piece.style.transform = `translate(${move}%, 100%)`;
      piece.classList.add(`square-${move / 100 + 1}${7}`);
      // piece.classList.add("original-position");
      // const square = document.getElementById(`${move / 100 + 1}${7}`);
      // square.classList.add("contains-piece");
      gameBoard[1][i % 8] = blackPieces[blackPieces.length - 1].name;
    } else {
      piece.innerHTML = blackPieces[blackPiecesPointer].code;
      piece.setAttribute("id", blackPieces[blackPiecesPointer].name);
      const move = (i % 8) * 100;
      piece.style.transform = `translate(${move}%, 0)`;
      piece.classList.add(`square-${move / 100 + 1}${8}`);
      // const square = document.getElementById(`${move / 100 + 1}${8}`);
      // square.classList.add("contains-piece");
      gameBoard[0][i % 8] = blackPieces[blackPiecesPointer].name;
      if (blackPieces[blackPiecesPointer].name === "bk") {
        pointerIncrement = false;
        blackPiecesPointer--;
      }
      if (pointerIncrement) {
        blackPiecesPointer++;
      } else {
        blackPiecesPointer--;
      }
    }
    piece.setAttribute("onclick", "selectPiece(this)");
    board.appendChild(piece);
  }
  console.log(gameBoard);
}

function placeWhitePieces(whitePieces) {
  const board = document.querySelector(".board");
  let whitePiecesPointer = 0;
  let pointerIncrement = true;

  for (let i = 0; i < 16; i++) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.style.width = "12.5%";
    piece.style.height = "12.5%";
    if (i < 8) {
      // place pawns
      piece.innerHTML = whitePieces[whitePieces.length - 1].code;
      piece.setAttribute("id", whitePieces[whitePieces.length - 1].name);
      const move = (i % 8) * 100;
      piece.style.transform = `translate(${move}%, 600%)`;
      piece.classList.add(`square-${move / 100 + 1}${2}`);
      // piece.classList.add("original-position"); // this only matters for pawns checking to see if it can move two squares or not
      // const square = document.getElementById(`${move / 100 + 1}${2}`);
      // square.classList.add("contains-piece");
      gameBoard[gameBoard.length - 2][i % 8] =
        whitePieces[whitePieces.length - 1].name;
    } else {
      piece.innerHTML = whitePieces[whitePiecesPointer].code;
      piece.setAttribute("id", whitePieces[whitePiecesPointer].name);
      const move = (i % 8) * 100;
      piece.style.transform = `translate(${move}%, 700%)`;
      piece.classList.add(`square-${move / 100 + 1}${1}`);
      // const square = document.getElementById(`${move / 100 + 1}${1}`);
      // square.classList.add("contains-piece");
      gameBoard[gameBoard.length - 1][i % 8] =
        whitePieces[whitePiecesPointer].name;
      if (whitePieces[whitePiecesPointer].name === "wk") {
        pointerIncrement = false;
        whitePiecesPointer--;
      }
      if (pointerIncrement) {
        whitePiecesPointer++;
      } else {
        whitePiecesPointer--;
      }
    }
    piece.setAttribute("onclick", "selectPiece(this)");
    board.appendChild(piece);
  }
}

let selectedPiece;
// let selectedSquare;
let possibleMoves = [];

function setSelectedSquare(square) {
  if (selectedPiece && square.childNodes.length === 0) {
    // selectedSquare = square;
    movePiece(square);
  }
}

function selectPiece(piece) {
  // selectedSquare = undefined;
  // make sure player is clicking on their piece only
  if (playerColor === "white" && piece.id.at(0) !== "w") {
    console.log("Can only move your pieces! 😧");
    return;
  }
  if (playerColor === "black" && piece.id.at(0) !== "b") {
    console.log("Can only move your pieces! 😧");
    return;
  }
  // unselect if piece is clicked again
  if (selectedPiece === piece) {
    unHighlightPiece();
    return;
  }
  // if a piece is clicked on unselect any selected pieces
  if (selectedPiece) {
    unHighlightPiece();
  }
  // select clicked on piece
  highlight(piece);
}

function movePiece(selectedSquare) {
  if (selectedSquare && selectedPiece) {
    const validMove = checkForValidMove(selectedPiece, selectedSquare);
    if (!validMove) {
      console.log("not a valid move!!! 💥");
      return;
    }

    const location = selectedSquare.id;
    selectedPiece.style.transform = `translate(${
      (location.at(0) - 1) * 100
    }%, ${(8 - location.at(1)) * 100}%)`;

    // if (selectedPiece.classList.contains("original-position"))
    //   selectedPiece.classList.remove("original-position");

    const piecePosition = getPosition(selectedPiece);
    // const square = document.getElementById(piecePosition);
    // update piece's position in class
    selectedPiece.classList.remove(`square-${piecePosition}`);
    selectedPiece.classList.add(`square-${selectedSquare.id}`);
    // remove marker from old square and add to new
    // square.classList.remove("contains-piece");
    // selectedSquare.classList.add("contains-piece");
    // move piece gameBoard
    console.log(selectedPiece);
    gameBoard[piecePosition.at(1)][piecePosition.at(0)] = selectedPiece.id;

    unHighlightPiece();
    selectedPiece = undefined;
  }
  console.log(gameBoard);
}

function highlight(piece) {
  piece.classList.add("highlight");
  selectedPiece = piece;
  // showPossibleMoves(piece);
}

function unHighlightPiece() {
  selectedPiece.classList.remove("highlight");
  selectedPiece = undefined;
}

function showPossibleMoves(piece) {
  if (piece.id.at(1) === "p") {
    drawCircles(piece);
  }
}

function drawCircles(piece) {
  const parentId = piece.parentNode.id;
  const board = document.querySelector(".board");
  const squares = board.childNodes;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].id === (parseInt(parentId) + 1).toString()) {
      //make circle here
      squares[i].innerHTML = `<div class="circle"></div>`;
      possibleMoves.push(squares[i]);
    }
  }
}

function initGameBoard() {
  colorSquares();
  addGamePieces();
}

initGameBoard();
