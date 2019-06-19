const rowValue = 6;
const colValue = 6;
const mainBlock = document.querySelector("#game");

class Cell {
  constructor(y, x) {
    (this.x = x),
      (this.y = y),
      (this.imgNum = null),
      (this.isCliced = false),
      (this.class = null);
  }
  setImgNum() {
    this.imgNum = Math.floor(Math.random() * 4);
  }
}

function setArr(colValue, rowValue) {
  const newArr = [];
  for (let y = 0; y < colValue; y++) {
    newArr[y] = [];
    for (let x = 0; x < rowValue; x++) {
      newArr[y][x] = new Cell(y, x);
      newArr[y][x].setImgNum();
    }
  }
  return newArr;
}

function setClassColor(classEl) {
  switch (classEl.imgNum) {
    case 0:
      return "red";
    case 1:
      return "green";
    case 2:
      return "blue";
    case 3:
      return "yellow";
  }
  return htmlEl;
}

function tableDraw() {
  let block;
  for (let y = 0; y < rowValue; y++) {
    for (let x = 0; x < colValue; x++) {
      block = document.createElement("div");
      block.className = setClassColor(newTable[y][x]) + " y" + y + "x" + x;
      newTable[y][x].class = [...block.classList];
      mainBlock.appendChild(block);
    }
  }
}
function isNeighborCellEqualColor(y, x) {
  let numY = Number(y);
  let numX = Number(x);
  newTable[numY][numX].isCliced = true;
  if (numX - 1 >= 0) {
    if (
      newTable[numY][numX - 1].class[0] == newTable[numY][numX].class[0] &&
      !newTable[numY][numX - 1].isCliced
    ) {
      newTable[numY][numX].imgNum = null;
      isNeighborCellEqualColor(numY, numX - 1);
    }
  }
  if (numY - 1 >= 0) {
    if (
      newTable[numY - 1][numX].class[0] == newTable[numY][numX].class[0] &&
      !newTable[numY - 1][numX].isCliced
    ) {
      newTable[numY][numX].imgNum = null;
      isNeighborCellEqualColor(numY - 1, numX);
    }
  }
  if (numX + 1 < rowValue) {
    if (
      newTable[numY][numX + 1].class[0] == newTable[numY][numX].class[0] &&
      !newTable[numY][numX + 1].isCliced
    ) {
      newTable[numY][numX].imgNum = null;
      isNeighborCellEqualColor(numY, numX + 1);
    }
  }
  if (numY + 1 < colValue) {
    if (
      newTable[numY + 1][numX].class[0] == newTable[numY][numX].class[0] &&
      !newTable[numY + 1][numX].isCliced
    ) {
      newTable[numY][numX].imgNum = null;
      isNeighborCellEqualColor(numY + 1, numX);
    }
  }
}

function deleteSelectedCell() {
  for (let y = 0; y < rowValue; y++) {
    for (let x = 0; x < colValue; x++) {
      if (newTable[y][x].isCliced == true) {
        newTable[y][x].class = "";
      }
    }
  }
  reDrawTable();
}

function reDrawTable() {
  let count = 0;
  let someclass = null;
  const divList = document.querySelectorAll("#game div");
  for (let y = 0; y < rowValue; y++) {
    for (let x = 0; x < colValue; x++) {
      someclass = [...newTable[y][x].class];
      divList[count].classList = someclass.join(" ");
      count++;
    }
  }
}
function changeOnBoard() {
  for (let z = 0; z < rowValue - 1; z++) {
    for (let y = rowValue - 1; y > 0; y--) {
      for (let x = 0; x < colValue; x++) {
        if (newTable[y][x].class == "") {
          newTable[y][x].class = newTable[y - 1][x].class;
          newTable[y][x].imgNum = newTable[y - 1][x].imgNum;
          newTable[y - 1][x].class = "";
        }
      }
    }
  }
  reDrawTable();
}

function fillEmptyClasses() {
  for (let y = 0; y < rowValue; y++) {
    for (let x = 0; x < colValue; x++) {
      if (newTable[y][x].class == "") {
        newTable[y][x].setImgNum();
      }
      newTable[y][x].isCliced = false;
      newTable[y][x].class = [
        setClassColor(newTable[y][x]),
        " y" + y + "x" + x
      ];
    }
  }
  reDrawTable();
}
const newTable = setArr(colValue, rowValue);
tableDraw();
mainBlock.addEventListener("click", event => {
  let x = event.target.classList[1].split("y")[1].split("x");
  isNeighborCellEqualColor(x[0], x[1]);
  deleteSelectedCell();
  setTimeout(() => {
    changeOnBoard();
  }, 500);
  setTimeout(() => {
    fillEmptyClasses();
  }, 500);
});
