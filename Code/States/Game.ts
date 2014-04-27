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
        static GameHud: Hud;
        Monsters: Characters.Monster[] = [];
        GameCharacterBase: Characters.CharacterBase;
        static GameCharacter: Characters.Player;

        preload()
        {

        }

        create()
        {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.GameWorld = new World(this.game);
            this.Monsters.push(new Characters.Monster(this.game, 81, 181, 'content-graphics-monsters-skeleton'));
            this.Monsters.push(new Characters.Monster(this.game, 81, 131, 'content-graphics-monsters-green_zombie'));

            GameState.GameCharacter = new Characters.Player(this.game, 750, 600, 'content-graphics-monsters-gold_zombie');

            this.GameWorld.AddCharacter(GameState.GameCharacter);

            for (var i = 0; i < this.Monsters.length; i++)
            {
                this.GameWorld.AddCharacter(this.Monsters[i]);
            }
            for (var i = 0; i < this.Monsters.length; i++)
            {
                this.Monsters[i].SetTarget(GameState.GameCharacter);
            }

            //Walking Nodes

            var n1 = new WalkingNode(null, null, 1016, 819);
            var n2 = new WalkingNode(n1, null, 634, 825);
            var n3 = new WalkingNode(n2, null, 551, 631);
            var n4 = new WalkingNode(n3, null, 518, 219);
            var n5 = new WalkingNode(n4, null, 332, 219);
            var n6 = new WalkingNode(n5, null, 81, 171);

            this.GameWorld.AddWalkingNode(n1);
            this.GameWorld.AddWalkingNode(n2);
            this.GameWorld.AddWalkingNode(n3);
            this.GameWorld.AddWalkingNode(n4);
            this.GameWorld.AddWalkingNode(n5);
            this.GameWorld.AddWalkingNode(n6);
            ///

            this.Monsters[0].SetWalkingNode(n6);
            this.Monsters[1].SetWalkingNode(n6);

            GameState.GameHud = new Hud(this.game);
            GameState.GameHud.FireInfoPopup("This is a test message");
            GameState.GameHud.FireInfoPopup("And this is a second");
            GameState.GameHud.FireInfoPopup("hello, how you doing ?");
            GameState.GameHud.FireInfoPopup("time for cake");
            GameState.GameHud.CurretScore = 9001;
        }

        update()
        {
            this.GameWorld.Update();
            GameState.GameHud.Update();
            GameState.GameHud.CurretScore = this.game.rnd.realInRange(9001, 9005);

        }

        render()
        {
            this.game.debug.body(GameState.GameCharacter);
            this.game.debug.bodyInfo(GameState.GameCharacter, 200, 200);
        }
    }

} 