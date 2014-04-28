module LD29
{
    export class DamageBox extends Phaser.Sprite
    {
        RemainingTime: number;
        Strength: number;
        Owner: Characters.CharacterBase;
        DieOnHit: boolean;

        Target: Characters.CharacterBase;

        TargetVeloX: number;
        TargetVeloY: number;

        constructor(game: Phaser.Game, x: number, y: number, velox: number, veloy: number, owner: Characters.CharacterBase, type: number, rangeMultiplier: number, damageMultiplier: number)
        {
            super(game, x, y, DamageBox.GetGraphic(type), 0);
            game.physics.enable(this);

            this.anchor.setTo(0.5, 0.5);

            this.Owner = owner;

            game.add.existing(this);
            this.rotation = Phaser.Math.angleBetween(0, 0, veloy, velox);
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
                    this.Strength = 2;
                    this.body.mass = 0;
                    this.RemainingTime = 180;
                    this.DieOnHit = true;
                    this.TargetVeloX = velox * 35;
                    this.TargetVeloY = veloy * 35;
                    break;
                case 3:
                    this.Strength = 0.1;
                    this.body.mass = 0;
                    this.RemainingTime = 180;
                    this.DieOnHit = true;
                    this.body.velocity.x = this.game.rnd.realInRange(-75, 75);
                    this.body.velocity.y = this.game.rnd.realInRange(-75, 75);
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
                case 3: return "content-graphics-attacks-hitspotdarkspell";
            }
        }
        setTarget(target: Characters.CharacterBase)
        {
            this.Target = target;
        }
        update()
        {

            this.RemainingTime--;
            if (this.Target != null)
            {
                var dir;
                dir = new Phaser.Point(this.Target.x - this.x, this.Target.y - this.y);
                dir.normalize();
                this.body.velocity.x += dir.x * 5;
                this.body.velocity.y += dir.y * 5;
            } else
            {
                this.body.velocity.x = this.TargetVeloX;
                this.body.velocity.y = this.TargetVeloY;
            }
        }
        render()
        {
            this.game.debug.body(this);
        }
    }
}