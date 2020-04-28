const cIntersection = (first, second) => {
  const intersectionDirections = [];
  const intersectionAxis = [];
  return (
    first.bottom > second.top &&
    first.top < second.bottom &&
    first.right > second.left &&
    first.left < second.right
  );
}

const gCoordinates = object => ({
  top: object.position.y,
  right: object.position.x + object.dimensions.x,
  bottom: object.position.y + object.dimensions.y,
  left: object.position.x,
  ...object
});

class Dzone {
  constructor (game, { x, y, width, height }) {
    this.game = game;
    this.position = { x, y };
    this.dimensions = { x: width, y: height };

    //this.move = {initialPosittion, finalPosition}
  }

  cIntersection (character) {
    const dzone = this;
    const characterBlock = gCoordinates(character);
    const dzoneBlock = gCoordinates(dzone);
    const intersection = cIntersection(characterBlock, dzoneBlock);
    return intersection;
  }

  loopPath() {

  }

  draw () {
    const context = this.game.context;
    const {
      position: { x, y },
      dimensions: { x: width, y: height },
    } = this;

    context.save();

    context.fillStyle = 'green';
    context.fillRect(x, y, width, height);

    context.restore();
  }
}

