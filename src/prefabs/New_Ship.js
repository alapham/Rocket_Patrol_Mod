class New_Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.movespeed = game.settings.spaceshipSpeed+1;
    }

    update() {
        this.x -= this.movespeed;

        if(this.x <= 0 -this.width) {
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width;
    }
}