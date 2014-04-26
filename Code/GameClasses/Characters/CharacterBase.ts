module LD29.Characters {
    export class CharacterBase extends Phaser.Sprite {

        facing: string;
        constructor(game: Phaser.Game, x: number, y: number, image: string) {
            super(game, x, y, image, 0);

            this.anchor.setTo(0.5, 1);

            this.facing = 'right';
            game.add.existing(this);


            this.animations.add('down', [0, 1, 2], 10, true);
            this.animations.add('left', [3, 4, 5], 10, true);
            this.animations.add('right', [6, 7, 8], 10, true);
            this.animations.add('up', [9, 10, 11], 10, true);
            this.animations.play('right');
            game.physics.enable(this);
            this.body.height = 32;
        }

        MovementUpdate() {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {                
                this.body.velocity.x = -100;
                if (this.facing != 'left') {
                    this.animations.play('left');
                    this.facing = 'left';
                }
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 100;
                if (this.facing != 'right') {
                    this.animations.play('right');
                    this.facing = 'right';
                }
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.body.velocity.y = -100;
                if (this.facing != 'up') {
                    this.animations.play('up');
                    this.facing = 'up';
                }
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.body.velocity.y = 100;
                if (this.facing != 'down') {
                    this.animations.play('down');
                    this.facing = 'down';
                }
            } else {
                this.animations.frame = 0;
            }
        }

    }
} 