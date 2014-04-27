// ///////////////////////////
// /// LD29
// /// 03/04/2014
// /// By Steven Batchelor-Manning (http://insanedev.co.uk)
// /// and Sin Estelle
// ///////////////////////////
module LD29
{
    export class PreloaderState extends Phaser.State
    {
        //reference to our preloading bar sprite.
        preloadBar: Phaser.Sprite;
        loadingMessage: Phaser.Text;

        preload()
        {
          
            var sprite = new Phaser.Sprite(this.game, 0, 0, "content-graphics-title");
            sprite.x = (this.game.canvas.width * 0.5) - (sprite.width * 0.5);
            sprite.y = (this.game.canvas.height * 0.5) - (sprite.height * 0.5);
            this.game.add.existing(sprite);        
            //Load world Data 
            this.load.tilemap("content-data-world-main", "Content/Data/World/Main2.csv", null, Phaser.Tilemap.CSV);
            //load all hud images.          
            this.load.image("content-graphics-hud-statsblob", "Content/Graphics/Hud/StatsBlob.png");
            this.load.image("content-graphics-hud-redsegment", "Content/Graphics/Hud/RedSegment.png");
            this.load.image("content-graphics-hud-bluesegment", "Content/Graphics/Hud/BlueSegment.png");
            this.load.image("content-graphics-hud-greensegment", "Content/Graphics/Hud/GreenSegment.png");
            this.load.image("content-graphics-hud-infopopup", "Content/Graphics/Hud/InfoPopup.png");
            this.load.image("content-graphics-hud-scorebar", "Content/Graphics/Hud/ScoreBar.png");


            //load spritesheets  
            this.load.image("content-graphics-world-dungeontiles", "Content/Graphics/World/DungeonTilesPrimary.png");
            //load all audio  

            //load character graphics
            this.load.spritesheet("content-graphics-monsters-green_zombie", "Content/Graphics/Monsters/GreenZombie.png", 32, 64);
            this.load.spritesheet("content-graphics-monsters-gold_zombie", "Content/Graphics/Monsters/GoldenZombie.png", 32, 64);
            this.load.spritesheet("content-graphics-monsters-undeadking", "Content/Graphics/Monsters/UndeadKing.png", 32, 64);
            this.load.spritesheet("content-graphics-monsters-skeleton", "Content/Graphics/Monsters/Skelly.png", 32, 64);

            //load attack graphics
            this.load.image("content-graphics-attacks-hitspotblades", "Content/Graphics/Attacks/HitSpotBlades.png");
            this.load.image("content-graphics-attacks-hitspotspell", "Content/Graphics/Attacks/HitSpotSpell.png");
            this.load.image("content-graphics-attacks-hitspotacid", "Content/Graphics/Attacks/HitSpotAcid.png");
            this.load.image("content-graphics-attacks-hitspotdarkspell", "Content/Graphics/Attacks/HitSpotDarkSpell.png");

            //Game over graphic
            this.load.image("content-graphics-gameover", "Content/Graphics/GameOver.jpg");

            ///audio
            this.load.audio("content-sound-maintheme", "Content/Audio/MainTheme.mp3", true);

            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite((window.innerWidth / 2) - 200, (window.innerHeight / 2) + 80, 'content-graphics-PreLoader-ProgressBar');
            this.load.setPreloadSprite(this.preloadBar);
            this.loadingMessage = this.game.add.text((window.innerWidth / 2) - 50, (window.innerHeight / 2) + 80, "Loading....", { font: "30px Arial", fill: "#00ff00", stroke: '#000000', strokeThickness: 3 });
            ;
        }


        create()
        {
            //allow the loading bar to animate as assets load, and switch to the main menu game state when loading completes.
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        }

        //switch to the main menu state at this point.
        startMainMenu()
        {
            this.game.state.start('MainMenu', true, false);
        }
    }
}