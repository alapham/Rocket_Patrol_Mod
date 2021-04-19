class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('sfx_select', 'assets/button_sound.wav');
        this.load.audio('sfx_explosion', 'assets/bite_sound.wav');
        this.load.audio('sfx_rocket', 'assets/fire_sound.wav');
        this.load.image('menu', 'assets/Menu_Shark.png');
    }

    create() {
        this.add.image(game.config.width/2, game.config.height/2, 'menu');
        //text settings
        let menuConfig = {
            fontFamily: 'Lora',
            fontSize: '32px',
            backgroundColor: '#6cf5f5',
            color: '#27c4c4',
            align: 'middle',
            padding: {top: 3, bottom: 3},
            fixedWidth: 0
        }

        //menu text
        this.add.text(
            game.config.width/2,
            game.config.height/3 - borderUISize - borderPadding,
            'UNDERWATER PATROL',
            menuConfig
            ).setOrigin(0.5);

        menuConfig.backgroundColor = '#34ebeb';
        menuConfig.color = '#fff';            
        this.add.text(
            game.config.width/2,
            game.config.height/2,
            'USE <-> arrows to move & (F) to FIRE',
            menuConfig
            ).setOrigin(0.5);
        this.add.text(
            game.config.width/2,
            game.config.height/2 + borderUISize + borderPadding,
            'Press <- for Novice or -> for Expert',
            menuConfig
            ).setOrigin(0.5);
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 20000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 25000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}