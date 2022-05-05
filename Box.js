class Box {
  constructor() {
    this.x = 100
    this.y = 200
    this.w = 50
    this.h = 50
  }

  xSpeed(x){
    this.x += x
  }

  display() {
    rectMode(CENTER)
    rect(this.x, this.y, this.w, this.h)
  }
}
