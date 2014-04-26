module LD29.Characters {
    export class CharacterBase extends Phaser.Sprite {

        facing: string;
        constructor(game: Phaser.Game, x: number, y: number, image: string) {
            super(game, x, y, image, 0);

            game.load.spritesheet('skel', image, 32, 32);
            this.anchor.setTo(0.5, 0);
            this.animations.add('right', [0, 1], 5, true);

            this.facing = 'right';
            game.add.existing(this);
            //game.physics.arcade.enable(this);
            //this.body.bounce.y = 0;
        }

        MovementUpdate() {
            this.game.camera.x = this.body.position.x;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.x--;

                if (this.facing != 'left') {
                    this.animations.play('left');
                    this.facing = 'left';
                }
                if (this.scale.x == 1) this.scale.x = -1;
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.x++;
                if (this.facing != 'right') {
                    this.animations.play('right');
                    this.facing = 'right';
                }
                this.animations.play('walk');
                if (this.scale.x == -1) this.scale.x = 1;
            } if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.y++;
                if (this.facing != 'up') {
                    this.animations.play('up');
                    this.facing = 'up';
                }
                this.animations.play('walk');
                if (this.scale.x == 1) this.scale.x = -1;
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.y--;
                if (this.facing != 'down') {
                    this.animations.play('down');
                    this.facing = 'down';
                }
                this.animations.play('walk');
                if (this.scale.x == -1) this.scale.x = 1;
            } else {
                this.animations.frame = 0;
            }
        }

    }
} 