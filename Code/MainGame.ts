// ///////////////////////////
// /// LD29
// /// 03/04/2014
// /// By Steven Batchelor-Manning (http://insanedev.co.uk)
// /// and Sin Estelle
// ///////////////////////////
module LD29
{
    export class MainGame extends Phaser.Game
    {

        constructor()
        {
            super(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', null);
            this.state.add('Boot', BootState, false);
            this.state.add('Preloader', PreloaderState, false);
            this.state.add('MainMenu', MenuState, false);
            this.state.add('Game', GameState, false);

            this.state.start('Boot');
        }
    }
}