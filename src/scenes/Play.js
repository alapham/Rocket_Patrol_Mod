class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        console.log("play scene create");
    }

    preload() {
        this.load.image("sea_back", "assets/sea_back0.png");
        this.load.image("fish_back", "assets/fish_back.png");
        this.load.image('shark', 'assets/shark0.png');
        this.load.image("fish", 'assets/fish_ship0.png');
        this.load.image('fast_fish', 'assets/new_fish0.png');
        this.load.spritesheet('explosion', 'assets/explosion.png',
            {frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }

    create() {
        this.sea = this.add.tileSprite(
            0,0,640,480, 'sea_back'
        ).setOrigin(0,0);
        this.fishes = this.add.tileSprite(
            0,0,640,480, 'fish_back'
        ).setOrigin(0,0);

        this.p1Rocket = new Rocket(
            this,
            game.config.width/2,
            game.config.height - borderUISize - borderPadding,
            'shark'
            );
            // can add here too to add to scene
            //this.add.existing(this.p1Rocket);

        this.ship1 = new Ship(
            this,
            game.config.width + borderUISize*6,
            borderUISize*4,
            'fish',
            0,30
            ).setOrigin(0,0);

        this.ship2 = new Ship(
            this,
            game.config.width + borderUISize*3,
            borderUISize*5 + borderPadding*2,
            'fish',
            0,20
            ).setOrigin(0,0);

        this.ship3 = new Ship(
            this,
            game.config.width,
            borderUISize*6 + borderPadding*4,
            'fish',
            0,10
            ).setOrigin(0,0);

        //new type of spaceship enemy
        this.ship4 = new New_Ship(
            this,
            game.config.width + borderPadding*9,
            borderUISize*3+ borderPadding*3,
            'fast_fish',
            0,40
            ).setOrigin(0,0);

        //green UI rectangle
        //0x00F00
        this.add.rectangle(
            0,
            borderUISize + borderPadding,
            game.config.width,
            borderUISize * 2,
            0x00FFFF,
            ).setOrigin(0,0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
    
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);      
        
        // explosion animation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //score default
        this.p1Score = 0;

        //score display
        let scoreConfig = {
            fontFamily: 'Lora',
            fontSize: '30px',
            backgroundColor: '#34ebeb',
            color: '#27c4c4',
            align: 'right',
            padding: {top: 5, bottom: 5},
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig).setOrigin(-1,0);
        this.timerDisplay = this.add.text(borderUISize+ borderPadding*2, borderUISize + borderPadding*2, game.settings.gameTimer, scoreConfig).setOrigin(-3, 0);

        //GAME OVER flag
        this.gameOver = false;

        //game timer
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);


    }

    update() {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menuScene');
        }

        this.sea.tilePositionX -=4;
        this.fishes.tilePositionX -=3;

        //displays countdown timer
        this.timerDisplay.setText(this.clock.getRemainingSeconds().toString().substr(0,4));
        
        if(!this.gameOver) {
            this.p1Rocket.update();
            this.ship1.update();
            this.ship2.update();
            this.ship3.update();
            this.ship4.update();
        }

        if(this.checkCollision(this.p1Rocket, this.ship3)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship3);   
          }
        if (this.checkCollision(this.p1Rocket, this.ship2)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship2);
          }
        if (this.checkCollision(this.p1Rocket, this.ship1)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship1);
          }
        if (this.checkCollision(this.p1Rocket, this.ship4)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship4);
          }
    }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion');
    }
}