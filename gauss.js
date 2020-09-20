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
errorMessage = "";

class Matrix {
  constructor(matrix, f, accuracy, errorMessage){
    this.matrix = matrix;
    this.f = f;
    this.accuracy = accuracy;
    this.errorMessage = errorMessage;
    this.solveSystem();
  }

  forwardStroke(errorMessage){
    let del = [] // пустой массив делителей
    for (let i = 0; i < this.matrix.length; i++) {
      // todo: check and swaps

      del.push(matrix[i][i]) // добавляем в массив делить каждой строки
      //this.f[i] /= del[i]; // делим элемент f соответствующим делителем
      for (let j = 0; j < this.matrix.length + 1; j++) {
        this.matrix[i][j] /= del[i] // делим каждый элемент строки на делить чтобы получить единицы по диагонали

      }
      // console.log(this.matrix)
      for (let j = i + 1; j < this.matrix.length; j++) {
        let coef = this.matrix[j][i] / this.matrix[i][i]
        let right = multiMassiv(this.matrix[i], coef)
        this.matrix[j] = minusMassiv(this.matrix[j], right)

      }
    }
    //console.log(this.matrix);
    // todo: check
  }

  reverseStroke(errorMessage){
    //console.log(this.matrix)
    for (let i = this.matrix.length; i > 0;  i--) {
      for (let j = i - 1; j >=0; j--) {
        let coef = this.matrix[j][i]
        // let right = multiMassiv(this.matrix[j], coef);
        // this.matrix[j] = minusMassiv(this.matrix[i], right);
        console.log(this.matrix[j][i])
        //console.log(this.matrix[j]);

      }

      // for (let j = i - 1; j >= 0; j--) {
      //   let coef = this.matrix[j][i] / this.matrix[i][i]
      //   console.log(this.matrix[j][i])
      //   let right = multiMassiv(this.matrix[i], coef);
      //   this.matrix[j] = minusMassiv(this.matrix[j], right);
      // }
    }
  }

  solveSystem(){
    let e = [];
    let prevX = [];
    let x = [];
    e.length = this.f.length;
    prevX.length = this.f.length;
    x.length = this.f.length;
    for (let i = 0; i < this.matrix.length; i++) {
      this.matrix[i].push(this.f[i]);
    }
    this.forwardStroke(this.errorMessage);
    this.reverseStroke(this.errorMessage);
    //console.log(this.matrix);
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
// let arr1 = [1, 2, 3]
// let coeff = 4

function multiMassiv(arr, coef){
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push(arr[i] * coef)
  }
  return res;
}

const Gauss = new Matrix(matrix, f, accuracy, errorMessage)
