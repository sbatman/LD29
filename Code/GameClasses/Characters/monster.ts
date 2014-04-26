///<reference path='CharacterBase.ts'/>
module LD29.Characters {
    export class Monster extends CharacterBase {
        constructor(game: Phaser.Game, x: number, y: number, image: string) {
            super(game, x, y, image);

            this.animations.play('down');
            this.animations.paused = true;
        }

        MovementUpdate() {

            this.body.velocity.y = 20;
        }
    }
}

