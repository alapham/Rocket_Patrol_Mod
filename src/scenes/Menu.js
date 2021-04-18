class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('sfx_select', 'assets/button_sound.wav');
        this.load.audio('sfx_explosion', 'assets/bite_sound.wav');
        this.load.audio('sfx_rocket', 'assets/fire_sound.wav');
    }

    create() {
        //text settings
        let menuConfig = {
            fontFamily: 'Lora',
            fontSize: '28px',
            backgroundColor: '#34ebeb',
            color: '#843605',
            align: 'right',
            padding: {top: 5, bottom: 5},
            fixedWidth: 0
        }

        //menu text
        this.add.text(
            game.config.width/2,
            game.config.height/2 - borderUISize - borderPadding,
            'UNDERWATER PATROL',
            menuConfig
            ).setOrigin(0.5);
        this.add.text(
            game.config.width/2,
            game.config.height/2,
            'USE <-> arrows to move & (F) to FIRE',
            menuConfig
            ).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
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
                gameTimer: 10000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 15000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}