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
        GameCharacterBase: Characters.CharacterBase;
        GameCharacter: Characters.Player;

        preload()
        {

        }

        create()
        {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);           
            this.GameWorld = new World(this.game);

            this.Monsters.push(new Characters.Monster(this.game, 400, 500, 'content-graphics-monsters-skeleton'));
            this.Monsters.push(new Characters.Monster(this.game, 100, 100, 'content-graphics-monsters-green_zombie'));

            this.GameCharacter = new Characters.Player(this.game, 750, 600,'content-graphics-monsters-gold_zombie');
     
            this.GameWorld.AddCharacter(this.GameCharacter);

            for (var i = 0; i < this.Monsters.length; i++) {
                this.GameWorld.AddCharacter(this.Monsters[i]);
            }
            for (var i = 0; i < this.Monsters.length; i++)
            {
                this.Monsters[i].SetTarget(this.GameCharacter);
            }
            this.GameHud = new Hud(this.game);
            this.GameHud.FireInfoPopup("This is a test message");
            this.GameHud.FireInfoPopup("And this is a second");
            this.GameHud.FireInfoPopup("hello, how you doing ?");
            this.GameHud.FireInfoPopup("time for cake");
            this.GameHud.CurretScore = 9001;
        }


        update()
        {
            this.GameWorld.Update();
            this.GameHud.Update();

            this.GameHud.CurrentHP = this.game.rnd.realInRange(0, 10);
            this.GameHud.CurrentMP = this.game.rnd.realInRange(0, 10);
            this.GameHud.CurrentXP = this.game.rnd.realInRange(0, 10);
            this.GameHud.CurretScore = this.game.rnd.realInRange(9001, 9005);            
        }
        render()
        {
            this.game.debug.bodyInfo(this.Monsters[1] , 32, 320);
        }
    }

} 