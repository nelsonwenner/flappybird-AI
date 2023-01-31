import pipe01 from "../assets/images/pipe01.png"
import pipe02 from "../assets/images/pipe02.png"

export default class Pipe {
  /**
   * width of pipe sprite
   * @type {Number}
   */
  width = 66

  /**
   * height of pipe sprite
   * @type {Number}
   */
  height = 500

  /**
   * array of pipe position
   * @type {Array}
   */
  position = []

  /**
   * gap between top and bottom pipes
   * @type {Number}
   */
  gap = 130

  /**
   * maximum position of the pipes
   * @type {Number}
   */
  maxPos = -150

  /**
   * speed of the pipes
   * @type {Number}
   */
  speed = 3

  /**
   * score of the game
   * @type {Number}
   */
  score = 0

  /**
   * constructor to initialize class properties
   * @param {Number} x - x-coordinate of pipe
   * @param {Number} y - y-coordinate of pipe
   * @param {Object} context - canvas context object
   */
  constructor(x, y, context) {
    this.context = context
    this.x = x
    this.y = y
    this.spritePipe = []
    this.loadSprite()
  }

  /**
   * function to load pipe sprites
   */
  loadSprite = () => {
    [pipe01, pipe02].forEach((pipe) => {
      let sprite = new Image()
      sprite.src = pipe
      this.spritePipe.push(sprite)
    })
  }

  /**
   * function to draw pipes on canvas
   */
  draw = () => {
    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i]

      let topYPos = p.y
      let bottomYPos = p.y + this.height + this.gap

      this.context.drawImage(
        this.spritePipe[0],
        p.x,
        topYPos,
        this.width,
        this.height
      )
      this.context.drawImage(
        this.spritePipe[1],
        p.x,
        bottomYPos,
        this.width,
        this.height
      )
    }
  }

  /**
   * function to update position of pipes
   * @param {Number} frame - current frame of game
   */
  update = (frame) => {
    /* time a new pipe will be created */
    if (frame % 70 == 0) {
      this.position.push({
        x: 1200,
        y: this.maxPos * ((Math.random() + 1) * Math.random() + 1),
      })
    }

    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i]

      p.x -= this.speed

      if (p.x + this.width <= 0) {
        this.score++
        this.position.shift()
      }
    }

    return this
  }

  /**
   * function to reset pipes
   */
  resetPipes = () => {
    this.position = []
  }
}
