var box1

function setup() {
  createCanvas(400, 400)

  box1 = new Box(100, 200, 50, 50, 5)
}

function draw() {
  background(220)
  box1.display()
  box1.xSpeed()
}
