const cIntersection = (first, second) => {
  const intersectionDirections = [];
  const intersectionAxis = [];
  return (
    first.bottom > second.top &&
    first.top < second.bottom &&
    first.right > second.left &&
    first.left < second.right
  );
};

const gCoordinates = (object) => ({
  top: object.position.y,
  right: object.position.x + object.dimensions.x,
  bottom: object.position.y + object.dimensions.y,
  left: object.position.x,
  ...object
});

class Dzone {
  constructor(game, { x, y, width, height, direction, limit, speedX = 5, speedY = 5 }) {
    this.game = game;
    this.position = { x, y };
    this.dimensions = { x: width, y: height };
    this.speed = { x: speedX, y: speedY };
    this.direction = direction;
    this.limit = limit;
  }

  cIntersection(character) {
    const dzone = this;
    const characterBlock = gCoordinates(character);
    const dzoneBlock = gCoordinates(dzone);
    const intersection = cIntersection(characterBlock, dzoneBlock);
    return intersection;
  }

  runLogic() {
    if (this.direction === 'v') {
      let nextPosition = this.position.y + this.speed.y;
      if (this.checkLimits(nextPosition)) {
        this.speed.y *= -1;
        nextPosition = this.position.y + this.speed.y;
      }
      this.position.y = nextPosition;
    } else if (this.direction === 'h') {
      this.position.x += this.speed.x;
    }
  }

  checkLimits(nextPosition) {
    if (this.direction === 'v') {
      //check vertical limits
      if (nextPosition >= this.limit[1] || nextPosition <= this.limit[0]) {
        return true;
      }
    } else if (this.direction === 'h') {
      this.position.x += this.speed.x;
    }
  }

  draw(timestamp) {
    const context = this.game.context;
    const {
      position: { x, y },
      dimensions: { x: width, y: height }
    } = this;

    context.save();

    context.fillStyle = 'green';
    context.fillRect(x, y, width, height);

    context.restore();
  }
}
