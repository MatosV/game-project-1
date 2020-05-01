const treasureCoordinates = (object) => ({
  top: object.position.y,
  right: object.position.x + object.dimensions.x,
  bottom: object.position.y + object.dimensions.y,
  left: object.position.x,
  ...object
});

class Treasure {
  constructor(game) {
    this.game = game;

    this.position = {
      x: 80,
      y: 600
    };

    this.dimensions = {
      x: 45,
      y: 60
    };
  }

  tIntersection(character) {
    const treasure = this;
    const characterBlock = treasureCoordinates(character);
    const treasureBlock = treasureCoordinates(treasure);
    const intersection = tIntersection(characterBlock, treasureBlock);
    return intersection;
  }

  runLogic() {}

  draw(timestamp) {
    console.log('here')
    this.game.url.treasureUrl(timestamp);
  }
}
