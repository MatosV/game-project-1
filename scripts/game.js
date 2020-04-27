class Game {
  constructor ($canvas) {
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');

    this.background = new Background(this);
  }

  start(){
    this.character = new Character (this);
  }

  clear () {
    const { width, height } = this.$canvas;
    this.context.clearRect(0, 0, width, height);
  }

  draw() {
    this.clear;
    this.background.draw();
    this.character.draw();
  }
}