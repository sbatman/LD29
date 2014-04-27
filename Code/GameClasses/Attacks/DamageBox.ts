module LD29
{
    export class DamageBox extends Phaser.Sprite
    {
        RemainingTime: number;
        Strength: number;

        constructor(game: Phaser.Game, x: number, y: number, velox: number, veloy: number)
        {
            super(game, x, y, "content-graphics-attacks-hitspot", 0);
            game.physics.enable(this);
            this.RemainingTime = 100;
            this.Strength = 1;
            this.body.velocity.x = velox;
            this.body.velocity.y = veloy;
            game.add.existing(this);
        }
        update()
        {
            this.RemainingTime--;
        }
    }
}