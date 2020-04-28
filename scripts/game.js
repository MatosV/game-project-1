class Game {
  constructor ($canvas) {
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');
    
    this.setControlBindings();

  }

  setControlBindings () {
    window.addEventListener('keydown', event => {
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
            //console.log('space')
            this.character.jump();
            break;
          case 'left':
            //console.log('left')
          case 'right':
            //console.log('right')
            this.character.move(value);
            break;
        }
      }
    });
  }

  start() {
    this.character = new Character(this);
    this.obstacles = [] ;
    this.dzone = [];
    this.randomizeObstacles();
    this.dzoneChain();
    this.loop();
  }

  randomizeObstacles() {
    const width = this.$canvas.width;
    const height = this.$canvas.height;
    //TOP WALL
    this.obstacles.push(new Obstacle(this, {
      x: 0,
      y: height - 10,
      width,
      height: 10
    }))
    //DOWN WALL
    this.obstacles.push(new Obstacle(this, {
      x: 0,
      y: height - 610,
      width,
      height: 10
    }))
    //LEFT WALL
      this.obstacles.push(new Obstacle(this, {
        x: 0,
        y: height - 610,
        width: 10,
        height
      }))
      //RIGHT WALL
      this.obstacles.push(new Obstacle(this, {
        x: 1142,
        y: height - 610,
        width: 10,
        height
      }))
      //TOP OBSTACLES
      //GOING RIGHT to LEFT
      const obstacle1 = new Obstacle(this, {
        x: 860,
        y: 150,
        width: 350,
        height: 20,
      });
      this.obstacles.push(obstacle1);

      const obstacle2 = new Obstacle(this, {
        x: 320,
        y: 150,
        width: 180,
        height: 20,
      });
      this.obstacles.push(obstacle2);

      const obstacle3 = new Obstacle(this, {
        x: 620,
        y: 150,
        width: 180,
        height: 20,
      });
      this.obstacles.push(obstacle3);

      const obstacle4 = new Obstacle(this, {
        x: 50,
        y: 150,
        width: 180,
        height: 20,
      });
      this.obstacles.push(obstacle4);

      //MID OBSTACLES
      //GOING LEFT to RIGHT
      const obstacle5 = new Obstacle(this, {
        x: 0,
        y: 350,
        width: 985,
        height: 120,
      });
      this.obstacles.push(obstacle5);

      const obstacle6 = new Obstacle(this, {
        x: 0,
        y: 320,
        width: 80,
        height: 80,
        
      });
      this.obstacles.push(obstacle6);

      const obstacle7 = new Obstacle(this, {
        x: 180,
        y: 320,
        width: 180,
        height: 80,
      });
      this.obstacles.push(obstacle7);

      const obstacle8 = new Obstacle(this, {
        x: 520,
        y: 320,
        width: 180,
        height: 80,
      });
      this.obstacles.push(obstacle8);

      const obstacle9 = new Obstacle(this, {
        x: 805,
        y: 320,
        width: 180,
        height: 80,
      });
      this.obstacles.push(obstacle9);
      
  }

  dzoneChain() {
    const width = this.$canvas.width;
    const height = this.$canvas.height;
    
    //TOP CHAIN
    const chain = new Dzone(this, {
        x: 800,
        y: 10 ,
        width: 60,
        height: 80,
      });
      this.dzone.push(chain );

    const chain2 = new Dzone(this, {
        x: 500,
        y: 10 ,
        width: 120,
        height: 80,
      });      
      this.dzone.push(chain2);

    const chain3 = new Dzone(this, {
        x: 230,
        y: 10 ,
        width: 90,
        height: 80,
      });
      this.dzone.push(chain3);
    
      const chain4 = new Dzone(this, {
        x: 10,
        y: 10 ,
        width: 60,
        height: 80,
      });
      this.dzone.push(chain4);

      //MID CHAIN
      const chain5 = new Dzone(this, {
        x: 220,
        y: 280 ,
        width: 80,
        height: 40,
      });
      this.dzone.push(chain5);

      const chain6 = new Dzone(this, {
        x: 580,
        y: 280 ,
        width: 80,
        height: 40,
      });
      this.dzone.push(chain6);

      const chain7 = new Dzone(this, {
        x: 820,
        y: 280 ,
        width: 80,
        height: 40,
      });
      this.dzone.push(chain7);

      //BOTTOM CHAIN
      const chain8 = new Dzone(this, {
        x: 220,
        y: 470,
        width: 80,
        height: 40,
      });
      this.dzone.push(chain8);

      const chain9 = new Dzone(this, {
        x: 580,
        y: 470,
        width: 80,
        height: 40,
      });
      this.dzone.push(chain9);

      const chain10 = new Dzone(this, {
        x: 820,
        y: 470,
        width: 80,
        height: 40,
      });
      this.dzone.push(chain10);

      const chain11 = new Dzone(this, {
        x: 220,
        y: 560,
        width: 80,
        height: 40,
      });
      this.dzone.push(chain11);

      const chain12 = new Dzone(this, {
        x: 820,
        y: 560,
        width: 80,
        height: 40,
      });
      this.dzone.push(chain12);
  }

  runLogic () {
    this.character.runLogic();
  }

  clear () {
    const { width, height } = this.$canvas;
    this.context.clearRect(0, 0, width, height);
  }

  draw () {
    for (let obstacle of this.obstacles) obstacle.draw();
    for (let dz of this.dzone) dz.draw();
    this.character.draw();
  }

  loop () {
    this.runLogic();
    this.clear();
    this.draw();
    window.requestAnimationFrame(timestamp => this.loop(timestamp));
  }
}