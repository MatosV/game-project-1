class Background {
  constructor(game){
    this.game = game; 
    this.context = this.game.context;

    this.width = this.game.width;
    this.height = this.game.height;

  }

  draw () {

  //STRUCTURE
    //BG-COLOR
    this.context.fillStyle = 'lightgrey';
    this.context.fillRect(0, 0, 1152, 610);
    //MAIN_STRUCTURE
    this.context.fillStyle = 'black';
    //UP
      this.context.fillRect(0, 0, 1152, 40);
    //DOWN
      this.context.fillRect(0, 570, 1152, 40);
    //LEFT
      this.context.fillRect(0, 0, 60, 610); 
    //RIGHT   
      this.context.fillRect(1092, 0, 60, 610);
      
      this.context.fillRect(860, 150, 1152, 20);
      this.context.fillRect(620, 150, 180, 20);
      this.context.fillRect(320, 150, 180, 20);
      this.context.fillRect(120, 150, 100, 20);

    this.context.fillStyle = 'red';
    this.context.fillStyle = 'green';
  }
  
}