let playerColor = "white";

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

function placeBlackPieces(blackPieces) {
  const board = document.querySelector(".board");
  const squares = board.childNodes;
  let blackPiecesPointer = 0;
  let pointerIncrement = true;
  for (let i = 0; i < 16; i++) {
    if (i >= 8) {
      // print pawns
      squares[i].innerHTML = `<div class="piece" id="${
        blackPieces[blackPieces.length - 1].name
      }" onclick="selectPiece(this)" style="top: ${
        squares[i].getBoundingClientRect().top
      } left: ${squares[i].getBoundingClientRect().left}">${
        blackPieces[blackPieces.length - 1].code
      }</div>`;
    } else {
      // loop through other pieces
      squares[i].innerHTML = `<div class="piece" id="${
        blackPieces[blackPiecesPointer].name
      }" onclick="selectPiece(this)" style="top: ${
        squares[i].getBoundingClientRect().top
      } left: ${squares[i].getBoundingClientRect().left}">${
        blackPieces[blackPiecesPointer].code
      }</div>`;
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
  }
}

function placeWhitePieces(whitePieces) {
  const board = document.querySelector(".board");
  const squares = board.childNodes;
  let whitePiecesPointer = 0;
  let pointerIncrement = true;
  for (let i = squares.length - 16; i < squares.length; i++) {
    if (i < squares.length - 8) {
      squares[i].innerHTML = `<div class="piece" id="${
        whitePieces[whitePieces.length - 1].name
      }" onclick="selectPiece(this)" style="top: ${
        squares[i].getBoundingClientRect().top
      } left: ${squares[i].getBoundingClientRect().left}">${
        whitePieces[whitePieces.length - 1].code
      }</div>`;
    } else {
      squares[i].innerHTML = `<div class="piece" id="${
        whitePieces[whitePiecesPointer].name
      }" onclick="selectPiece(this)" style="top: ${
        squares[i].getBoundingClientRect().top
      } left: ${squares[i].getBoundingClientRect().left}">${
        whitePieces[whitePiecesPointer].code
      }</div>`;
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
    const target = selectedSquare.getBoundingClientRect();
    const board = document.querySelector(".board").getBoundingClientRect();
    console.log(selectedPiece);

    selectedPiece.style.left = `${target.left - board.left}px`;
    selectedPiece.style.top = `${target.top - board.top}px`;

    unHighlightPiece();
    selectedPiece = undefined;
  }
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
