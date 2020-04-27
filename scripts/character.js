class Character {
  constructor (game) {
    this.game = game;
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
    this.gravity = 30;
    this.friction = 20;
  } 

  jump () {
    this.velocity.y = -20;
  }

  move (direction) {
    const multiplierMap = { left: -1, right: 1 };
    const multiplier = multiplierMap[direction];
    this.velocity.x = multiplier * 10;
  }

  runLogic () {
    const {
      position,
      dimensions,
      velocity,
      gravity,
      friction
    } = this;
    let newVelocity = {
      x: velocity.x / (1 + friction / 1000 * 6),
      y: velocity.y + (gravity / 500 * 30)
    };
    if (newVelocity.x) {
      debugger;
    }
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