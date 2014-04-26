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
        GameCharacter: Characters.CharacterBase;

        preload()
        {
  
        }

        create()
        {
            this.GameCharacter = new Characters.CharacterBase(this.game,50,50,'');
        }
    }

} 