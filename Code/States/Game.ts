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
        GameCharacter: Characters.CharacterBase;

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
            this.GameCharacter = new Characters.CharacterBase(this.game, 100, 100, 'content-graphics-monsters-zombies_and_skeletons');
            this.GameHud.CurretScore = 9001;
            this.GameWorld.SetSpriteAsCollidable(this.GameCharacter);
        }

        update()
        {
            this.GameWorld.Update();
            this.GameHud.Update();
            this.GameCharacter.MovementUpdate();
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