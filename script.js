
class Matrix{
  constructor(){
    this.solveSystem();
  }


  forwardStroke(errorMessage = "")
  {
    for(let i = 0; i < matrix.length - 1; i++){
      if(!matrix[i][i])
      {
        if(!this.swapRows(i))
        {
          if(!this.swapColums(i))
          {
            this.check(errorMessage);
            return;
          }
        }
      }
      for (let j = 0; j < matrix.length; j++) { // получение первой единицы
        matrix[i][j] /= matrix[i][i]
      }
      for(let j = i + 1; j < matrix.length; j++) // получаем нули
      {
        let coef = matrix[j][i] / matrix[i][i];
        matrix[j][i] -= matrix[i][i] * coef;
      }
    }
    this.check(errorMessage);
    for (let i = 0; i < matrix.length; i++) { // пелим последнюю строку на последнее число
      for (let j = 0; j < matrix.length; j++) {
        matrix[matrix.length - 1][j] /= matrix[matrix.length - 1][matrix.length - 1]
      }
    }
  }


  check(errorMessage = ""){
    for(let i = 0; i < matrix.length; i++)
    {
      for (let j = 0; j < matrix.length; j++)
      {
        if(matrix[i] == matrix[j])
        {
          errorMessage = "something wrong";
          return;
        }
      }
    }
  }

  reverseStroke(errorMessage = "")
  {
    for(let i = matrix.length - 1; i > 0; i--)
    {
      for(let j = i - 1; j >= 0; j--)
      {
        let coef = matrix[j][i] / matrix[i][i];
        matrix[j][i] -= matrix[i][i] * coef;
      }
    }
  }
  swapRows(currentIndex){
    if(currentIndex == matrix.length - 1)
    {
      return false;
    }
    let maxValue = matrix[currentIndex + 1][currentIndex];
    let swapIndex = currentIndex + 1;

    for (let i = currentIndex + 2; i < matrix.length; i++)
    {
      if(matrix[i][currentIndex] && maxValue < matrix[i][currentIndex])
      {
        maxValue = matrix[i][currentIndex];
        swapIndex = i;
      }
    }
    if(!maxValue)
    {
      return false;
    }
    swap(matrix[currentIndex], matrix[swapIndex]);
    return true;
  }
  swapColums(currentIndex){
    if(currentIndex == matrix.length - 1)
    {
      return false;
    }
    let maxValue = matrix[currentIndex ][currentIndex + 1];
    let swapIndex = currentIndex + 1;

    for (let i = currentIndex + 2; i < matrix.length; i++)
    {
      if(matrix[currentIndex][i] && maxValue < matrix[currentIndex][i])
      {
        maxValue = matrix[currentIndex][i];
        swapIndex = i;
      }
    }
    if(!maxValue)
    {
      return false;
    }
    for (let i = 0; i < matrix.length; i++) {
      swap(matrix[i][currentIndex], matrix[i][swapIndex]);

    }
    return true;
  }
  isSquare()
  {
    return matrix.length ? matrix.length === matrix[0].length : false
  }
  solveSystem(errorMessage = ""){
    errorMessage = " ";
    if(f.length != matrix.length)
    {
      errorMessage = "Не квадратная";
      return errorMessage;
    }
    if(!this.isSquare())
    {
      errorMessage = "Не квадратная";
      return errorMessage;
    }
    let e = [];
    let prevX = [];
    let x = [];

    for (let i = 0; i < matrix.length; i++) {
      matrix[i].push(f[i])
    }
    do {

      this.forwardStroke(errorMessage);
      if(errorMessage.length)
      {
        return errorMessage;
      }

      this.reverseStroke(errorMessage);
      if(errorMessage.length)
      {
        return errorMessage;
      }

      this.check(errorMessage);
      if(errorMessage.length)
      {
        return errorMessage;
      }

      for (let i = 0; i < matrix.length; i++) {
        e[i] = matrix[length - 1];
      }

      for (let i = 0; i < matrix.length; i++) {
        x[i] = prevX[i] + e[i];
      }

      console.log(e);
      console.log(x);
      console.log(prevX);
    } while (condition);

  // }
  // output(){
  //   console.log(matrix);
  //   console.log(f);
  }

}

function swap(a, b) {
  let c = b;
  b = a;
  a = c;
}

let matrix = [
  [30.1, -1.4, 10, -1.5],
  [-3.3, 1.1, 30.1, -20.1],
  [7.5, 1.3, 1.1, 10],
  [1.7, 7.5, -1.8, 2.1]
];

let accurancy = 0.001;
let f = [10, 1.3, 10, 1.7]

let originf = f.slice();
let originMatrix = matrix.slice();


const Gauss = new Matrix();
