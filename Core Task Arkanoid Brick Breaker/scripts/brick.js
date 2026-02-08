// scripts/brick.js
class Brick {
  constructor(x, y, width, height, color = "#ff0") {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.destroyed = false;
  }

  draw(ctx) {
    if (!this.destroyed) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
