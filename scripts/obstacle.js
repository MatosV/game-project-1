const checkIntersection = (first, second) => {
  const intersectionDirections = [];
  const intersectionAxis = [];
  return (
    first.bottom > second.top &&
    first.top < second.bottom &&
    first.right > second.left &&
    first.left < second.right
  );
}

const getCoordinates = object => ({
  top: object.position.y,
  right: object.position.x + object.dimensions.x,
  bottom: object.position.y + object.dimensions.y,
  left: object.position.x,
  ...object
});

const treasureCoordinates = (object) => ({
  top: object.position.y,
  right: object.position.x + object.dimensions.x,
  bottom: object.position.y + object.dimensions.y,
  left: object.position.x,
  ...object
});

class Obstacle {
  constructor (game, { x, y, width, height }) {
    this.game = game;
    this.position = { x, y };
    this.dimensions = { x: width, y: height };
  }

  checkIntersection (character) {
    const obstacle = this;
    const characterBlock = getCoordinates(character);
    const obstacleBlock = getCoordinates(obstacle);
    const intersection = checkIntersection(characterBlock, obstacleBlock);
    return intersection;
  }


  draw () {
    const context = this.game.context;
    const {
      position: { x, y },
      dimensions: { x: width, y: height },
    } = this;

    context.save();

    context.fillStyle = 'black';
    context.fillRect(x, y, width, height);

    context.restore();
  }
}

