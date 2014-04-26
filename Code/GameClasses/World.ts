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
        MasterMap: Phaser.Tilemap;
        MainTileMap_L1: Phaser.Tilemap;
        constructor(game: Phaser.Game)
        {
            this.MasterMap = game.add.tilemap(null);
            this.MasterMap.addTilesetImage("content-graphics-world-dungeontiles");

            this.MainTileMap_L1 = this.MasterMap.create("L12", 100, 100, 32, 32);
            for (var x = 0; x < 50; x++)
            {
                for (var y = 0; y < 50; y++)
                {
                    this.MasterMap.putTile(0, x, y, this.MainTileMap_L1);
                }
            }
        }
    }
}