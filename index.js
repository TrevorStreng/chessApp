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
  const squares = board.children;
  let blackPiecesPointer = 0;
  let pointerIncrement = true;
  for (let i = 0; i < 16; i++) {
    if (i >= 8) {
      // print pawns
      squares[i].innerHTML = `<div class="piece" id="${
        blackPieces[blackPieces.length - 1].name
      }" onclick="movePiece(this.parentNode, this)">${
        blackPieces[blackPieces.length - 1].code
      }</div>`;
    } else {
      // loop through other pieces
      squares[
        i
      ].innerHTML = `<div class="piece" id="${blackPieces[blackPiecesPointer].name}" onclick="movePiece(this.parentNode, this)">${blackPieces[blackPiecesPointer].code}</div>`;
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
      }" onclick="movePiece(this.parentNode, this)">${
        whitePieces[whitePieces.length - 1].code
      }</div>`;
    } else {
      squares[
        i
      ].innerHTML = `<div class="piece" id="${whitePieces[whitePiecesPointer].name}" onclick="movePiece(this.parentNode, this)">${whitePieces[whitePiecesPointer].code}</div>`;
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

let highlightedPiece;

function movePiece(location, piece) {
  console.log(location, piece);
  if (playerColor === "white" && piece.id.at(0) !== "w") {
    console.log("Can only move your pieces! 😧");
    return;
  }
  if (highlightedPiece) {
    unHighlightPiece();
  }
  highlight(piece);
  // const board = document.querySelector(".board");
  // const squares = board.childNodes;
  // let target;
  // for (let i = 0; i < squares.length; i++) {
  //   if (squares[i].id === location) {
  //     target = squares[i];
  //   }
  // }
  // console.log(target);
}

function highlight(piece) {
  piece.classList.add("highlight");
  highlightedPiece = piece;
}

function unHighlightPiece() {
  highlightedPiece.classList.remove("highlight");
}

function initGameBoard() {
  colorSquares();
  addGamePieces();
}

initGameBoard();
