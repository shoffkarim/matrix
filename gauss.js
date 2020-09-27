let matrix = [
  [30.1, -1.4, 10, -1.5],
  [-17.5, 11.1, 1.3, -7.5],
  [1.7, -21.1, 7.1, -17.1],
  [2.1, 2.1, 3.5, 3.3]
];
let originMatrix = [
  [30.1, -1.4, 10, -1.5],
  [-17.5, 11.1, 1.3, -7.5],
  [1.7, -21.1, 7.1, -17.1],
  [2.1, 2.1, 3.5, 3.3]
];
let accuracy = 0.001;
let f = [10, 1.3, 10, 1.7]
let originF = [10, 1.3, 10, 1.7];
let errorMessage = "";

class Matrix {
  constructor(matrix, f, accuracy, errorMessage, originMatrix, originF){
    this.matrix = matrix;
    this.f = f;
    this.accuracy = accuracy;
    this.errorMessage = errorMessage;
    this.originMatrix = originMatrix;
    this.originF = originF;
    this.solveSystem();
  }

  forwardStroke(errorMessage){
    let del = [] // пустой массив делителей
    for (let i = 0; i < this.matrix.length; i++) {
      if(!this.matrix[i][i]){
        if(!this.swapRows(i)){
          if(!this.swapColums(i)){
            this.check();
          }
        }
      }

      del.push(matrix[i][i]) // добавляем в массив делить каждой строки
      for (let j = 0; j < this.matrix.length + 1; j++) {
        this.matrix[i][j] /= del[i] // делим каждый элемент строки на делить чтобы получить единицы по диагонали
      }

      for (let j = i + 1; j < this.matrix.length; j++) {
        let coef = this.matrix[j][i] / this.matrix[i][i]
        let right = multiMassiv(this.matrix[i], coef)
        this.matrix[j] = minusMassiv(this.matrix[j], right)
      }
    }
    console.log(this.matrix);

    this.check()
  }

  reverseStroke(errorMessage){
    for (let i = this.matrix.length; i >=0;  i--) {
      for (let j = i - 1; j >=0; j--) {
        let coef = this.matrix[j][i];
        if(this.matrix[i]){
          let right = multiMassiv(this.matrix[i], coef);
          this.matrix[j] = minusMassiv(this.matrix[j], right);
        }
        else{
          i = this.matrix.length
        }
      }
    }
  }

  check(){
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = i + 1; j < this.matrix.length; j++) {
        if(this.matrix[i] === this.matrix[j]) {
          console.log("Система имеет бесконечно много решений");
        }
      }
    }
  }

  swapRows(curIndex){
    if(curIndex == this.matrix.length - 1){
      return false;
    }

    let maxValue = this.matrix[curIndex + 1][curIndex];
    let swapIndex = curIndex + 1;

    for (let i = curIndex + 2; i < this.matrix.length; i++) {
      if(this.matrix[i][curIndex] && maxValue < this.matrix[i][curIndex]){
        maxValue = this.matrix[i][curIndex];
        swapIndex = i;
      }
    }

    if(!maxValue){
      return false;
    }

    let c = this.matrix[curIndex];
    this.matrix[curIndex] = this.matrix[swapIndex];
    this.matrix[swapIndex] = c;
    return true;
  }

  swapColums(curIndex){
    if(curIndex == this.matrix.length - 1){
      return false;
    }

    let maxValue = this.matrix[curIndex][curIndex + 1];
    let swapIndex = curIndex + 1;

    for (let i = curIndex + 2; i < this.matrix.length; i++) {
      if(this.matrix[curIndex][i] && maxValue < this.matrix[curIndex][i]){
        maxValue = this.matrix[curIndex][i];
        swapIndex = i;
      }
    }

    if(!maxValue){
      return false;
    }

    for (let i = 0; i < this.matrix.length; i++) {
      let c = this.matrix[i][curIndex];
      this.matrix[i][curIndex] = this.matrix[i][swapIndex];
      this.matrix[i][swapIndex] = c;
    }

    return true;
  }

  solveSystem(){

    if(this.f.length != this.matrix.length){
      console.log("Размерность вектора f и матрицы не совпадают");
    }
    // let e = [];
    // let prevX = [];
    // let x = [];
    // e.length = this.f.length;
    // prevX.length = this.f.length;
    // x.length = this.f.length;

    for (let i = 0; i < this.matrix.length; i++) {
      this.matrix[i].push(this.f[i]);
    }
    this.forwardStroke(this.errorMessage);
    this.reverseStroke(this.errorMessage);

    // for (let i = 0; i < this.matrix.length; i++) {
    //   e[i] = this.matrix[i][this.matrix.length - 1];

    // }
    // prevX = e;

    // for (let i = 0; i < x.length; i++) {
    //   x[i] = prevX[i] + e[i];

    // }

    // for (let i = 0; i < this.originF.length; i++) {
    //   for (let j = 0; j < x.length; j++) {
    //     this.originF[i] -= this.originMatrix[i][j] * x[j];
    //   }
    // }


    console.log("Решение системы:")
    let ans = []
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix.length + 1; j++) {
        if(j === 4){
          ans.push(this.matrix[i][j])
          console.log("x" + (i + 1) + " = " + this.matrix[i][j])
        }
      }
    }
    this.disperency(ans);
    this.determinant(this.matrix);
  }

  disperency(ans){
    for (let i = 0; i < this.matrix.length; i++) {
      this.originMatrix[i].push(this.originF[i]);
    }
    for (let i = 0; i < ans.length; i++) {
      for (let j = 0; j < this.matrix.length; j++) {
        this.originF[i] -= this.originMatrix[i][j] * ans[j];
      }
    }
    console.log("Невязка:");
    for (let i = 0; i < originF.length; i++) {
      console.log(this.originF[i] + "");
    }

  }

  determinant(A){
  }
}

function minusMassiv(left, right) {
  if(left.length != right.length){
    return 0
  }
  for (let i = 0; i < left.length; i++) {
    left[i] -= right[i];
  }
  return left;
}


function multiMassiv(arr, coef){
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push(arr[i] * coef)
  }
  return res;
}


const Gauss = new Matrix(matrix, f, accuracy, errorMessage, originMatrix, originF)
