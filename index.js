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

function placeBlackPieces(blackPieces) {
  const board = document.querySelector(".board");
  let blackPiecesPointer = 0;
  let pointerIncrement = true;

  for (let i = 0; i < 16; i++) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.style.width = "12.5%";
    piece.style.height = "12.5%";
    if (i >= 8) {
      piece.innerHTML = blackPieces[blackPieces.length - 1].code;
      piece.setAttribute("id", blackPieces[blackPieces.length - 1].name);
      const move = (i % 8) * 100;
      piece.style.transform = `translate(${move}%, 100%)`;
      piece.classList.add(`square-${move / 100 + 1}${7}`);
    } else {
      piece.innerHTML = blackPieces[blackPiecesPointer].code;
      piece.setAttribute("id", blackPieces[blackPiecesPointer].name);
      const move = (i % 8) * 100;
      piece.style.transform = `translate(${move}%, 0)`;
      piece.classList.add(`square-${move / 100 + 1}${8}`);
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
      piece.innerHTML = whitePieces[whitePieces.length - 1].code;
      piece.setAttribute("id", whitePieces[whitePieces.length - 1].name);
      const move = (i % 8) * 100;
      piece.style.transform = `translate(${move}%, 600%)`;
      piece.classList.add(`square-${move / 100 + 1}${2}`);
    } else {
      piece.innerHTML = whitePieces[whitePiecesPointer].code;
      piece.setAttribute("id", whitePieces[whitePiecesPointer].name);
      const move = (i % 8) * 100;
      piece.style.transform = `translate(${move}%, 700%)`;
      piece.classList.add(`square-${move / 100 + 1}${1}`);
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
    // const target = selectedSquare.getBoundingClientRect();
    // const board = document.querySelector(".board").getBoundingClientRect();

    // selectedPiece.style.left = `${target.left - board.left}px`;
    // selectedPiece.style.top = `${target.top - board.top}px`;

    // selectedSquare.appendChild(selectedPiece);

    console.log(selectedSquare.id);
    const location = selectedSquare.id;
    selectedPiece.style.transform = `translate(${
      (location.at(0) - 1) * 100
    }%, ${(8 - location.at(1)) * 100}%)`;

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

/* I think I need to re evaluate 
pieces should all be at top: 0 left: 0
use transform to move to their needed position
board is seperate from pieces
get value of clicked on square from board and add it to pieces class
*/
