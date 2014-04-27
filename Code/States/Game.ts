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
            this.Monsters.push(new Characters.Monster(this.game, 1476, 20, 'content-graphics-monsters-skeleton'));
            this.Monsters.push(new Characters.Monster(this.game, 1473, 21, 'content-graphics-monsters-green_zombie'));
            this.Monsters.push(new Characters.Monster(this.game, 1476, 22, 'content-graphics-monsters-skeleton'));
            this.Monsters.push(new Characters.Monster(this.game, 1473, 23, 'content-graphics-monsters-green_zombie'));
            this.Monsters.push(new Characters.Monster(this.game, 1476, 24, 'content-graphics-monsters-skeleton'));
            this.Monsters.push(new Characters.Monster(this.game, 1473, 25, 'content-graphics-monsters-green_zombie'));

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

            var Center = new WalkingNode(null, null, 1016, 819);
            var na2 = new WalkingNode(Center, null, 634, 825);
            var na3 = new WalkingNode(na2, null, 551, 631);
            var na4 = new WalkingNode(na3, null, 518, 219);
            var na5 = new WalkingNode(na4, null, 332, 219);
            var na6 = new WalkingNode(na5, null, 81, 171);


            var nc1 = new WalkingNode(na4, null, 679, 252);
            var nc2 = new WalkingNode(nc1, null, 1223, 252);


            var nb2 = new WalkingNode(Center, null, 1301, 699);
            var nb3 = new WalkingNode(nb2, null, 1568, 699);
            var nb4 = new WalkingNode(nb3, null, 1551, 364);
            var nb5 = new WalkingNode(nb4, nc2, 1496, 232);
            var nb6 = new WalkingNode(nb5, null, 1496, 15);

          ;

            this.GameWorld.AddWalkingNode(Center);
            this.GameWorld.AddWalkingNode(na2);
            this.GameWorld.AddWalkingNode(na3);
            this.GameWorld.AddWalkingNode(na4);
            this.GameWorld.AddWalkingNode(na5);
            this.GameWorld.AddWalkingNode(na6);

            this.GameWorld.AddWalkingNode(nb2);
            this.GameWorld.AddWalkingNode(nb3);
            this.GameWorld.AddWalkingNode(nb4);
            this.GameWorld.AddWalkingNode(nb5);
            this.GameWorld.AddWalkingNode(nb6);

            this.GameWorld.AddWalkingNode(nc1);
            this.GameWorld.AddWalkingNode(nc2);
            ///

          

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