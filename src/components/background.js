import bg from "../assets/images/bg1.png"

export const background = (context, width, height, x, y) => {
  let spritBackground = new Image()
  spritBackground.src = bg
  context.fillStyle = "#70c5ce"
  context.drawImage(spritBackground, x, y, width, height)
}
