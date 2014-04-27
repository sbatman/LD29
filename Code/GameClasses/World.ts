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
        private static WalkingNodes: Array<WalkingNode>;

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
            this.MasterMap.setCollisionBetween(54, 56);
            this.MasterMap.setCollision(59);
            this.MasterMap.setCollision(80);
            this.MasterMap.setCollision(72);
            this.MasterMap_L1.debug = true;
            this.TheGame = game;
            this.CharactersInWorld = new Array<Characters.CharacterBase>();
            World.AttacksInWorld = new Array<DamageBox>();
            World.WalkingNodes = Array<WalkingNode>();
            this.VisualSortGroup = game.add.group();
        }
        static GetClosestWalkingNode(x: number, y: number)
        {
            var returnVar = null;
            var BestDistance = 9999999;
            for (var i = 0; i < World.WalkingNodes.length; i++)
            {
                var distance = Math.abs(World.WalkingNodes[i].X - x) + Math.abs(World.WalkingNodes[i].Y - y);
                if (distance < BestDistance)
                {
                    BestDistance = distance;
                    returnVar = World.WalkingNodes[i];
                }

            }
            return returnVar;
        }

        AddWalkingNode(node: WalkingNode)
        {
            World.WalkingNodes.push(node);
        }
        AddCharacter(character: Characters.CharacterBase)
        {
            this.CharactersInWorld.push(character);
            character.SetWorld(this);
            this.VisualSortGroup.add(character);

        }
        RemoveCharacter(character: Characters.CharacterBase)
        {
            if(character == null) return;
            if (character instanceof Characters.Monster)
            {
                GameState.MobKilled(<Characters.Monster>character);
            }
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
            if (attack == null) return;
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
                    this.TheGame.physics.arcade.collide(this.CharactersInWorld[c], World.AttacksInWorld[i], this.CharacterHitByAttack, this.CheckAttackOwnbership);
                }
            }
        }
        CheckAttackOwnbership(obj1, obj2)
        {
            if (obj1 instanceof DamageBox)
            {
                if ((<DamageBox>obj1).Owner == obj2) return false;
            }
            if (obj2 instanceof DamageBox)
            {
                if ((<DamageBox>obj2).Owner == obj1) return false;
            }
            return true;
        }

        CharacterHitByAttack(obj1, obj2)
        {
            if (obj1 == null || obj2 == null) return;
            if (obj1 instanceof DamageBox)
            {
                (<Characters.CharacterBase>obj2).Hit((<DamageBox>obj1).Strength);
                if ((<DamageBox>obj1).DieOnHit) World.RemoveAttack(<DamageBox>obj1);
                return;
            }
            if (obj2 instanceof DamageBox)
            {
                (<Characters.CharacterBase>obj1).Hit((<DamageBox>obj2).Strength);
                if ((<DamageBox>obj2).DieOnHit) World.RemoveAttack(<DamageBox>obj2);
                return;
            }
        }

    }
}