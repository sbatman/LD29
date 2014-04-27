// ///////////////////////////
// /// LD29
// /// 03/04/2014
// /// By Steven Batchelor-Manning (http://insanedev.co.uk)
// /// and Sin Estelle
// ///////////////////////////
module LD29
{
    export class World
    {

        CharactersInWorld: Array<Characters.CharacterBase>;
        VisualSortGroup: Phaser.Group;
        MasterMap: Phaser.Tilemap;
        MasterMap_L1: Phaser.TilemapLayer;

        TheGame: Phaser.Game;

        // MainTileMap_L1: Phaser.Tilemap;
        constructor(game: Phaser.Game)
        {
            this.MasterMap = game.add.tilemap("content-data-world-main", 32, 32);
            this.MasterMap.addTilesetImage("content-graphics-world-dungeontiles");
            this.MasterMap_L1 = this.MasterMap.createLayer(0);
            this.MasterMap_L1.resizeWorld();
            this.MasterMap.setCollisionBetween(33, 37);
            this.MasterMap.setCollisionBetween(12, 16);
            this.MasterMap.setCollision(59);
            this.MasterMap_L1.debug = true;
            this.TheGame = game;
            this.CharactersInWorld = new Array<Characters.CharacterBase>();
            this.VisualSortGroup = game.add.group();
        }
        AddCharacter(character: Characters.CharacterBase)
        {
            this.CharactersInWorld.push(character);
            this.VisualSortGroup.add(character);

        }
        Update()
        {
            this.VisualSortGroup.sort('y', Phaser.Group.SORT_ASCENDING);
            for (var i = 0; i < this.CharactersInWorld.length; i++)
            {
                this.TheGame.physics.arcade.collide(this.CharactersInWorld[i], this.MasterMap_L1);
            }
        }

    }
}