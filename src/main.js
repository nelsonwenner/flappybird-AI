import { background } from "./components/background"
import Foreground from "./components/Foreground"
import Population from "./models/Population"
import Pipe from "./components/Pipe"

class Main {
  width = 1200
  height = 690

  constructor() {
    this.context = this.createCanvas()
    this.canvas = document.getElementById("canvas")
    this.foreground = new Foreground(0, 620, this.context)
    this.pipe = new Pipe(0, 0, this.context)
    this.population = new Population(512, this.pipe, this.canvas, this.context)
    this.frame = 0
    this.start()
  }

  start = () => {
    this.loop()
  }

  createCanvas = () => {
    let canvas = document.createElement("canvas")
    canvas.setAttribute("id", "canvas")
    canvas.width = this.width
    canvas.height = this.height
    document.body.appendChild(canvas)
    return canvas.getContext("2d")
  }

  loop = () => {
    this.update()
    this.draw()
    this.frame++

    window.requestAnimationFrame(this.loop)
  }

  checkGameOver = () => {
    this.count = 512
    for (let i = 0; i < this.population.birds.length; i++) {
      if (this.population.birds[i].death) {
        this.count--
      }
      if (this.count == 0) {
        console.log("Repopulation...")
        this.currentPipe.score = 0
        this.population.evaluate()
        this.population.repopulation()
        this.pipe.resetPipes()
      }
    }
  }

  update = () => {
    this.checkGameOver()
    this.foreground.update()
    this.currentPipe = this.pipe.update(this.frame)
    this.population.birdUpdate(this.frame, this.currentPipe)
  }

  draw = () => {
    background(this.context, this.width, this.height, 0, -70)
    this.pipe.draw()
    this.foreground.draw()
    this.population.birdDraw()
    this.getBestFitness()
    this.getPopulations()
    this.getGerations()
    this.getScore()
  }

  getScore = () => {
    this.context.fillStyle = "#FFF"
    this.context.strokeStyle = "#CC0000"
    this.context.lineWidth = 1.5
    this.context.font = "36pt Calibri"
    this.context.fillText(this.currentPipe.score, 600, 60)
    this.context.strokeText(this.currentPipe.score, 600, 60)
  }

  getBestFitness = () => {
    this.context.fillStyle = "#FFF"
    this.context.lineWidth = 2
    this.context.font = "15pt Calibri"
    this.context.fillText(
      `BestFitness: ${parseFloat(this.population.bestFitness.toFixed(2))}`,
      20,
      40
    )
  }

  getPopulations = () => {
    this.context.fillStyle = "#FFF"
    this.context.lineWidth = 2
    this.context.font = "15pt Calibri"
    this.context.fillText(`Population: ${this.count}/512`, 20, 20)
  }

  getGerations = () => {
    this.context.fillStyle = "#FFF"
    this.context.lineWidth = 2
    this.context.font = "15pt Calibri"
    this.context.fillText(`Geration: ${this.population.generation}`, 20, 60)
  }
}

new Main()
