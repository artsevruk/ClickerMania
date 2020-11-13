const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const matrixAutoGenerate = (rows, columns, min, max) => {
  let matrix = [];

  for (var y = 0; y < rows; y++) {
    matrix[y] = [];
    for (var x = 0; x < columns; x++) {
      matrix[y][x] = getRandomInt(min, max);
    }
  }
  return matrix;
};

const getCol = (matrix, col, isNull) => {
  let column = [];
  let isEmpty = true;

  for (var i = 0; i < matrix.length; i++) {
    let element = matrix[i][col];
    if (element > 0) {
      isEmpty = false;
    }
    column.push(element);
  }

  if (isNull) {
    return { column, isEmpty };
  } else {
    return column;
  }
};

const sortBubbleForZero = (array) => {
  let newArray = [];

  array.forEach((element) => {
    if (element === 0) {
      newArray = [element, ...newArray];
    } else {
      newArray.push(element);
    }
  });

  return newArray;
};

const sortMatrix = (matrix) => {
  let newMatrix = [];

  for (let i = 0; i < matrix[0].length; i++) {
    let column = getCol(matrix, i);

    let sortedColumn = sortBubbleForZero(column);
    newMatrix.push(sortedColumn);
  }

  return newMatrix;
};

const rotateMatrix = (matrix) => {
  let newMatrix = [];

  for (let i = 0; i < matrix[0].length; i++) {
    let row = [];
    matrix.forEach((item) => {
      row.push(item[i]);
    });
    newMatrix.push(row);
  }

  return newMatrix;
};

const moveLeft = (matrix) => {
  let newMatrix = [...matrix];

  for (let c = newMatrix[0].length; c >= 0; c--) {
    if (getCol(newMatrix, c, true).isEmpty) {
      for (let i = 0; i < newMatrix.length; i++) {
        newMatrix[i].splice(c, 1);
      }
    }
  }

  return newMatrix;
};

class Matrix {
  constructor(rows = 10, columns = 10, min = 1, max = 4) {
    this.area = matrixAutoGenerate(rows, columns, min, max);
  }
  getArea() {
    return this.area;
  }
  setArea(area) {
    this.area = area;
  }
  getSortedColumnMatrix(index) {
    const [col] = index;
    let column = [];

    for (var i = 0; i < this.area.length; i++) {
      column.push(this.area[i][col]);
    }

    return column;
  }

  isValidCell = (index) => {
    const [row, column] = index;

    if (
      (this.area[row] && this.area[row][column - 1] === this.target) ||
      (this.area[row] && this.area[row][column + 1] === this.target) ||
      (this.area[row + 1] && this.area[row + 1][column] === this.target) ||
      (this.area[row - 1] && this.area[row - 1][column] === this.target)
    ) {
      return true;
    } else {
      return false;
    }
  };

  clickArea = (index) => {
    const [row, column] = index;

    if (this.area[row + 1] && this.area[row + 1][column] === this.target) {
      this.area[row + 1][column] = 0; // down
      this.clickArea([row + 1, column]);
    }

    if (this.area[row - 1] && this.area[row - 1][column] === this.target) {
      this.area[row - 1][column] = 0; // top
      this.clickArea([row - 1, column]);
    }

    if (this.area[row] && this.area[row][column - 1] === this.target) {
      this.area[row][column - 1] = 0; // left
      this.clickArea([row, column - 1]);
    }

    if (this.area[row] && this.area[row][column + 1] === this.target) {
      this.area[row][column + 1] = 0; // right
      this.clickArea([row, column + 1]);
    }
  };

  click(index) {
    const [row, column] = index;
    this.target = this.area[row][column];
    if (this.target && this.isValidCell(index)) {
      this.area[row][column] = 0;
      this.clickArea(index);
      this.area = moveLeft(rotateMatrix(sortMatrix(this.area)));
    }
  }
}

export const matrix = new Matrix();
