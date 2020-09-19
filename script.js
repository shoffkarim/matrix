
class Matrix{
  constructor(data, f, accuracy){
    this.data = data;
    this.f = f;
    this.accuracy = accuracy;
    this.errorMessage = "";
    this.solveSystem();
  }

  forwardStroke(errorMessage = "")
  {
    for(let i = 0; i < this.data.length; i++){
      if(!this.data[i][i])
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
      for (let j = 0; j < this.data.length; j++) { // получение первой единицы
        this.data[j][i] /= this.data[i][i]
      }
      console.log(this.data)

      for(let j = i + 1; j < this.data.length; j++) // получаем нули
      {
        let coef = this.data[j][i] / this.data[i][i];
        this.data[j][i] -= this.data[i][i] * coef;
      }

    }
    this.check(errorMessage);
    for (let i = 0; i < this.data.length; i++) { // пелим последнюю строку на последнее число
      for (let j = 0; j < this.data.length; j++) {
        this.data[this.data.length - 1][j] /= this.data[this.data.length - 1][this.data.length - 1]
      }
    }
  }


  check(errorMessage = ""){
    for(let i = 0; i < this.data.length; i++)
    {
      for (let j = 0; j < this.data.length; j++)
      {
        if(this.data[i] == this.data[j])
        {
          errorMessage = "something wrong";
          return;
        }
      }
    }
  }

  reverseStroke(errorMessage = "")
  {
    for(let i = this.data.length - 1; i > 0; i--)
    {
      for(let j = i - 1; j >= 0; j--)
      {
        let coef = this.data[j][i] / this.data[i][i];
        this.data[j][i] -= this.data[i][i] * coef;
      }
    }
  }
  swapRows(currentIndex){
    if(currentIndex == this.data.length - 1)
    {
      return false;
    }
    let maxValue = this.data[currentIndex + 1][currentIndex];
    let swapIndex = currentIndex + 1;

    for (let i = currentIndex + 2; i < this.data.length; i++)
    {
      if(this.data[i][currentIndex] && maxValue < this.data[i][currentIndex])
      {
        maxValue = this.data[i][currentIndex];
        swapIndex = i;
      }
    }
    if(!maxValue)
    {
      return false;
    }
    swap(this.data[currentIndex], this.data[swapIndex]);
    return true;
  }
  swapColums(currentIndex){
    if(currentIndex == this.data.length - 1)
    {
      return false;
    }
    let maxValue = this.data[currentIndex ][currentIndex + 1];
    let swapIndex = currentIndex + 1;

    for (let i = currentIndex + 2; i < this.data.length; i++)
    {
      if(this.data[currentIndex][i] && maxValue < this.data[currentIndex][i])
      {
        maxValue = this.data[currentIndex][i];
        swapIndex = i;
      }
    }
    if(!maxValue)
    {
      return false;
    }
    for (let i = 0; i < this.data.length; i++) {
      swap(this.data[i][currentIndex], this.data[i][swapIndex]);

    }
    return true;
  }
  isSquare()
  {
    return this.data.length ? this.data.length === this.data[0].length : false
  }
  solveSystem(errorMessage = ""){

    errorMessage = "";
    if(f.length != this.data.length)
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
    e.length = this.f.length;
    let prevX = [];
    prevX.length = this.f.length;
    let x = [];
    x.length = this.f.length;

    for (let i = 0; i < this.f.length; i++) {
      e[i] = 0;
      x[i] = 0;
      prevX[i] = 0;
    }

    for (let i = 0; i < this.data.length; i++) {
      this.data[i].push(this.f[i])
    }
    let fLength = 4
      do
      {
        this.forwardStroke(errorMessage);
        // if(errorMessage.length)
        // {
        //   return errorMessage;
        // }
        // console.log(this.data);
        // console.log(originMatrix)
        this.reverseStroke(errorMessage);
        // if(errorMessage.length)
        // {
        //   return errorMessage;
        // }

        this.check(errorMessage);
        // if(errorMessage.length)
        // {
        //   return errorMessage;
        // }
        for (let i = 0; i < this.data.length; i++) {
          e[i] = this.data[i][this.data.length];

        }

        for (let i = 0; i < this.data.length; i++) {
          x[i] = prevX[i] + e[i];
        }

        for (let i = 0; i < originF.length; i++) {
          for (let j = 0; j < x.length; j++) {
            originF[i] -= originMatrix[i][j] * x[j];
          }
        }

        for (let i = 0; i < this.data.length; i++) {
          this.data[i][this.data.length] = originF[i];
        }

        prevX = e.slice();

        fLength--;

      } while (fLength); // TODO: Написать условие проверки меньше чем accuracy
      console.log(x)
  }
  getDiscrepancy(){
    let tempMatrix = matrix.slice();

    for (let i = 0; i < tempMatrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        f[i] -= matrix[i][j] * x[j]
      }
    }
    return f;
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
let originMatrix = [
  [30.1, -1.4, 10, -1.5],
  [-3.3, 1.1, 30.1, -20.1],
  [7.5, 1.3, 1.1, 10],
  [1.7, 7.5, -1.8, 2.1]
];
let accuracy = 0.001;
let f = [10, 1.3, 10, 1.7]
let originF = [10, 1.3, 10, 1.7];




const Gauss = new Matrix(matrix, f, accuracy);
