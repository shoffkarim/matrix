matrix = [
  [30.1, -1.4, 10, -1.5],
  [-3.3, 1.1, 30.1, -20.1],
  [7.5, 1.3, 1.1, 10],
  [1.7, 7.5, -1.8, 2.1]
];

class Matrix{
  constructor(){
    this.forwardStroke();
    //this.output();
  }


  forwardStroke(errorMessage = ""){

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

      
      console.log(matrix);
      for(let j = i + 1; j <matrix.length; j++)
      {
        matrix[i][j] /= matrix[i][i]
        let coef = matrix[j][i] / matrix[i][i];
        console.log(coef);
        matrix[j] -= matrix[i] * coef;
      }
      console.log(matrix);
    }
    this.check(errorMessage);
  }
  check(errorMessage = ""){
    for(let i = 0; i < this.matrix.length; i++)
    {
      for (let j = 0; j < this.matrix.length; j++)
      {
        if(this.matrix[i] == this.matrix[j])
        {
          errorMessage = "something wrong";
          return;
        }
      }
    }
  }
  swapRows(currentIndex){
    if(currentIndex == this.matrix.length - 1)
    {
      return false;
    }
    let maxValue = this.matrix[currentIndex + 1][currentIndex];
    let swapIndex = currentIndex + 1;

    for (let i = currentIndex + 2; i < this.matrix.length; i++)
    {
      if(this.matrix[i][currentIndex] && maxValue < this.matrix[i][currentIndex])
      {
        maxValue = this.matrix[i][currentIndex];
        swapIndex = i;
      }
    }
    if(!maxValue)
    {
      return false;
    }
    swap(this.matrix[currentIndex], this.matrix[swapIndex]);
    return true;
  }
  swapColums(currentIndex){
    if(currentIndex == this.matrix.length - 1)
    {
      return false;
    }
    let maxValue = this.matrix[currentIndex ][currentIndex + 1];
    let swapIndex = currentIndex + 1;

    for (let i = currentIndex + 2; i < this.matrix.length; i++)
    {
      if(this.matrix[currentIndex][i] && maxValue < this.matrix[currentIndex][i])
      {
        maxValue = this.matrix[currentIndex][i];
        swapIndex = i;
      }
    }
    if(!maxValue)
    {
      return false;
    }
    for (let i = 0; i < this.matrix.length; i++) {
      cswap(this.matrix[i][currentIndex], this.matrix[i][swapIndex]);

    }
    return true;
  }
  // solveSystem(f, errorMessage, accuracy){
  //   errorMessage = " ";
  //   if(f.length != this.matrix.length)
  //   {
  //     errorMessage = "Не квадратная";
  //     return errorMessage;
  //   }

  // }
  // output(){
  //   console.log(this.matrix);
  //   console.log(f);
  // }

}

function swap(a, b) {
  let c = b;
  b = a;
  a = c;
}

let f = [10, 1.3, 10, 1.7]

let originf = f;


const Gauss = new Matrix();
