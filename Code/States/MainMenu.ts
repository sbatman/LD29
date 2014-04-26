// ///////////////////////////
// /// LD29
// /// 03/04/2014
// /// By Steven Batchelor-Manning (http://insanedev.co.uk)
// /// and Sin Estelle
// ///////////////////////////
module LD29
{
    export class MenuState extends Phaser.State
    {

        preload()
        {

        }

        create()
        {
            this.game.state.start('Game', true, false);

        }

    }

}