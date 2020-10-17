let canvas, table

class Canvas {
  constructor() {
    this.element = document.getElementById("canvas");
    this.height = this.element.height;
    this.width = this.element.width;
    this.wallWidth = 10
  }

  drawScene() {
    let ctx = this.element.getContext('2d')

    ctx.fillStyle = '#F00'
    
    // Draw walls
    ctx.fillRect(0, 0, this.width, this.wallWidth)
    ctx.fillRect(0, 0, this.wallWidth, this.height)
    ctx.fillRect(0, this.height - this.wallWidth, this.width, this.wallWidth)
    ctx.fillRect(this.width - this.wallWidth, 0, this.wallWidth, this.height)
  }

  clear() {
    let ctx = this.element.getContext("2d");
    ctx.clearRect(0, 0, this.width, this.height);
  }

  get xMax() { return this.width - this.wallWidth }
  get xMin() { return 0 + this.wallWidth }
  get yMax() { return this.height - this.wallWidth }
  get yMin() { return 0 + this.wallWidth }
}

class Table {
  constructor(canvas) {
    this.canvas = canvas
    this.width = 200
    this.height = 20
    this.x = canvas.width / 2
    this.y = canvas.height / 2
    this.speed = 10
  }

  draw() {
    let ctx = this.canvas.element.getContext('2d')
    ctx.fillStyle = '#0F0'
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  updatePos() {
    this.x = this.x + this.speed

    if (this.x + this.width > this.canvas.xMax) {
      this.x = this.canvas.xMax + (this.canvas.xMax - (this.x + this.width)) - this.width
      this.speed = this.speed * -1
    } else if (this.x < this.canvas.xMin) {
      this.x = this.canvas.xMin + (this.canvas.xMin - this.x)
      this.speed = this.speed * -1
    }
  }
}


function interval() {
  timer = window.setInterval(() => {
    if (true || sessionStorage.getItem("Running") == "true") {

      canvas = canvas

      canvas.clear()
      canvas.drawScene()

      table.updatePos()
      table.draw()
    }
  }, 60 || document.getElementById("speed").valueAsNumber)
}


window.onload = () => {
  canvas = new Canvas
  table = new Table(canvas)
  interval();
}