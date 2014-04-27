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

        private CharactersInWorld: Array<Characters.CharacterBase>;
        private static AttacksInWorld: Array<DamageBox>;
        private VisualSortGroup: Phaser.Group;
        private MasterMap: Phaser.Tilemap;
        private MasterMap_L1: Phaser.TilemapLayer;

        private TheGame: Phaser.Game;

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
            World.AttacksInWorld = new Array<DamageBox>();
            this.VisualSortGroup = game.add.group();
        }
        AddCharacter(character: Characters.CharacterBase)
        {
            this.CharactersInWorld.push(character);
            character.SetWorld(this);
            this.VisualSortGroup.add(character);

        }
        RemoveCharacter(character: Characters.CharacterBase)
        {
            var index = this.CharactersInWorld.indexOf((character), 0);
            if (index != null)
            {
                this.CharactersInWorld.splice(index, 1);
            }
            character.destroy();
        }
        static AddAttack(attack: DamageBox)
        {
            World.AttacksInWorld.push(attack);
        }
        static RemoveAttack(attack: DamageBox)
        {
            var index = World.AttacksInWorld.indexOf((attack), 0);
            if (index != null)
            {
                World.AttacksInWorld.splice(index, 1);
            }
            attack.destroy();
        }

        Update()
        {
            this.VisualSortGroup.sort('y', Phaser.Group.SORT_ASCENDING);
            for (var i = this.CharactersInWorld.length - 1; i >= 0; i--)
            {
                var character = this.CharactersInWorld[i];
                character.MovementUpdate();
                character.update();
                if (character.Health <= 0)
                {
                    this.RemoveCharacter(character);
                    continue;
                }

                this.TheGame.physics.arcade.collide(character, this.MasterMap_L1);
            }

            for (var i = World.AttacksInWorld.length - 1; i >= 0; i--)
            {
                var attack = World.AttacksInWorld[i];
                attack.update();
                if (attack.RemainingTime <= 0) 
                {
                    World.RemoveAttack(attack);
                    continue;
                }
                for (var c = 0; c < this.CharactersInWorld.length; c++)
                {
                    this.TheGame.physics.arcade.collide(this.CharactersInWorld[c], World.AttacksInWorld[i], this.CharacterHitByAttack);
                }
            }
        }
        CharacterHitByAttack(obj1, obj2)
        {
            if (obj1 == null || obj2 == null) return;
            if (obj1 instanceof DamageBox)
            {
                (<Characters.CharacterBase>obj2).Hit((<DamageBox>obj1).Strength);
                World.RemoveAttack(<DamageBox>obj1);
                return;
            }
            if (obj2 instanceof DamageBox)
            {
                (<Characters.CharacterBase>obj1).Hit((<DamageBox>obj2).Strength);
                World.RemoveAttack(<DamageBox>obj2);
                return;
            }
        }

    }
}