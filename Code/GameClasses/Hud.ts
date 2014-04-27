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

        CurretScore: number;

        private LastHP: number;
        private LastMP: number;
        private LastXP: number;
        private LastScore: number;

        private TheGame: Phaser.Game; // you have just lost this <<<<< :D

        private InfoPopUpGraphic: Phaser.Sprite;
        private InfoPopUpFadeoutTimer: Phaser.Timer;
        private InfoPopUpPendingStrings: Array<string>;
        private InfoPopUpText: Phaser.Text;

        private ScoreBarGraphic: Phaser.Sprite;
        private ScoreBarText: Phaser.Text;

        private StatsBlobTargetY: number;
        private StatsBlobTargetX: number;

        constructor(game: Phaser.Game)
        {
            this.BackgroundSprite = new Phaser.Sprite(game, 0, 0, "content-graphics-hud-statsblob");
            game.add.existing(this.BackgroundSprite);
            this.StatsBlobTargetY = game.canvas.height - this.BackgroundSprite.height;
            this.StatsBlobTargetX = 0;
            this.BackgroundSprite.y = this.StatsBlobTargetY;
            this.BackgroundSprite.fixedToCamera = true;

            this.LastHP = 0;
            this.LastMP = 0;
            this.LastXP = 0;
            this.LastScore = 0;
            this.CurrentHP = 0;
            this.CurrentMP = 0;
            this.CurrentXP = 0;
            this.CurretScore = 0;
            this.HPBarSprites = new Array<Phaser.Sprite>();
            this.MPBarSprites = new Array<Phaser.Sprite>();
            this.XPBarSprites = new Array<Phaser.Sprite>();

            this.TheGame = game;

            this.InfoPopUpPendingStrings = new Array<string>();
            this.InfoPopUpGraphic = new Phaser.Sprite(game, 0, 0, "content-graphics-hud-infopopup");
            this.InfoPopUpGraphic.alpha = 0;
            this.InfoPopUpGraphic.fixedToCamera = true;
            game.add.existing(this.InfoPopUpGraphic);
            this.InfoPopUpFadeoutTimer = this.TheGame.time.create(false);
            this.InfoPopUpText = this.TheGame.add.text(0, 0, "", { font: "20px Arial", fill: "#DAD45E", stroke: '#000000', strokeThickness: 3 });
            this.InfoPopUpText.alpha = 0;
            this.InfoPopUpText.fixedToCamera = true;
            this.ScoreBarGraphic = new Phaser.Sprite(game, 0, 0, "content-graphics-hud-scorebar");
            this.ScoreBarGraphic.fixedToCamera = true;
            game.add.existing(this.ScoreBarGraphic);
            this.ScoreBarText = this.TheGame.add.text(2, 2, "", { font: "20px Arial", fill: "#DAD45E", stroke: '#000000', strokeThickness: 3 });
            this.ScoreBarText.fixedToCamera = true;
        }

        FireInfoPopup(message: string)
        {
            if (this.InfoPopUpFadeoutTimer.running || this.InfoPopUpText.alpha != 0)
            {
                this.InfoPopUpPendingStrings.push(message);
                return;
            }
            this.InfoPopUpGraphic.fixedToCamera = false;
            this.InfoPopUpGraphic.x = (this.TheGame.canvas.width * 0.5) - (this.InfoPopUpGraphic.width * 0.5);
            this.InfoPopUpGraphic.y = (this.TheGame.canvas.height * 0.5) - (this.InfoPopUpGraphic.height) - 200;
            this.InfoPopUpGraphic.fixedToCamera = true;
            this.InfoPopUpText.fixedToCamera = false;
            this.InfoPopUpText.text = message;
            this.InfoPopUpText.x = (this.TheGame.canvas.width * 0.5) - (this.InfoPopUpText.width * 0.5);
            this.InfoPopUpText.y = (this.TheGame.canvas.height * 0.5) - (this.InfoPopUpText.height + 18) - 200;
            this.InfoPopUpText.fixedToCamera = true;

            this.TheGame.add.tween(this.InfoPopUpGraphic).to({ alpha: 1 }, 300,
                Phaser.Easing.Linear.None, true);
            this.TheGame.add.tween(this.InfoPopUpText).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true);
            this.InfoPopUpFadeoutTimer.add(3000, this.InfoPopupComplete, this);
            this.InfoPopUpFadeoutTimer.start();
        }

        private InfoPopupMsgRemaining()
        {
            return this.InfoPopUpPendingStrings.length + ((!this.InfoPopUpFadeoutTimer.running && this.InfoPopUpText.alpha == 0) ? 0 : 1);
        }

        private InfoPopupComplete()
        {
            this.InfoPopUpFadeoutTimer.stop();
            this.TheGame.add.tween(this.InfoPopUpGraphic).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true);
            this.TheGame.add.tween(this.InfoPopUpText).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true);
        }

        Update()
        {
            if (this.CurretScore != this.LastScore)
            {
                this.LastScore = this.CurretScore;
                this.ScoreBarText.text = "Score: " + Math.round(this.CurretScore);
            }

            if (this.InfoPopUpPendingStrings.length != 0)
            {
                if (!this.InfoPopUpFadeoutTimer.running && this.InfoPopUpText.alpha == 0)
                {
                    var next = this.InfoPopUpPendingStrings.shift();
                    this.FireInfoPopup(next);
                }
            }

            if (Math.round(this.CurrentHP) != this.LastHP)
            {
                this.LastHP = Math.round(this.CurrentHP);
                for (var i = 0; i < this.HPBarSprites.length; i++)  this.HPBarSprites[i].destroy();

                for (var i = 0; i < this.CurrentHP; i++)
                {
                    var s = new Phaser.Sprite(this.TheGame, this.StatsBlobTargetX + 84 + (8 * i), this.StatsBlobTargetY + 6, "content-graphics-hud-redsegment");
                    s.fixedToCamera = true;
                    this.HPBarSprites.push(s);
                    this.TheGame.add.existing(s);
                }

            }
            if (Math.round(this.CurrentMP) != this.LastMP)
            {
                this.LastMP = Math.round(this.CurrentMP);
                for (var i = 0; i < this.MPBarSprites.length; i++)  this.MPBarSprites[i].destroy();

                for (var i = 0; i < this.CurrentMP; i++)
                {
                    var s = new Phaser.Sprite(this.TheGame, this.StatsBlobTargetX + 84 + (8 * i), this.StatsBlobTargetY + 26, "content-graphics-hud-bluesegment");
                    s.fixedToCamera = true;
                    this.MPBarSprites.push(s);
                    this.TheGame.add.existing(s);
                }

            }
            if (Math.round(this.CurrentXP) != this.LastXP)
            {
                this.LastXP = Math.round(this.CurrentXP);
                for (var i = 0; i < this.XPBarSprites.length; i++)  this.XPBarSprites[i].destroy();

                for (var i = 0; i < this.CurrentXP; i++)
                {
                    var s = new Phaser.Sprite(this.TheGame, this.StatsBlobTargetX + 84 + (8 * i), this.StatsBlobTargetY + 46, "content-graphics-hud-greensegment");
                    s.fixedToCamera = true;
                    this.XPBarSprites.push(s);
                    this.TheGame.add.existing(s);
                }

            }
        }
    }
}