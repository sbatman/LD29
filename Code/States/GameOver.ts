// ///////////////////////////
// /// LD29
// /// 03/04/2014
// /// By Steven Batchelor-Manning (http://insanedev.co.uk)
// /// and Sin Estelle
// ///////////////////////////
module LD29
{
    export class GameOverState extends Phaser.State
    {
        playMessage: Phaser.Text;
        background: Phaser.Sprite;
        preload()
        {
            this.background = new Phaser.Sprite(this.game, 0, 0, "content-graphics-gameover");
            this.background.x = (this.game.canvas.width * 0.5) - (this.background.width * 0.5);
            this.background.y = (this.game.canvas.height * 0.5) - (this.background.height * 0.5);
            this.game.add.existing(this.background);
        }

        create()
        {
            this.playMessage = this.game.add.text((window.innerWidth / 2) - 70, (window.innerHeight / 2) + 75, "Final Score: " + GameState.CurrentScore, { font: "18px Arial", fill: "FF0008", stroke: '#000000', strokeThickness: 3 });
            
            this.playMessage = this.game.add.text((window.innerWidth / 2) - 75, (window.innerHeight / 2) + 95, "Click To Play Again", { font: "18px Arial", fill: "FF0008", stroke: '#000000', strokeThickness: 3 });
            //put event handler on user input to load the game fully when the user clicks a button.
            this.input.onDown.addOnce(this.fadeOut, this);
        }

        fadeOut()
        {
            this.add.tween(this.playMessage).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.background).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);

            tween.onComplete.add(this.startGame, this);
        }
        startGame()
        {
            location.reload();
        }
    }

}