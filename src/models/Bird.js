import { randomForInterval } from "../utils/utils"
import NeuralNetwork from "./NeuralNetwork"
import bird1 from "../assets/images/bird1.png"
import bird2 from "../assets/images/bird2.png"
import bird3 from "../assets/images/bird3.png"
import bird4 from "../assets/images/bird4.png"
import bird5 from "../assets/images/bird5.png"
import bird6 from "../assets/images/bird6.png"
import bird7 from "../assets/images/bird7.png"
import bird8 from "../assets/images/bird8.png"
import bird9 from "../assets/images/bird9.png"
import bird10 from "../assets/images/bird10.png"
import bird11 from "../assets/images/bird11.png"
import bird12 from "../assets/images/bird12.png"
import bird13 from "../assets/images/bird13.png"
import bird14 from "../assets/images/bird14.png"
import bird15 from "../assets/images/bird15.png"
import bird16 from "../assets/images/bird16.png"
import bird17 from "../assets/images/bird17.png"
import bird18 from "../assets/images/bird18.png"
import bird19 from "../assets/images/bird19.png"
import bird20 from "../assets/images/bird20.png"
import bird21 from "../assets/images/bird21.png"

export default class Bird {
  weith = 40
  height = 36

  speed = 0
  gravity = 0.25
  birdJump = 4.6

  rotation = 0
  radius = 12

  score = 0
  fitness = 0
  distance = 0

  animation = [[], [], [], [], [], []]

  input = [0, 0, 0, 0, 0, 0, 0]

  /**
   * Bird class contains bird attributes such as its position, speed, score and fitness and is used to create new birds and manipulate their actions.
   *
   * @property {number} weith - width of the bird
   * @property {number} height - height of the bird
   * @property {number} speed - speed of the bird
   * @property {number} gravity - gravity affecting the bird
   * @property {number} birdJump - jumping speed of the bird
   * @property {number} rotation - rotation angle of the bird
   * @property {number} radius - the radius of the bird
   * @property {number} score - the score of the bird
   * @property {number} fitness - fitness value of the bird
   * @property {number} distance - distance traveled by the bird
   * @property {Array} animation - multi-dimensional array containing bird animations
   * @property {Array} input - inputs to the Neural Network
   *
   * @param {number} x - x position of the bird
   * @param {number} y - y position of the bird
   * @param {object} context - canvas context object
   */
  constructor(x, y, context) {
    this.brain = new NeuralNetwork(7, 22, 1)
    this.x = x
    this.y = y
    this.DEGREE = Math.PI / 180
    this.context = context
    this.frame = 0
    this.death = false
    this.birdIndexColor = randomForInterval(0, 5)
    this._loadBird()
  }

  /**
   * Loads bird sprites into the animation array
   *
   * @private
   */
  _loadBird = () => {
    let count = 1
    let index = 0

    const sprites = [
      bird1,
      bird2,
      bird3,
      bird4,
      bird5,
      bird6,
      bird7,
      bird8,
      bird9,
      bird10,
      bird11,
      bird12,
      bird13,
      bird14,
      bird15,
      bird16,
      bird17,
      bird18,
      bird19,
      bird20,
      bird21,
    ]

    sprites.forEach((bird) => {
      if (count <= 3) {
        let sprite = new Image()
        sprite.src = bird
        this.animation[index].push({ current: sprite })
        count++
      } else {
        count = 1
        index++
      }
    })
  }

  /**
   * Adds a new brain to the bird
   *
   * @param {object} brain - instance of NeuralNetwork class
   *
   * @returns {object} - returns the current instance
   */
  addNewBrain = (brain) => {
    this.brain = brain
    return this
  }

  /**
   * draw() - This function draws the bird using the current frame and bird index color
   *
   * @returns {void}
   */
  draw = () => {
    let bird = this.animation[this.birdIndexColor][this.frame]
    this.context.save()
    this.context.translate(this.x, this.y)
    this.context.rotate(this.rotation)
    this.context.drawImage(
      bird.current,
      -this.weith / 2,
      -this.height / 2,
      this.weith,
      this.height
    )
    this.context.restore()
  }

  /**
   * update - updates the state of the bird
   *
   * @returns {void}
   */
  update = () => {
    this.speed += this.gravity
    this.y += this.speed

    /* size foreground 80 */
    if (this.y + this.weith / 2 >= 690 - 80) {
      this.y = 690 - 80
    }

    if (this.speed >= this.birdJump) {
      this.rotation = 90 * this.DEGREE
      this.frame = 1
    } else {
      this.rotation = -25 * this.DEGREE
    }

    /* Touched the top */
    if (this.y < 21) {
      this.death = true
      this.y += 1
    }

    /* Touched the bottom */
    if (this.y == 610) {
      this.death = true
      this.x -= 3
    }
  }

  jump = () => {
    this.speed = -this.birdJump
  }

  flap = (frame) => {
    if (frame % 10 == 0) {
      this.frame++
      if (this.frame == 2) {
        this.frame = 0
      }
    }
  }

  speedReset = () => {
    this.speed = 0
  }

  collision = (pipe) => {
    let currentPipe = this.findClosestPipe(pipe)

    if (pipe.position.length) {
      let bottomPipePos = currentPipe.y + pipe.height + pipe.gap

      /* Pipe Top */
      if (
        this.x + this.radius > currentPipe.x &&
        this.x - this.radius < currentPipe.x + pipe.width &&
        this.y + this.radius > currentPipe.y &&
        this.y - this.radius < currentPipe.y + pipe.height
      ) {
        this.death = true
      }

      /* Pipe Bottom */
      if (
        this.x + this.radius > currentPipe.x &&
        this.x - this.radius < currentPipe.x + pipe.width &&
        this.y + this.radius > bottomPipePos &&
        this.y - this.radius < bottomPipePos + pipe.height
      ) {
        this.death = true
      }
    }
  }

  calculateFitness = () => {
    this.fitness = Math.pow(2, this.score) + this.distance ** 2
  }

  findClosestPipe = (pipe) => {
    let low = 9999999
    let currentPipe = null

    for (let i = 0; i < pipe.position.length; i++) {
      if (
        pipe.position[i].x < low &&
        pipe.position[i].x + pipe.width > this.x + this.radius
      ) {
        low = pipe.position[i].x

        currentPipe = {
          x: pipe.position[i].x,
          y: pipe.position[i].y,
          gap: pipe.gap,
        }
      }
    }

    return currentPipe
  }

  think = (pipe) => {
    if (pipe.position.length) {
      let currentPipe = this.findClosestPipe(pipe)

      /* 1. horizontal distance from the start of pipe */

      let dist1 = currentPipe.x - (this.x + this.radius)
      dist1 = dist1 / 1200

      this.input[0] = dist1

      /* 2. horizontal distance from the end of pipe */

      let dist2 = currentPipe.x + 66 - (this.x + this.radius)
      dist2 = dist2 / 1200

      this.input[1] = dist2

      /* 3. vertical distance from the upper pipe */

      let dist3 = this.x - this.radius - (currentPipe.y - currentPipe.gap)
      dist3 = dist3 / 690

      this.input[2] = dist3

      /* 4. verical distance from the lower pipe */

      let dist4 = this.y + this.radius - currentPipe.y
      dist4 = dist4 / 690

      this.input[3] = dist4

      /* 5. y velocity of bird */

      let ySpeed = this.speed
      ySpeed = ySpeed / 690

      this.input[4] = ySpeed

      /* 6. vertical distance from upper wall */

      let seeDist1 = this.y - this.radius
      seeDist1 = seeDist1 / 690

      this.input[5] = seeDist1

      /* 7. vertical distance from ground */

      let seeDist2 = this.y + this.radius - 690
      seeDist2 = seeDist2 / 690

      this.input[6] = seeDist2
    }
  }

  predict = () => {
    let output = this.brain.feedforward(this.input)

    if (output[0] > 0.0) {
      this.jump()
    }
  }
}
