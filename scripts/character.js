class Character {
  constructor(game) {
    this.game = game;

    this.position = {
      x: 1052,
      y: 70
    };
    this.velocity = {
      x: 40,
      y: 90
    };
    this.dimensions = {
      x: 45,
      y: 60
    };
    this.gravity = 8;
    this.friction = 50;
  }

  jump() {
    if (!this.jumping) {
      this.velocity.y = -5;
      this.jumping = true;
    }
  }

  move(direction) {
    const multiplierMap = { left: -1, right: 1 };
    const multiplier = multiplierMap[direction];
    this.velocity.x = multiplier * 5;
  }

  runLogic() {
    const context = this.game.context;

    let runningDirection = 0;
    const activeControls = this.game.setControlBindings.active;

    const { position, dimensions, velocity, gravity, friction } = this;
    let newVelocity = {
      x: velocity.x / (1 + (friction / 1000) * 1) + runningDirection * 0.5,
      y: velocity.y + (gravity / 1000) * 20
    };
    let newPosition = {
      x: position.x + newVelocity.x,
      y: position.y + newVelocity.y
    };
    for (let obstacle of this.game.obstacles) {
      const horizontalIntersection = obstacle.checkIntersection({
        position: {
          ...position,
          x: newPosition.x
        },
        dimensions
      });
      const verticalIntersection = obstacle.checkIntersection({
        position: {
          ...position,
          y: newPosition.y
        },
        dimensions
      });
      if (verticalIntersection) {
        newVelocity.y = 0;
        newPosition.y = position.y;
        this.jumping = false;
      }
      if (horizontalIntersection) {
        newVelocity.x = 0;
        newPosition.x = position.x;
      }
    }

    Object.assign(this.velocity, newVelocity);
    Object.assign(this.position, newPosition);

    for (let dz of this.game.dzone) {
      const horizontalIntersection = dz.cIntersection({
        position,
        dimensions
      });
      const verticalIntersection = dz.cIntersection({
        position,
        dimensions
      });

      if (horizontalIntersection && verticalIntersection) {
        //console.log('Game over');
        this.game.isRunning = false;
        this.game.isGameOver = true;
      }
    }

    for (let treasure of this.game.treasure){
      const horizontalIntersection = treasure.tIntersection({
        position,
        dimensions
      });
      const verticalIntersection = treasure.tIntersection({
        position,
        dimensions
      });

      if (horizontalIntersection && verticalIntersection) {
        this.game.isRunning = false;
        this.game.isWin = true;
    }
  }
}

  draw(timestamp) {
   
    /*
    context.save();

    context.fillStyle = '#dadada';
    context.fillRect(x, y, width, height);

    context.restore();
    */

    this.game.url.idleUrl(timestamp);
  }  
}
