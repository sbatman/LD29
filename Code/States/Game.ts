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
        Monsters: Characters.Monster[] = [];
        //var Monsters = new CustomCollection<Characters.Monster>();
        //Monsters: Characters.Monster[] = new Characters.Monster[2];
        GameCharacterBase: Characters.CharacterBase;
        GameCharacter: Characters.Player;

        preload()
        {

        }

        create()
        {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);           
            this.GameWorld = new World(this.game);
            this.GameHud = new Hud(this.game);
            this.GameHud.FireInfoPopup("This is a test message");
            this.GameHud.FireInfoPopup("And this is a second");
            this.GameHud.FireInfoPopup("hello, how you doing ?");
            this.GameHud.FireInfoPopup("time for cake");
            //this.Monsters = new Array<Characters.Monster>(2);
            //this.Monsters[0] = new Characters.Monster(this.game, 100, 100, 'content-graphics-monsters-green_zombie');
            //this.Monsters[0] = 

            this.Monsters.push(new Characters.Monster(this.game, 400, 500, 'content-graphics-monsters-skeleton'));
            this.Monsters.push(new Characters.Monster(this.game, 100, 100, 'content-graphics-monsters-green_zombie'));

            this.GameCharacter = new Characters.Player(this.game, 750, 600,'content-graphics-monsters-gold_zombie');
            this.GameHud.CurretScore = 9001;
            this.GameWorld.SetSpriteAsCollidable(this.GameCharacter);

            for (var i = 0; i < this.Monsters.length; i++) {
                this.GameWorld.SetSpriteAsCollidable(this.Monsters[i]);
            }
        }

        update()
        {
            this.GameWorld.Update();
            this.GameHud.Update();
            this.GameCharacter.MovementUpdate();
            for (var i = 0; i < this.Monsters.length; i++)
            {
               this.Monsters[i].MovementUpdate();
        }
            this.GameHud.CurrentHP = this.game.rnd.realInRange(0, 10);
            this.GameHud.CurrentMP = this.game.rnd.realInRange(0, 10);
            this.GameHud.CurrentXP = this.game.rnd.realInRange(0, 10);
            this.GameHud.CurretScore = this.game.rnd.realInRange(9001, 9005);            
        }
        render()
        {
            this.game.debug.bodyInfo(this.GameCharacter , 32, 320);
        }
    }

} 