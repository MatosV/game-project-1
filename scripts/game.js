const jumpNoise = new Audio('../audio/jump.wav');
const bg = new Audio('/audio/bg_music.wav');


class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');
    this.setControlBindings();
  }

  setControlBindings() {
    window.addEventListener('keydown', (event) => {
      const code = event.keyCode;
      const codeMap = {
        32: 'space',
        37: 'left',
        39: 'right'
      };
      if (Object.keys(codeMap).includes(code.toString())) {
        event.preventDefault();
        const value = codeMap[code];
        switch (value) {
          case 'space':
            this.character.jump();
            jumpNoise.play();
            break;
          case 'left':
            this.character.move(value);
          case 'right':
            this.character.move(value);
            break;
        }
      }
    });
  }

  clear() {
    const { width, height } = this.$canvas;
    this.context.clearRect(0, 0, width, height);
  }

  start() {
    //CLASSES
    bg.play();
    bg.volume = 0.1;
    this.character = new Character(this);
    this.movement = new Movement(this);
    this.url = new Urls(this);
    this.treasure = new Treasure(this);
    this.obstacles = [];
    this.dzone = [];
    this.randomizeObstacles();
    this.dzoneChain();
    this.isGameOver = false;
    this.isWin = false;
    if (!this.isRunning) {
      this.isRunning = true;
      this.loop(0);
    }
  }

  pause() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.loop();
    } else {
      this.isRunning = false;
      bg.pause();
    }
  }

  randomizeObstacles() {
    const width = this.$canvas.width;
    const height = this.$canvas.height;
    //TOP WALL

    this.obstacles.push(
      new Obstacle(this, {
        x: 0,
        y: height - 10,
        width,
        height: 10
      })
    );
    //DOWN WALL
    this.obstacles.push(
      new Obstacle(this, {
        x: 0,
        y: height - 610,
        width,
        height: 10
      })
    );
    //LEFT WALL
    this.obstacles.push(
      new Obstacle(this, {
        x: 0,
        y: height - 610,
        width: 10,
        height
      })
    );
    //RIGHT WALL
    this.obstacles.push(
      new Obstacle(this, {
        x: 1142,
        y: height - 610,
        width: 10,
        height
      })
    );

    //TOP OBSTACLES
    //GOING RIGHT to LEFT
    const obstacle1 = new Obstacle(this, {
      x: 860,
      y: 150,
      width: 350,
      height: 20
    });
    this.obstacles.push(obstacle1);

    const obstacle2 = new Obstacle(this, {
      x: 320,
      y: 150,
      width: 180,
      height: 20
    });
    this.obstacles.push(obstacle2);

    const obstacle3 = new Obstacle(this, {
      x: 620,
      y: 150,
      width: 180,
      height: 20
    });
    this.obstacles.push(obstacle3);

    const obstacle4 = new Obstacle(this, {
      x: 100,
      y: 150,
      width: 120,
      height: 20
    });
    this.obstacles.push(obstacle4);

    //MID OBSTACLES
    //GOING LEFT to RIGHT
    const obstacle5 = new Obstacle(this, {
      x: 0,
      y: 350,
      width: 985,
      height: 120
    });
    this.obstacles.push(obstacle5);

    const obstacle6 = new Obstacle(this, {
      x: 0,
      y: 320,
      width: 80,
      height: 80
    });
    this.obstacles.push(obstacle6);

    const obstacle7 = new Obstacle(this, {
      x: 180,
      y: 320,
      width: 180,
      height: 80
    });
    this.obstacles.push(obstacle7);

    const obstacle8 = new Obstacle(this, {
      x: 520,
      y: 320,
      width: 180,
      height: 80
    });
    this.obstacles.push(obstacle8);

    const obstacle9 = new Obstacle(this, {
      x: 805,
      y: 320,
      width: 180,
      height: 80
    });
    this.obstacles.push(obstacle9);
  }

  dzoneChain() {
    const width = this.$canvas.width;
    const height = this.$canvas.height;

    //TOP CHAIN
    const chain = new Dzone(this, {
      x: 805,
      y: 10,
      width: 50,
      height: 80,
      direction: 'v',
      limit: [0, height / 2.5],
      speedY: 4
    });
    this.dzone.push(chain);

    const chain2 = new Dzone(this, {
      x: 510,
      y: 10,
      width: 105,
      height: 80,
      direction: 'v',
      limit: [0, height / 2.4],
      speedY: 5
    });
    this.dzone.push(chain2);

    const chain3 = new Dzone(this, {
      x: 235,
      y: 10,
      width: 80,
      height: 80,
      direction: 'v',
      limit: [0, height / 2.5],
      speedY: 5
    });
    this.dzone.push(chain3);

    const chain4 = new Dzone(this, {
      x: 10,
      y: 10,
      width: 30,
      height: 80,
      direction: 'v',
      limit: [0, height / 2.5],
      speedY: 7
    });
    this.dzone.push(chain4);

    //BOTTOM CHAIN
    const chain8 = new Dzone(this, {
      x: 220,
      y: 570,
      width: 80,
      height: 40,
      direction: 'v',
      limit: [(height * 3) / 4, height - 40],
      speedY: 1
    });
    this.dzone.push(chain8);

    const chain9 = new Dzone(this, {
      x: 580,
      y: 470,
      width: 80,
      height: 40,
      direction: 'v',
      limit: [(height * 3) / 4, height - 45],
      speedY: 1
    });
    this.dzone.push(chain9);

    const chain10 = new Dzone(this, {
      x: 820,
      y: 470,
      width: 80,
      height: 40,
      direction: 'v',
      limit: [(height * 3) / 4, height - 45],
      speedY: 2
    });
    this.dzone.push(chain10);
  }

  runLogic() {
    this.character.runLogic();
    for (let dz of this.dzone) {
      dz.runLogic();
    }
  }

  gameOver() {
    this.isGameOver = true;
  }

  gameOverScreen() {
    this.context.fillStyle = 'rgba(0,0,0,0.1)';
    this.context.fillRect(0, 0, canvas.width, canvas.height);

    //GAME OVER
    this.context.font = '100px fantasy';
    this.context.fillStyle = 'red';
    this.context.fillText('OVER', canvas.width / 2 + 110, canvas.height / 2 + 40);

    this.context.textAlign = 'center';
    this.context.font = '100px fantasy';
    this.context.fillStyle = 'black';
    this.context.fillText('GAME ', canvas.width / 2, canvas.height / 2);

    //PRESS START TO GO AGAIN
    this.context.textAlign = 'center';
    this.context.font = '30px fantasy';
    this.context.fillStyle = 'black';
    this.context.fillText('press', canvas.width / 2, canvas.height / 2 + 210);

    this.context.font = '30px fantasy';
    this.context.fillStyle = 'red';
    this.context.fillText('START ', canvas.width / 2 + 80, canvas.height / 2 + 210);

    this.context.font = '30px fantasy';
    this.context.fillStyle = 'black';
    this.context.fillText('to go again', canvas.width / 2 + 190, canvas.height / 2 + 210);
  }

  win() {
    this.isWin = true;
  }

  winScreen() {
    this.context.fillStyle = 'rgba(0,0,0,0.1)';
    this.context.fillRect(0, 0, canvas.width, canvas.height);

    //Time Flies When You’re Having RUM
    this.context.font = '100px fantasy';
    this.context.fillStyle = 'red';
    this.context.fillText(
      'When You’re Having RUM ',
      canvas.width / 2 - 500,
      canvas.height / 2 + 100
    );

    this.context.textAlign = 'center';
    this.context.font = '100px fantasy';
    this.context.fillStyle = 'black';
    this.context.fillText('Time Flies ', canvas.width / 2, canvas.height / 2);
  }

  draw(timestamp) {
    if (!this.isGameOver && !this.isWin) {
      for (let obstacle of this.obstacles) obstacle.draw();
      for (let dz of this.dzone) dz.draw();
      this.character.draw(timestamp);
      this.treasure.draw(timestamp);
    } else if (this.isGameOver) {
      this.gameOverScreen();
      bg.pause();
    } else if (this.isWin) {
      this.winScreen();
    }
  }

  loop(timestamp) {
    this.runLogic();
    this.clear();
    this.draw(timestamp);
    if (this.isRunning) {
      window.requestAnimationFrame((timestamp) => this.loop(timestamp));
    }
  }
}
