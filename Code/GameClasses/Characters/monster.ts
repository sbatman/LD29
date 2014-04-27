///<reference path='CharacterBase.ts'/>
module LD29.Characters {
    export class Monster extends CharacterBase
    {
        CurrentTarget: Characters.CharacterBase;

      
        MaxSpeed: number;
        constructor(game: Phaser.Game, x: number, y: number, image: string) {
            super(game, x, y, image);

            this.animations.play('down');
            this.animations.paused = true;
            this.MaxSpeed = 85;
        }

        MovementUpdate()
        {         
            var velX = this.CurrentTarget.x - this.x;
            var velY = this.CurrentTarget.y - this.y;
            if (Math.abs(velX) + Math.abs(velY) > 50) {
                //var speed = Math.sqrt(velY * velY + velX * velX);
                this.body.velocity.y = velY;
                this.body.velocity.x = velX;
                this.body.velocity.normalize();
                this.body.velocity.x *= this.MaxSpeed;
                this.body.velocity.y *= this.MaxSpeed;
            }
            else {


                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
            }
        }

        SetTarget(target : Characters.CharacterBase) {
            this.CurrentTarget = target;
        }
    }
}

