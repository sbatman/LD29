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
        MasterMap_L1: Phaser.TilemapLayer;
       // MainTileMap_L1: Phaser.Tilemap;
        constructor(game: Phaser.Game)
        {
            this.MasterMap = game.add.tilemap("content-data-world-main",32,32);
            this.MasterMap.addTilesetImage("content-graphics-world-dungeontiles");
            this.MasterMap_L1 = this.MasterMap.createLayer(0);
            this.MasterMap_L1.resizeWorld();
           
        }
    }
}