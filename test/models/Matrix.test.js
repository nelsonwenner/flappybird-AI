import {describe, expect, it} from "@jest/globals"
import Matrix from "@/models/Matrix"

describe("Matrix", () => {
  it("constructor should build the matrix", () => {
    let matrix = new Matrix(2, 3)
    expect(matrix.data.length).toBe(2)
    expect(matrix.data[0].length).toBe(3)
  })

  it("map should return the matrix", () => {
    let matrix = new Matrix(2, 3)
    let returnedMatrix = matrix.map(() => {})
    expect(returnedMatrix).toBe(matrix)
  })

  it("randomize should randomize the matrix", () => {
    let matrixFirst = new Matrix(2, 3)
    let matrixSecond = new Matrix(2, 3)
    matrixFirst.randomize()
    let m1 = matrixFirst.data
    let m2 = matrixSecond.data
    expect(m1).not.toEqual(m2)
  })

  it("crossover should return a new matrix", () => {
    let matrix1 = new Matrix(2, 3)
    let matrix2 = new Matrix(2, 3)
    let child = matrix1.crossover(matrix2)
    expect(child).not.toBe(matrix1)
    expect(child).not.toBe(matrix2)
  })

  it("mutate should mutate the matrix", () => {
    let matrix = new Matrix(2, 3)
    let m1 = Object.fromEntries(matrix.data)
    matrix.mutate(1)
    let m2 = Object.fromEntries(matrix.data)
    expect(m1).not.toEqual(m2)
  })

  it("arrayForMatrix should return a matrix", () => {
    let array = [1, 2, 3]
    let matrix = Matrix.arrayForMatrix(array)
    expect(matrix.rows).toBe(3)
    expect(matrix.columns).toBe(1)
    expect(matrix.data).toEqual([[1], [2], [3]])
  })

  it("toArray should return an array", () => {
    let matrix = new Matrix(2, 3)
    let array = matrix.toArray()
    expect(array.length).toBe(6)
  })

  it("should return the resulting matrix from adding the two matrices, with the bias of the second matrix added to the first matrix", () => {
    let matrixA = new Matrix(3, 4)
    let matrixB = new Matrix(3, 4)
  
    matrixA.data = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
    matrixB.data = [[13, 14, 15, 16], [17, 18, 19, 20], [21, 22, 23, 24]]

    let expectedResult = new Matrix(3, 4)
    expectedResult.data = [[14, 16, 18, 20], [22, 24, 26, 28], [30, 32, 34, 36]]

    const biasResult = Matrix.addBias(matrixA, matrixB)

    expect(biasResult.data).toEqual(expectedResult.data)
  })

  it('dot product of two matrices', () => {
    let matrixA = new Matrix(2, 2)
    let matrixB = new Matrix(2, 2)
  
    matrixA.data = [[1, 2], [3, 4]]
    matrixB.data = [[5, 6], [7, 8]]

    let expectedResult = new Matrix(2, 2)
    expectedResult.data = [[19, 22], [43, 50]]

    let dotResult = Matrix.dot(matrixA, matrixB)
    expect(dotResult.data).toEqual(expectedResult.data)
  })
})
