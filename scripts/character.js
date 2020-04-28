class Character {
  constructor (game) {
    this.game = game;
    
    const $canvas = document.querySelector('canvas');
    const context= $canvas.getContext('2d');

    this.position = {
      x: 1052,
      y: 120
    };
    this.velocity = {
      x: 0,
      y: 0
    };
    this.dimensions = {
      x: 20,
      y: 30
    }
    this.gravity = 10;
    this.friction = 15;
  } 

  jump () {
    if (!this.jumping) {
      this.velocity.y = -5;
      this.jumping = true;
    }
  }

  move (direction) {
    const multiplierMap = { left: -1, right: 1 };
    const multiplier = multiplierMap[direction];
    this.velocity.x = multiplier * 5;
  }

  runLogic () {

    let runningDirection = 0;
    const activeControls = this.game.setControlBindings.active;
        
    const {
      position,
      dimensions,
      velocity,
      gravity,
      friction
    } = this;
    let newVelocity = {
      x: velocity.x / (1 + friction / 15000 * 6) + runningDirection * 0.5,
      y: velocity.y + (gravity / 1000 * 16)
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
      position: {
        ...position,
        x: newPosition.x
      },
      dimensions
    });
    const verticalIntersection = dz.cIntersection({
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
}



  draw () {
    const context = this.game.context;
    const $canvas = context.canvas;
    const {
      position: { x, y },
      dimensions: { x: width, y: height }
    } = this;

    context.save();

    context.fillStyle = '#dadada';
    context.fillRect(x, y, width, height);

    context.restore();
  }
}