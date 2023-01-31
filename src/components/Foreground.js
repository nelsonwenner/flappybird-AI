import foreground from "../assets/images/foreground.png"

/**
 * Foreground is a class that represents the foreground in a game.
 * @class Foreground
 */
export default class Foreground {
  /**
   * The width of the foreground sprite.
   * @memberof Foreground
   */
  wigth = 1200

  /**
   * The height of the foreground sprite.
   * @memberof Foreground
   */
  height = 150

  /**
   * The speed at which the foreground moves.
   * @memberof Foreground
   */
  speed = 3

  /**
   * Creates an instance of Foreground.
   * @param {Number} x - The x-coordinate of the foreground sprite.
   * @param {Number} y - The y-coordinate of the foreground sprite.
   * @param {CanvasRenderingContext2D} context - The 2D rendering context of the canvas.
   * @memberof Foreground
   */
  constructor(x, y, context) {
    this.context = context
    this.x = x
    this.y = y
    this.sprite = this._loadSprite()
  }

  /**
   * Load the foreground sprite.
   * @returns {Image} The foreground sprite.
   * @memberof Foreground
   */
  _loadSprite = () => {
    let sprite = new Image()
    sprite.src = foreground
    return sprite
  }

  /**
   * Draws the foreground sprite.
   * @memberof Foreground
   */
  draw = () => {
    this.context.drawImage(this.sprite, this.x, this.y, this.wigth, this.height)
    this.context.drawImage(
      this.sprite,
      this.x + this.wigth,
      this.y,
      this.wigth,
      this.height
    )
  }

  /**
   * Updates the position of the foreground sprite.
   * @memberof Foreground
   */
  update = () => {
    this.x = (this.x - this.speed) % (this.wigth / 2)
  }
}
