// ///////////////////////////
// /// LD29
// /// 03/04/2014
// /// By Steven Batchelor-Manning (http://insanedev.co.uk)
// /// and Sin Estelle
// ///////////////////////////
module LD29
{
    export class BootState extends Phaser.State
    {

        preload()
        {
            //load the loading bar BEFORE the main loading phase.
            this.load.image('content-graphics-PreLoader-ProgressBar', 'Content/Graphics/PreLoader/ProgressBar.jpg');
        }

        create()
        {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = false;
            // this.game.world.width = 20000;
            // this.game.camera.bounds.width = 20000;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.state.start('Preloader', true, false);

        }

    }

}