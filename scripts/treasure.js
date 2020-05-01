class Treasure {
  constructor(game) {
    this.game = game;

    this.position = {
      x: 40,
      y: 520
    };

    this.dimensions = {
      x: 45,
      y: 60
    };
  }

  treasureIntersection(character) {
    const treasure = this;
    const characterBlock = getCoordinates(character);
    const treasureBlock = getCoordinates(treasure);
    const intersection = checkIntersection(characterBlock, treasureBlock);
    return intersection;
  }

  draw(timestamp) {
    this.game.url.treasureUrl(timestamp);
  }
}
