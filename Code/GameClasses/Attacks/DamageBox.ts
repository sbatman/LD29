module LD29
{
    export class DamageBox extends Phaser.Sprite
    {
        RemainingTime: number;
        Strength: number;
        Owner: Characters.CharacterBase;

        constructor(game: Phaser.Game, x: number, y: number, velox: number, veloy: number, owner: Characters.CharacterBase, time : number)
        {
            super(game, x, y, "content-graphics-attacks-hitspot", 0);
            game.physics.enable(this);
            this.Strength = 1;
            this.body.velocity.x = velox;
            this.body.velocity.y = veloy;
            this.Owner = owner;
            this.RemainingTime = time;
            game.add.existing(this);
        }
        update()
        {
            this.RemainingTime--;
        }
    }
}