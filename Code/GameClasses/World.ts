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
        CollidableSprites: Array<Phaser.Sprite>;
        MasterMap: Phaser.Tilemap;
        MasterMap_L1: Phaser.TilemapLayer;

        TheGame: Phaser.Game;

       // MainTileMap_L1: Phaser.Tilemap;
        constructor(game: Phaser.Game)
        {
            this.MasterMap = game.add.tilemap("content-data-world-main",32,32);
            this.MasterMap.addTilesetImage("content-graphics-world-dungeontiles");
            this.MasterMap_L1 = this.MasterMap.createLayer(0);
            this.MasterMap_L1.resizeWorld();
            this.MasterMap.setCollisionBetween(33, 37);
            this.MasterMap.setCollisionBetween(12, 16);
            this.MasterMap.setCollision(59);
            this.MasterMap_L1.debug = true;
            this.CollidableSprites = new Array<Phaser.Sprite>();
            this.TheGame = game;        
        }
        SetSpriteAsCollidable(sprite : Phaser.Sprite)
        {
            this.CollidableSprites.push(sprite);
        }
        Update()
        {
            for (var i=0; i < this.CollidableSprites.length; i++)
            {
                this.TheGame.physics.arcade.collide(this.CollidableSprites[i], this.MasterMap_L1);

                if (this.CollidableSprites[i].body.onFloor())
                {
                    this.CollidableSprites[i].body.velocity.y = 0;
                }
            }

        }
        
    }
}