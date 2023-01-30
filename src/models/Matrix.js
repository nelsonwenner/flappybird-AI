/* eslint-disable no-unused-vars */
export default class Matrix {
  /**
   * Creates a 2D array of rows x columns
   * @constructor
   * @param {number} rows - The number of rows in the matrix
   * @param {number} columns - The number of columns in the matrix
   */
  constructor(rows, columns) {
    this.rows = rows
    this.columns = columns
    this.data = []
    this._build()
  }

  /**
   * Initializes the matrix with random values between -1 and 1
   * @private
   */
  _build = () => {
    for (let i = 0; i < this.rows; i++) {
      let data = []
      for (let j = 0; j < this.columns; j++) {
        data.push(2 * Math.random() - 1)
      }
      this.data.push(data)
    }
  }

  /**
   * Executes a callback function on each element in the matrix
   * @param {function} func - The callback function to execute
   * @returns {Matrix} - The matrix
   */
  map = (func) => {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.data[i][j] = func(this.data[i][j], i, j)
      }
    }

    return this
  }

  /**
   * Randomizes the values of the matrix between -1 and 1
   */
  randomize = () => {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.data[i][j] = 2 * Math.random() - 1
      }
    }
  }

  /**
  * Calculates the dot product of two matrices
  * @static
  * @param {Matrix} matrix_a - The first matrix
  * @param {Matrix} matrix_b - The second matrix
  * @returns {Matrix} - The resulting matrix
  */
  static dot = (matrixA, matrixB) => {
    let matrix = new Matrix(matrixA.rows, matrixB.columns);

    matrix.map((elm, i, j) => {
      let sum = 0;
      for (let k = 0; k < matrixA.columns; k++){
        let elm1 = matrixA.data[i][k]
        let elm2 = matrixB.data[k][j]
        sum += elm1 * elm2
      }
      return sum
    })
    return matrix
  }

  /**
   * Adds bias to the given matrix.
   *
   * @param {Matrix} a - The first matrix.
   * @param {Matrix} b - The second matrix.
   * @returns {Matrix} The result matrix after adding the biases.
   */
  static addBias = (a, b) => {
    let matrix = new Matrix(a.rows, b.columns)
      matrix.map((elm, i, j) => {
        return a.data[i][j] + b.data[i][j]
      })
    return matrix
  }

  /**
   * Crossover function to create a new matrix from two parent matrices.
   * @param {Matrix} partner - The partner matrix to create a child matrix with.
   * @returns {Matrix} The child matrix created from the crossover.
   */
  crossover = (partner) => {
    let child = new Matrix(this.rows, this.columns)

    const sliceR = Math.floor(Math.random(this.rows))
    const sliceC = Math.floor(Math.random(this.columns))

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (i < sliceR || (i == sliceR && j <= sliceC)) {
          child.data[i][j] = this.data[i][j]
        } else {
          child.data[i][j] = partner.data[i][j]
        }
      }
    }
    return child
  }

  /**
   * Mutate function to randomly modify values in the matrix.
   * @param {number} mutationRate - The rate at which values in the matrix will be modified.
   */
  mutate = (mutationRate) => {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (mutationRate > Math.random(1)) {
          this.data[i][j] += 2 * Math.random() - 1
        }
      }
    }
  }

  /**
   * Static function to create a matrix from an array.
   * @param {Array} array - The array to create a matrix from.
   * @returns {Matrix} The matrix created from the input array.
   */
  static arrayForMatrix = (array) => {
    let matrix = new Matrix(array.length, 1)
    matrix.map((elm, i, j) => array[i])
    return matrix
  }

  /**
   * Convert the matrix to an array.
   * @returns {Array} An array representation of the matrix.
   */
  toArray = () => {
    let array = []
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        array.push(this.data[i][j])
      }
    }
    return array
  }
}
