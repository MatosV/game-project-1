const idleUrl = [];
const jumpUrl = [];
const runUrl = [];

for (let i = 1; i <= 32; i++) {
  idleUrl.push(`../images/character/Idle/${i}.png`);
}

for (let i = 1; i <= 4; i++) {
  jumpUrl.push(`../images/character/Jump/${i}.png`);
}

for (let i = 1; i <= 12; i++) {
  runUrl.push(`../images/character/Run/${i}.png`);
}

const idleLayers = idleUrl.map((url) => {
  const imageIdle = new Image();
  imageIdle.src = url;
  return imageIdle;
});

const jumpLayers = jumpUrl.map((url) => {
  const imageJump = new Image();
  imageJump.src = url;
  return imageJump;
});

const runLayers = runUrl.map((url) => {
  const imageRun = new Image();
  imageRun.src = url;
  return imageRun;
});

class Urls {
  constructor(game) {
    this.game = game;
  }

  idleUrl(){
    for (let i = 0; i <  idleLayers.length; i++) {
      const layer = idleLayer[i];
      context.drawImage(layer, x, y, width, height);
      context.drawImage(layer, width, 0, width, height);
    }
  }

  jumpUrl(){
    for (let i = 0; i <  jumpUrl.length; i++) {
      const layer = jumpUrls[i];
      context.drawImage(layer, x, y, width, height);
      context.drawImage(layer, width, 0, width, height);
    }
  }

  runUrl(){
    for (let i = 0; i <  runUrl.length; i++) {
      const layer = runUrl[i];
      context.drawImage(layer, x, y, width, height);
      context.drawImage(layer, width, 0, width, height);
    }
  }
}
