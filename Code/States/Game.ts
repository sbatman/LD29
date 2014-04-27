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
        static Monsters: Characters.Monster[] = [];
        GameCharacterBase: Characters.CharacterBase;
        static GameCharacter: Characters.Player;
        static PossibleSpawnNodes: Array<WalkingNode>;

        static CurrentScore: number;

        static WaveTimer: number = 0;
        static Stage: number = 0;
        static State_WaveStart: number = 0;
        static State_WaveActive: number = 1;
        static State_WaveCoolDown: number = 2;

        static WaveCount: number = 0;
        static SpawnCountRemaining: number = 0;

        static PlayerXP: number = 0;
        static PlayerLevel: number = 1;
        static PlayerXPToLevel: number = 200;

        preload()
        {

        }

        create()
        {
            GameState.PossibleSpawnNodes = new Array<WalkingNode>();
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.GameWorld = new World(this.game);

            GameState.CurrentScore = 0;

            GameState.GameCharacter = new Characters.Player(this.game, 1016, 819, 'content-graphics-monsters-gold_zombie');

            this.GameWorld.AddCharacter(GameState.GameCharacter);

            //Walking Nodes

            var Center = new WalkingNode(null, null, 1016, 819);
            var na1 = new WalkingNode(Center, null, 845, 770);
            var na2 = new WalkingNode(na1, null, 634, 825);
            var na3 = new WalkingNode(na2, null, 551, 631);
            var na4 = new WalkingNode(na3, null, 518, 219);
            var na5 = new WalkingNode(na4, null, 332, 219);
            var na6 = new WalkingNode(na5, null, 81, 171);

            var nc1 = new WalkingNode(na4, null, 679, 252);
            var nc2 = new WalkingNode(nc1, null, 1223, 252);

            var nd2 = new WalkingNode(na1, null, 769, 1114);
            var nd3 = new WalkingNode(nd2, null, 519, 1118);
            var nd4 = new WalkingNode(nd3, null, 519, 878);
            na2.SetAlternative(nd4);

            var nb2 = new WalkingNode(Center, null, 1301, 699);
            var nb3 = new WalkingNode(nb2, null, 1568, 699);
            var nb4 = new WalkingNode(nb3, null, 1551, 364);
            var nb5 = new WalkingNode(nb4, nc2, 1486, 232);
            var nb6 = new WalkingNode(nb5, null, 1496, 15);

            var ne2 = new WalkingNode(nd2, null, 1000, 1124);
            var ne3 = new WalkingNode(ne2, null, 1002, 1392);
            var ne4 = new WalkingNode(ne3, null, 963, 1558);
            var ne5 = new WalkingNode(ne4, null, 617, 1645);
            var ne6 = new WalkingNode(ne5, null, 422, 1689);
            var ne7 = new WalkingNode(ne6, null, 422, 1901);

            var nf2 = new WalkingNode(ne3, null, 983, 1482);
            var nf3 = new WalkingNode(nf2, null, 1225, 1472);
            var nf4 = new WalkingNode(nf3, null, 1386, 1481);
            var nf5 = new WalkingNode(nf4, null, 1515, 1497);
            var nf6 = new WalkingNode(nf5, null, 1578, 1764);
            var nf7 = new WalkingNode(nf5, null, 1763, 1614);


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

            this.GameWorld.AddWalkingNode(nd2);
            this.GameWorld.AddWalkingNode(nd3);
            this.GameWorld.AddWalkingNode(nd4);

            this.GameWorld.AddWalkingNode(ne2);
            this.GameWorld.AddWalkingNode(ne3);
            this.GameWorld.AddWalkingNode(ne4);
            this.GameWorld.AddWalkingNode(ne5);
            this.GameWorld.AddWalkingNode(ne6);
            this.GameWorld.AddWalkingNode(ne7);

            this.GameWorld.AddWalkingNode(nf2);
            this.GameWorld.AddWalkingNode(nf3);
            this.GameWorld.AddWalkingNode(nf4);
            this.GameWorld.AddWalkingNode(nf5);
            this.GameWorld.AddWalkingNode(nf6);
            this.GameWorld.AddWalkingNode(nf7);
            ///
            ///--- Define the possible spawn nodes
            GameState.PossibleSpawnNodes.push(nf7);
            GameState.PossibleSpawnNodes.push(nf6);
            GameState.PossibleSpawnNodes.push(ne7);
            GameState.PossibleSpawnNodes.push(na6);
            GameState.PossibleSpawnNodes.push(nb6);
            ///


            GameState.GameHud = new Hud(this.game);
            GameState.GameHud.CurretScore = 0;
        }

        StartWave(difficulty: number)
        {
            GameState.SpawnCountRemaining = difficulty;

        }

        SpawnMob(type: string)
        {
            var startPosition = GameState.PossibleSpawnNodes[this.game.rnd.integerInRange(0, GameState.PossibleSpawnNodes.length - 1)];
            var mob = new Characters.Monster(this.game, startPosition.X + this.game.rnd.integerInRange(-10, 10), startPosition.Y + this.game.rnd.integerInRange(-10, 10), type);
            GameState.Monsters.push(mob);
            this.GameWorld.AddCharacter(mob);
            mob.SetTarget(GameState.GameCharacter);
        }

        static MobKilled(mob: Characters.Monster)
        {
            var value = 0;
            switch (mob.Type)
            {
                case "green_zombie": value = 6; break;
                case "skeleton": value = 8; break;
            }
            GameState.CurrentScore += value;
            GameState.GameHud.CurretScore = GameState.CurrentScore;
            GameState.PlayerXP += value * GameState.GameCharacter.Health / GameState.GameCharacter.MaxHealth;
            var index = GameState.Monsters.indexOf((mob), 0);
            if (index != null)
            {
                GameState.Monsters.splice(index, 1);
            }
        }

        update()
        {
            this.GameWorld.Update();

            if (GameState.PlayerXP >= GameState.PlayerXPToLevel)
            {
                GameState.PlayerXP -= GameState.PlayerXPToLevel;
                GameState.PlayerLevel++;
                GameState.PlayerXPToLevel *= 1.1;
                GameState.GameHud.FireInfoPopup("You are now level " + GameState.PlayerLevel);
            }
            
            GameState.GameHud.CurrentXP = (GameState.PlayerXP / GameState.PlayerXPToLevel)*10;

            GameState.GameHud.Update();

            if (GameState.WaveTimer > 0)
            {
                GameState.WaveTimer--;
                return;
            }
            switch (GameState.Stage)
            {
                case GameState.State_WaveStart:
                    GameState.WaveCount++;
                    GameState.GameHud.FireInfoPopup("Wave " + GameState.WaveCount + " Begins");
                    this.StartWave(5 + (GameState.WaveCount * 2));
                    GameState.Stage = GameState.State_WaveActive;
                    break;
                case GameState.State_WaveActive:
                    if (GameState.Monsters.length > 0 || GameState.SpawnCountRemaining > 0)
                    {
                        GameState.WaveTimer = 20;
                        if (GameState.SpawnCountRemaining > 0)
                        {
                            GameState.SpawnCountRemaining--;
                            switch (this.game.rnd.integerInRange(0, 1))
                            {
                                case 0: this.SpawnMob("green_zombie"); break;
                                case 1: this.SpawnMob("skeleton"); break;
                            }
                        }

                    } else
                    {
                        GameState.WaveTimer = 500;
                        GameState.Stage = GameState.State_WaveCoolDown;
                        GameState.GameCharacter.Heal();
                        GameState.GameHud.FireInfoPopup("Wave " + GameState.WaveCount + " Complete");
                        GameState.GameHud.CurretScore += 100 * GameState.WaveCount;
                        GameState.PlayerXP += (100 * (GameState.WaveCount*0.8)) * GameState.GameCharacter.Health / GameState.GameCharacter.MaxHealth;
                    }

                    break;
                case GameState.State_WaveCoolDown:

                    GameState.WaveTimer = 200;
                    GameState.Stage = GameState.State_WaveStart;
                    break;

            }
        }

        render()
        {
          //  this.game.debug.body(GameState.GameCharacter);
         //   this.game.debug.bodyInfo(GameState.GameCharacter, 200, 200);
        }
    }

} 