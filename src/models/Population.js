import { randomForInterval, newMap } from "../utils/utils"
import Bird from "./Bird"

/**
 * Class representing a population of birds.
 */
export default class Population {
  /**
   * The generation of the population.
   */
  generation = 1

  /**
   * The breeding pool of birds.
   */
  breedingPool = []

  /**
   * The mutation rate.
   */
  rateMutation = 0.03

  /**
   * The brain of the best bird.
   */
  bestBirdBrain = null

  /**
   * The fitness of the best bird.
   */
  bestFitness = 0

  /**
   * The number of birds that have passed over.
   */
  birdsOver = 0

  /**
   * Creates a population of birds.
   * @param {Number} populationSize - The size of the population.
   * @param {Object} pipe - The pipe for the birds to interact with.
   * @param {Object} canvas - The canvas for the birds to be drawn on.
   * @param {Object} context - The context of the canvas.
   */
  constructor(populationSize, pipe, canvas, context) {
    this.populationSize = populationSize
    this.context = context
    this.canvas = canvas
    this.pipe = pipe
    this.birds = []
    this.bestBird = null
    this.birdBuild()
  }

  /**
   * Creates a new population of birds.
   */
  birdBuild = () => {
    for (let i = 0; i < this.populationSize; i++) {
      this.birds[i] = new Bird(
        randomForInterval(100, 350),
        randomForInterval(100, 400),
        this.context
      )
    }
  }

  /**
   * The evaluate method calculates the fitness of each bird in the current generation. 
   * It first loops through all birds and calculates each bird's fitness by calling 
   * the calculateFitness method. Then, it normalizes the fitness values by dividing 
   * each bird's fitness by the sum of all birds' fitness. This ensures that the fitness 
   * values are relative to each other and sum up to 1.
   */
  evaluate = () => {
    let sum = 0

    for (let i = 0; i < this.birds.length; i++) {
      this.birds[i].calculateFitness()
      sum += this.birds[i].fitness
    }

    for (let k = 0; k < this.birds.length; k++) {
      this.birds[k].fitness /= sum
    }
  }

  /**
   * The calcBestFitness method calculates the best fitness among all birds in the current generation. 
   * It loops through all birds and finds the one with the highest fitness. It also keeps track of 
   * the best fitness and best bird's brain ever seen, updating the values if a better bird is found. 
   * Finally, it returns the best fitness of the current generation.
   * @returns {number} bestFitness - the best fitness of the current population.
   */
  calcBestFitness = () => {
    let bestFitness = 0
    let bestBirdBrain = null
    for (let i = 0; i < this.birds.length; i++) {
      if (this.birds[i].fitness > bestFitness) {
        bestFitness = this.birds[i].fitness
        bestBirdBrain = this.birds[i]
      }
    }

    if (this.bestFitness < bestFitness) {
      this.bestBirdBrain = bestBirdBrain
      this.bestFitness = bestFitness
    }

    return bestFitness
  }

  /**
   * The selectNatural method creates the breeding pool for the next generation of birds. 
   * It first calculates the best fitness among all birds in the current generation, 
   * and then creates the breeding pool by assigning more opportunities for birds 
   * with higher fitness. The method does this by mapping each bird's fitness 
   * value to a value between 0 and 1, and then uses this mapped value to 
   * determine how many times the bird should be added to the breeding pool. 
   * The higher the fitness, the more times the bird will be added to the breeding pool. 
   * This way, birds with higher fitness are more likely to be selected as partners for the next generation.
   */
  selectNatural = () => {
    let bestFitness = this.calcBestFitness()
    for (let i = 0; i < this.birds.length; i++) {
      let fitness = newMap(this.birds[i].fitness, 0, bestFitness, 0, 1)
      let index = Math.floor(fitness * 100)
      for (let j = 0; j < index; j++) {
        this.breedingPool.push(this.birds[i])
      }
    }
  }

  /**
   * Repopulates the birds in the population.
   */
  repopulation = () => {
    this.selectNatural()

    for (let i = 0; i < this.birds.length; i++) {
      let indexA = randomForInterval(0, this.breedingPool.length)
      let indexB = randomForInterval(0, this.breedingPool.length)

      let partnerA = this.breedingPool[indexA]
      let partnerB = this.breedingPool[indexB]

      let newBrain = partnerA.brain.crossover(partnerB.brain)

      newBrain.mutation(this.rateMutation)

      let newBird = new Bird(
        randomForInterval(100, 350),
        randomForInterval(100, 400),
        this.context
      )

      newBird.addNewBrain(newBrain)

      this.birds[i] = newBird
    }
    this.generation += 1
    this.breedingPool = []
  }

  /**
   * Draws the birds in the population.
   */
  birdDraw = () => {
    for (let i = 0; i < this.populationSize; i++) {
      this.birds[i].draw()
    }
  }

  /**
   * Updates the birds in the population.
   * @param {Number} frame - The current frame number.
   * @param {Object} pipe - The pipe for the birds to interact with.
   */
  birdUpdate = (frame, pipe) => {
    for (let i = 0; i < this.populationSize; i++) {
      if (!this.birds[i].death) {
        /* Brain */
        this.birds[i].think(pipe)
        this.birds[i].predict()

        this.birds[i].distance += 1
        this.birds[i].score = pipe.score

        this.birds[i].update()
        this.birds[i].collision(pipe)
        this.birds[i].flap(frame)
      }

      if (this.birds[i].death) {
        this.birds[i].update()
      }
    }
  }
}
