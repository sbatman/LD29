///<reference path='CharacterBase.ts'/>
module LD29.Characters {
    export class Player extends CharacterBase {

        constructor(game: Phaser.Game, x: number, y: number, image: string) {
            super(game, x, y, image);
            this.MaxHealth = 100;
            this.Health = this.MaxHealth;
        }


        MovementUpdate() {

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.x--;

                this.animations.play('left');
                this.facing = 'left';
                if (this.animations.paused) {
                    this.animations.paused = false;
                }
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.x++;
                this.animations.play('right');
                this.facing = 'right';
                if (this.animations.paused) {
                    this.animations.paused = false;
                }
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.y--;
                if (this.facing != 'up') {
                    this.animations.play('up');
                    this.facing = 'up';
                }
                else if (this.animations.paused) {
                    this.animations.paused = false;
                }
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.y++;
                if (this.facing != 'down') {
                    this.animations.play('down');
                    this.facing = 'down';
                }
                else if (this.animations.paused) {
                    this.animations.paused = false;
                }
            } else {
                this.animations.paused = true;
            }
        }

    }


} 