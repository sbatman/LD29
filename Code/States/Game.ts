﻿// ///////////////////////////
// /// LD29
// /// 03/04/2014
// /// By Steven Batchelor-Manning (http://insanedev.co.uk)
// /// and Sin Estelle
// ///////////////////////////
module LD29
{
    export class GameState extends Phaser.State
    {
        GameWorld: World;
        GameHud: Hud;
        preload()
        {

        }

        create()
        {
            this.GameWorld = new World(this.game);
            this.GameHud = new Hud(this.game);
            this.GameHud.CurrentHP = 8;
            this.GameHud.CurrentMP = 3;
            this.GameHud.CurrentXP = 10;
            this.GameHud.FireInfoPopup("This is a test message");
            this.GameHud.FireInfoPopup("And this is a second");
            this.GameHud.FireInfoPopup("hello, how you doing ?");
            this.GameHud.FireInfoPopup("time for cake");
        }

        update()
        {
            this.GameHud.Update();
        }
    }

} 