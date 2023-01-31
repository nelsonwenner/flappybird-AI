import { describe, expect, it } from "@jest/globals"
import NeuralNetwork from "@/models/NeuralNetwork"

describe("NeuralNetwork", () => {
  it("constructor should set the weights and bias", () => {
    let neuralNetwork = new NeuralNetwork(1, 2, 3)
    expect(neuralNetwork.weights[0].rows).toEqual(2)
    expect(neuralNetwork.weights[0].columns).toEqual(1)
    expect(neuralNetwork.weights[1].rows).toEqual(3)
    expect(neuralNetwork.weights[1].columns).toEqual(2)
    expect(neuralNetwork.bias[0].rows).toEqual(2)
    expect(neuralNetwork.bias[0].columns).toEqual(1)
    expect(neuralNetwork.bias[1].rows).toEqual(3)
    expect(neuralNetwork.bias[1].columns).toEqual(1)
  })

  it("relu should return the max of 0 and the provided number", () => {
    let neuralNetwork = new NeuralNetwork(1, 2, 3)
    expect(neuralNetwork.relu(0)).toEqual(0)
    expect(neuralNetwork.relu(-10)).toEqual(0)
    expect(neuralNetwork.relu(5)).toEqual(5)
  })

  it("feedforward should return the correct output", () => {
    let neuralNetwork = new NeuralNetwork(2, 2, 1)
    let input = [1, 2]
    let output = neuralNetwork.feedforward(input)
    expect(output.length).toEqual(1)
  })

  it("crossover should create a new neural network with the correct weights and bias", () => {
    let neuralNetwork1 = new NeuralNetwork(1, 2, 3)
    let neuralNetwork2 = new NeuralNetwork(1, 2, 3)
    let childBrain = neuralNetwork1.crossover(neuralNetwork2)
    expect(childBrain.weights[0].rows).toEqual(2)
    expect(childBrain.weights[0].columns).toEqual(1)
    expect(childBrain.weights[1].rows).toEqual(3)
    expect(childBrain.weights[1].columns).toEqual(2)
    expect(childBrain.bias[0].rows).toEqual(2)
    expect(childBrain.bias[0].columns).toEqual(1)
    expect(childBrain.bias[1].rows).toEqual(3)
    expect(childBrain.bias[1].columns).toEqual(1)
  })

  it("mutation should mutate the weights and bias with the given mutation rate", () => {
    let neuralNetwork = new NeuralNetwork(1, 2, 3)
    let mutationRate = 1
    neuralNetwork.mutation(mutationRate)
    let weightBeforeMutation = neuralNetwork.weights[0].data[0][0]
    let biasBeforeMutation = neuralNetwork.bias[0].data[0][0]
    neuralNetwork.mutation(mutationRate)
    let weightAfterMutation = neuralNetwork.weights[0].data[0][0]
    let biasAfterMutation = neuralNetwork.bias[0].data[0][0]
    expect(weightBeforeMutation).not.toEqual(weightAfterMutation)
    expect(biasBeforeMutation).not.toEqual(biasAfterMutation)
  })
})
