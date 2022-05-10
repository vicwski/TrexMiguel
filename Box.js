class Box {
  constructor(x, y, w, h, vx) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.vx = vx
  }

  xSpeed(){
    this.x += this.vx
  }

  display() {
    rectMode(CENTER)
    rect(this.x, this.y, this.w, this.h)
  }
}
