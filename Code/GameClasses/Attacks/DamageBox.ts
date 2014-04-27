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
            super(game, x, y, DamageBox.GetGraphic(type), 0);
            game.physics.enable(this);

            this.anchor.setTo(0.5, 0.5);

            this.Owner = owner;

            game.add.existing(this);
            this.rotation = Phaser.Math.angleBetween(0, 0, veloy, velox );
            switch (type)
            {
                case 0:
                    this.Strength = 1;
                    this.body.mass = 10;
                    this.RemainingTime = 100;
                    this.DieOnHit = true;
                    this.TargetVeloX = velox * 190;
                    this.TargetVeloY = veloy * 190;
                    break;
                case 1:
                    this.Strength = 0.1;
                    this.body.mass = 10;
                    this.DieOnHit = false;
                    this.RemainingTime = 350;
                    this.TargetVeloX = velox * 50;
                    this.TargetVeloY = veloy * 50;
                    break;
                case 2:
                    this.Strength =0.2;
                    this.body.mass = 0;
                    this.RemainingTime = 180;
                    this.DieOnHit = true;
                    this.TargetVeloX = velox * 35;
                    this.TargetVeloY = veloy * 35;
                    break;
            }
        }
        private static GetGraphic(type: number)
        {
            switch (type)
            {
                case 0: return "content-graphics-attacks-hitspotblades";
                case 1: return "content-graphics-attacks-hitspotspell";
                case 2: return "content-graphics-attacks-hitspotacid";
            }
        }
        update()
        {
            this.body.velocity.x = this.TargetVeloX;
            this.body.velocity.y = this.TargetVeloY;
            this.RemainingTime--;
        }
        render()
        {
            this.game.debug.body(this);
        }
    }
}