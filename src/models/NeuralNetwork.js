import Matrix from "./Matrix"

/**
 * Class representing a neural network
 */
export default class NeuralNetwork {
  /**
   * Array of weight matrices between the input and hidden layer,
   * and hidden and output layer respectively
   */
  weights = []

  /**
   * Array of bias matrices for the hidden and output layer respectively
   */
  bias = []

  /**
   * Creates a new neural network instance
   * @param {number} inputNode - number of input nodes
   * @param {number} hiddenNode - number of hidden nodes
   * @param {number} outputNode - number of output nodes
   */
  constructor(inputNode, hiddenNode, outputNode) {
    /**
     * Number of input nodes
     */
    this.inputNode = inputNode

    /**
     * Number of hidden nodes
     */
    this.hiddenNode = hiddenNode

    /**
     * Number of output nodes
     */
    this.outputNode = outputNode

    /**
     * Initialize weight matrices between input and hidden layer, and hidden and output layer
     */
    this.weights[0] = new Matrix(this.hiddenNode, this.inputNode)
    this.weights[1] = new Matrix(this.outputNode, this.hiddenNode)

    /**
     * Initialize bias matrices for hidden and output layer
     */
    this.bias[0] = new Matrix(this.hiddenNode, 1)
    this.bias[1] = new Matrix(this.outputNode, 1)

    /**
     * Randomize values for weight and bias matrices
     */
    this.weights.forEach((weight) => weight.randomize())
    this.bias.forEach((bias) => bias.randomize())
  }

  /**
   * Rectified linear activation function
   * @param {number} x - input value
   * @returns {number} - rectified value (max of 0 and input value)
   */
  relu = (x) => {
    return Math.max(0, x)
  }

  /**
   * Calculates the output of the neural network for a given input
   * @param {Array} input - array of input values
   * @returns {Array} - array of output values
   */
  feedforward = (input) => {
    /**
     * Convert input array to matrix
     */
    let inputMatrix = Matrix.arrayForMatrix(input)

    /**
     * Calculate hidden layer output
     */
    let hidden = Matrix.dot(this.weights[0], inputMatrix)
    hidden = Matrix.addBias(hidden, this.bias[0])
    hidden.map(this.relu)

    /**
     * Calculate output layer output
     */
    let output = Matrix.dot(this.weights[1], hidden)
    output = Matrix.addBias(output, this.bias[1])
    output.map(this.relu)

    /**
     * Convert output matrix to array and return
     */
    return output.toArray()
  }

  /**
   * Creates a new neural network by combining two existing neural networks (the current instance and the brainPartner).
   * @param {NeuralNetwork} brainPartner - The neural network to combine with the current instance.
   * @returns {NeuralNetwork} The child brain resulting from the combination of the two neural networks.
   */
  crossover = (brainPartner) => {
    let childBrain = new NeuralNetwork(
      this.inputNode,
      this.hiddenNode,
      this.outputNode
    )

    for (let i = 0; i < this.weights.length; i++) {
      childBrain.weights[i] = this.weights[i].crossover(brainPartner.weights[i])
    }

    for (let k = 0; k < this.bias.length; k++) {
      childBrain.bias[k] = this.bias[k].crossover(brainPartner.bias[k])
    }

    return childBrain
  }

  /**
   * Mutation function to mutate the weights and biases of the neural network
   * @param {Number} mutationRate - The rate of mutation
   */
  mutation = (mutationRate) => {
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i].mutate(mutationRate)
    }

    for (let k = 0; k < this.bias.length; k++) {
      this.bias[k].mutate(mutationRate)
    }
  }
}
