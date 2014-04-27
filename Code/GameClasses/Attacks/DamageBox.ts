module LD29
{
    export class DamageBox extends Phaser.Sprite
    {
        RemainingTime: number;
        Strength: number;
        Owner: Characters.CharacterBase;
        DieOnHit: boolean;

        TargetVeloX: number;
        TargetVeloY: number;

        constructor(game: Phaser.Game, x: number, y: number, velox: number, veloy: number, owner: Characters.CharacterBase, type: number)
        {
            super(game, x, y, DamageBox.GetGraphic(type) , 0);
            game.physics.enable(this);



            this.Owner = owner;

            game.add.existing(this);

            switch (type)
            {
                case 0:
                    this.Strength = 1;
                    this.body.mass = 100;
                    this.RemainingTime = 35;
                    this.DieOnHit = true;
                    this.TargetVeloX = velox * 200;
                    this.TargetVeloY = veloy * 200;
                    break;
                case 1:
                    this.Strength = 0.01;
                    this.body.mass = 10;
                    this.RemainingTime = 350;
                    this.TargetVeloX = velox * 50;
                    this.TargetVeloY = veloy * 50;
                    break;
            }

        }
        private static GetGraphic(type: number)
        {
            switch (type)
            {
                case 0: return "content-graphics-attacks-hitspotsword";
                case 1: return "content-graphics-attacks-hitspotspell";
            }
        }
        update()
        {
            this.body.velocity.x = this.TargetVeloX;
            this.body.velocity.y = this.TargetVeloY;
            this.RemainingTime--;
        }
    }
}