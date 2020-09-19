let matrix = [
  [30.1, -1.4, 10, -1.5],
  [-3.3, 1.1, 30.1, -20.1],
  [7.5, 1.3, 1.1, 10],
  [1.7, 7.5, -1.8, 2.1]
];
let originMatrix = [
  [30.1, -1.4, 10, -1.5],
  [-3.3, 1.1, 30.1, -20.1],
  [7.5, 1.3, 1.1, 10],
  [1.7, 7.5, -1.8, 2.1]
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
    this.forwardStroke(this.errorMessage);
  }

  forwardStroke(errorMessage){
    let del = [] // пустой массив делителей
    for (let i = 0; i < this.matrix.length; i++) {
      // todo: check and swaps

      del.push(matrix[i][i]) // добавляем в массив делить каждой строки
      this.f[i] /= del[i]; // делим элемент f соответствующим делителем
      for (let j = 0; j < this.matrix.length; j++) {
        this.matrix[i][j] /= del[i] // делим каждый элемент строки на делить чтобы получить единицы по диагонали
      }
      // console.log(this.matrix)
      for (let j = i + 1; j < this.matrix.length; j++) {
        let coef = this.matrix[j][i]
        let right = multiMassiv(this.matrix[i], coef)
        this.matrix[j] = minusMassiv(this.matrix[j], right)
      }
    }
    // console.log(del)
    // console.log(this.f)
    console.log(this.matrix)


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
