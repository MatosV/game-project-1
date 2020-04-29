class Movement {
  constructor (game, x, y, speedX = 5, speedY = 5) {
    this.game = game;
    this.x = x;
    this.y = y;

    this.speedX = speedX;
    this.speedY = speedY;
  }

  runLogic () {
    if (this.x >= $canvas.width) {
      this.speedX = this.speedX * -1;
    }

    if (this.y >= $canvas.height) {
      this.speedY = this.speedY * -1;
    }

    this.x += this.speedX;
    this.y += this.speedY;
  }

}