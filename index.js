function colorSquares() {
  const board = document.querySelector(".board");

  const posArr = ["a", "b", "c", "d", "e", "f", "g", "h"];

  for (let i = 0; i < 64; i++) {
    const square = document.createElement("div");
    const squareLocation = `${posArr[i % 8]}${Math.floor(i / 8) + 1}`;
    square.classList.add((i + Math.floor(i / 8)) % 2 === 0 ? "dark" : "light");
    square.setAttribute("id", squareLocation);
    board.appendChild(square);
  }
}

colorSquares();
