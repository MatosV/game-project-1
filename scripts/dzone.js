class Dzone {
  constructor (game, x, y) {
    this.game = game;

    this.x = x;
    this.y = y;

    this.speed = 1;

    this.width = 25;
    this.height = 50;
   
  } 
  
  collision (character) {
    return (
      character.x + character.width / 2 > this.x - this.width / 2 &&
      character.x - character.width / 2 < this.x + this.width / 2 &&
      character.y + character.height / 2 > this.y - this.height / 2 &&
      character.y - character.height / 2 < this.y + this.height / 2
    );
  }

  runLogic () {
    this.x -= this.speed;
  }

  draw () {
    context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }
  
}


