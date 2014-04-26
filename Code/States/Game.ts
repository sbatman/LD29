// ///////////////////////////
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
        }

        update()
        {
            this.GameHud.Update();
        }
    }

} 