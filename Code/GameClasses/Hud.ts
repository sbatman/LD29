// /// LD29
// /// 03/04/2014
// /// By Steven Batchelor-Manning (http://insanedev.co.uk)
// /// and Sin Estelle
// ///////////////////////////
module LD29
{
    export class Hud
    {
        BackgroundSprite: Phaser.Sprite;
        HPBarSprites: Array<Phaser.Sprite>;
        MPBarSprites: Array<Phaser.Sprite>;
        XPBarSprites: Array<Phaser.Sprite>;

        CurrentHP: number;
        CurrentMP: number;
        CurrentXP: number;

        LastHP: number;
        LastMP: number;
        LastXP: number;

        TheGame: Phaser.Game; // you have just lost this <<<<< :D

        constructor(game: Phaser.Game)
        {
            this.BackgroundSprite = new Phaser.Sprite(game, 0, 0, "content-graphics-hud-statsblob");
            game.add.existing(this.BackgroundSprite);

            this.BackgroundSprite.y = game.canvas.height - this.BackgroundSprite.height;
            this.BackgroundSprite.fixedToCamera = true;
            this.LastHP = 0;
            this.LastMP = 0;
            this.LastXP = 0;
            this.CurrentHP = 0;
            this.CurrentMP = 0;
            this.CurrentXP = 0;
            this.HPBarSprites = new Array<Phaser.Sprite>();
            this.MPBarSprites = new Array<Phaser.Sprite>();
            this.XPBarSprites = new Array<Phaser.Sprite>();
            this.TheGame = game;
        }
        Update()
        {
            if (this.CurrentHP != this.LastHP)
            {
                this.LastHP = this.CurrentHP;
                for (var i = 0; i < this.HPBarSprites.length; i++)  this.HPBarSprites[i].destroy();

                for (var i = 0; i < this.CurrentHP; i++)
                {
                    var s = new Phaser.Sprite(this.TheGame, this.BackgroundSprite.x + 84 + (8 * i), this.BackgroundSprite.y + 6, "content-graphics-hud-redsegment");
                    s.fixedToCamera = true;
                    this.HPBarSprites.push(s);
                    this.TheGame.add.existing(s);
                }

            }
        }
    }
}