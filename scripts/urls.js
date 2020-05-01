const idleUrl = [];
//const jumpUrl = [];
//const runUrl = [];
const treasureUrl = [];

for (let i = 1; i <= 32; i++) {
  idleUrl.push(`images/character/Idle/${i}.png`);
}
/*

for (let i = 1; i <= 4; i++) {
  jumpUrl.push(`/images/character/Jump/${i}.png`);
}

for (let i = 1; i <= 12; i++) {
  runUrl.push(`images/character/Run/${i}.png`);
}
*/

for (let i = 1; i <= 12; i++) {
  treasureUrl.push(`images/treasure/${i}.png`);
}

class Urls {
  constructor(game) {
    this.game = game;

    this.spritersTimer = 0;
    this.spritersInterval = 8;

    this.imagesArr = this.idleLayers();
    this.imageIndex = 0;
    /*
    this.imagesArrJ = this.jumpLayers();
    this.imageIndexJ = 0;

    this.imagesArrR = this.runLayers();
    this.imageIndexR = 0;

  */

    this.imagesArrT = this.treasureLayers();
    this.imageIndexT = 0;
  }

  idleLayers() {
    const imagesArr = [];
    idleUrl.map((url, index) => {
      const imageIdle = new Image();
      imageIdle.src = url;
      imagesArr.push(imageIdle);
    });
    return imagesArr;
  }

  idleUrl() {
    const character = this.game.character;
    const context = this.game.context;
    this.imageIndex = this.imageIndex > 31 ? (this.imageIndex = 0) : this.imageIndex;
    //context.save();
    //context.translate(character.position.x, character.position.y);
    //context.scale(-1, 1);
    context.drawImage(
      this.imagesArr[this.imageIndex],
      character.position.x,
      character.position.y,
      character.dimensions.x,
      character.dimensions.y
    );
    //context.restore();
    this.imageIndex++;
  }

  /*
  jumpLayers() {
    const imagesArrJ = [];
    jumpUrl.map((url, index) => {
      const imageJump = new Image();
      imageJump.src = url;
      imagesArrJ.push(imageJump);
    });
    return imagesArrJ;
  }
  
  jumpUrl() {
    const character = this.game.character;
    const context = this.game.context;
    this.imageIndexJ = this.imageIndexJ > 3 ? (this.imageIndexJ = 0) : this.imageIndexJ;
    context.drawImage(
      this.imagesArrJ[this.imageIndexJ],
      0,
      0,
      character.dimensions.x,
      character.dimensions.y
    );
    this.imageIndexJ++;
  }

  runLayers() {
    const imagesArrR = [];
    runUrl.map((url, index) => {
      const imageRun = new Image();
      imageRun.src = url;
      imagesArrR.push(imageRun);
    });
    return imagesArrR;
  }

  runUrl() {
    const character = this.game.character;
    const context = this.game.context;
    this.imageIndexR = this.imageIndexR > 11 ? (this.imageIndexR = 0) : this.imageIndexR;
    context.save();
    context.translate(character.position.x, character.position.y);
    context.scale(-1, 1);
    context.drawImage(
      this.imagesArrR[this.imageIndexR],
      0,
      0,
      character.dimensions.x,
      character.dimensions.y
    );
    context.restore();
    this.imageIndexR++;
  }
  */

  treasureLayers() {
    this.spritersTimer = 0;
    this.spritersInterval = 8;

    const imagesArrT = [];
    idleUrl.map((url, index) => {
      const imageTreasure = new Image();
      imageTreasure.src = url;
      imagesArrT.push(imageTreasure);
    });
    return imagesArrT;
  }

  treasureUrl() {
    const treasure = this.game.treasure;
    const context = this.game.context;
    this.imageIndexT = this.imageIndexT > 6 ? (this.imageIndexT = 0) : this.imageIndexT;
    context.drawImage(
      this.imagesArrT[this.imageIndexT],
      treasure.position.x,
      treasure.position.y,
      treasure.dimensions.x,
      treasure.dimensions.y
    );
    this.imageIndexT++;
  }
}
