﻿// /// LD29
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

        private LastHP: number;
        private LastMP: number;
        private LastXP: number;

        TheGame: Phaser.Game; // you have just lost this <<<<< :D

        InfoPopUpGraphic: Phaser.Sprite;
        InfoPopUpFadeoutTimer: Phaser.Timer;
        InfoPopUpPendingStrings: Array<string>;
        InfoPopUpText:  Phaser.Text;

        constructor(game: Phaser.Game)
        {
            this.InfoPopUpPendingStrings = new Array<string>();
            this.BackgroundSprite = new Phaser.Sprite(game, 0, 0, "content-graphics-hud-statsblob");
            this.InfoPopUpGraphic = new Phaser.Sprite(game, 0, 0, "content-graphics-hud-infopopup");
            this.InfoPopUpGraphic.alpha = 0;
            game.add.existing(this.InfoPopUpGraphic );
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
            this.InfoPopUpFadeoutTimer = this.TheGame.time.create(false);
        }

        FireInfoPopup(message: string)
        {
            if (this.InfoPopUpFadeoutTimer.running)
            {                
                this.InfoPopUpPendingStrings.push(message);
                return;
            }
            this.TheGame.add.tween(this.InfoPopUpGraphic).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true);
            this.InfoPopUpFadeoutTimer.add(3000, this.InfoPopupComplete, this);
            this.InfoPopUpFadeoutTimer.start();
        }

        InfoPopupComplete()
        {
            this.TheGame.add.tween(this.InfoPopUpGraphic).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true);
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
            if (this.CurrentMP != this.LastMP)
            {
                this.LastMP = this.CurrentMP;
                for (var i = 0; i < this.MPBarSprites.length; i++)  this.MPBarSprites[i].destroy();

                for (var i = 0; i < this.CurrentMP; i++)
                {
                    var s = new Phaser.Sprite(this.TheGame, this.BackgroundSprite.x + 84 + (8 * i), this.BackgroundSprite.y + 26, "content-graphics-hud-bluesegment");
                    s.fixedToCamera = true;
                    this.MPBarSprites.push(s);
                    this.TheGame.add.existing(s);
                }

            }
            if (this.CurrentXP != this.LastXP)
            {
                this.LastXP = this.CurrentXP;
                for (var i = 0; i < this.XPBarSprites.length; i++)  this.XPBarSprites[i].destroy();

                for (var i = 0; i < this.CurrentXP; i++)
                {
                    var s = new Phaser.Sprite(this.TheGame, this.BackgroundSprite.x + 84 + (8 * i), this.BackgroundSprite.y + 46, "content-graphics-hud-greensegment");
                    s.fixedToCamera = true;
                    this.XPBarSprites.push(s);
                    this.TheGame.add.existing(s);
                }

            }
        }
    }
}