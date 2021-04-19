let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT, keyF, keyR;


// Allison Pham
// Rocket Patrol Mod (Underwater Patrol)
// Date: 4/14/21
// Project Time: ~11 hours
//Added countdown/timer display (10)
//Added new ship type (20)
//Parallax scrolling (10)
//Changed game's theme/asthetic (Artwork, Sound Effects, UI, Animation) (60)
//Art and animation art by me (Allison Pham)
//Sound Effects Credit: https://freesound.org/