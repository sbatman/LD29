///<reference path='CharacterBase.ts'/>
module LD29.Characters
{
    export class Monster extends CharacterBase
    {
        CanAttackCounterSkill1: number;
        CurrentTarget: Characters.CharacterBase;
        CurrentWalkingNode: WalkingNode;
        CheckForPlayerInterval: number;
        MaxSpeed: number;
        Type: string;
        PrimaryAttackType: number;
        PreferedPoximity: number;

        constructor(game: Phaser.Game, x: number, y: number, type: string)
        {
            super(game, x, y, 'content-graphics-monsters-' + type);

            this.animations.play('down');
            this.animations.paused = true;


             
            this.CheckForPlayerInterval = 40;
            this.Type = type;
            this.CanAttackCounterSkill1 = 0;
            switch (type)
            {
                case "green_zombie":
                    this.PrimaryAttackType = 2;
                    this.PreferedPoximity = 60;
                    this.MaxHealth = 5 + (GameState.WaveCount*0.5);
                    this.MaxSpeed = 70 + game.rnd.realInRange(0, 28);
                    break;
                case "skeleton":
                    this.PrimaryAttackType = 0;
                    this.PreferedPoximity = 80;
                    this.MaxHealth = 4 + (GameState.WaveCount * 0.5);
                    this.MaxSpeed = 80 + game.rnd.realInRange(0, 18);
                    break;
                case "undeadking":
                    this.PrimaryAttackType = 3;
                    this.PreferedPoximity = 200;
                    this.MaxHealth = 9 + (GameState.WaveCount * 0.5);
                    this.MaxSpeed = 40 + game.rnd.realInRange(0, 18);
                    break;
            }
            this.Health = this.MaxHealth;
        }



        MovementUpdate()
        {
            if (this.CanAttackCounterSkill1 > 0) this.CanAttackCounterSkill1--;
            this.CheckForPlayerInterval--;
            if (this.CheckForPlayerInterval <= 0)
            {
                this.CheckForPlayerInterval = 40;
                var distancetoChar = Math.abs(GameState.GameCharacter.x - this.x) + Math.abs(GameState.GameCharacter.y - this.y);
                if (distancetoChar < 300)
                {
                    this.CurrentTarget = GameState.GameCharacter;
                }
            }
            var velX = 0;
            var velY = 0;
            if (this.CurrentTarget != null)
            {
                velX = this.CurrentTarget.x - this.x;
                velY = this.CurrentTarget.y - this.y;
                var distance = Math.abs(velX) + Math.abs(velY);

                if (distance > 300)
                {
                    this.CurrentTarget = null;
                    if (this.CurrentWalkingNode == null)
                    {
                        this.CurrentWalkingNode = World.GetClosestWalkingNode(this.x, this.y);
                    } else
                    {
                        var distanceFromNode = Math.abs(this.CurrentWalkingNode.X - this.x) + Math.abs(this.CurrentWalkingNode.Y - this.y);
                        if (distanceFromNode > 100)
                        {
                            this.CurrentWalkingNode = World.GetClosestWalkingNode(this.x, this.y);
                        }
                    }

                }
                else if (distance < this.PreferedPoximity)
                {
                    velX = 0;
                    velY = 0;
                    if (this.CanAttackCounterSkill1 == 0)
                    {
                        for (var count = 0; count < (this.PrimaryAttackType==3?5:1); count++)
                        {
                            var attack = null;
                            this.CanAttackCounterSkill1 = 100;
                            switch (this.facing)
                            {
                                case 'left':
                                    attack = new DamageBox(this.game, this.body.x + 8 + 5, this.body.y + 8, -1, 0, this, this.PrimaryAttackType, 1.0 + (0.1 * GameState.WaveCount), 2);
                                    break;
                                case 'right':
                                    attack = new DamageBox(this.game, this.body.x + 8 - 5, this.body.y + 8, 1, 0, this, this.PrimaryAttackType, 1.0 + (0.1 * GameState.WaveCount), 2);
                                    break;
                                case 'up':
                                    attack = new DamageBox(this.game, this.body.x + 8, this.body.y + 8 + 5, 0, -1, this, this.PrimaryAttackType, 1.0 + (0.1 * GameState.WaveCount), 2);
                                    break;
                                case 'down':
                                    attack = new DamageBox(this.game, this.body.x + 8, this.body.y + 8 - 5, 0, 1, this, this.PrimaryAttackType, 1.0 + (0.1 * GameState.WaveCount), 2);
                                    break;

                            }

                            if (this.PrimaryAttackType == 3)
                            {
                                attack.setTarget(this.CurrentTarget);
                            }
                            World.AddAttack(attack);
                        }
                    }
                }
            }
            else if (this.CurrentWalkingNode != null)
            {
                velX = this.CurrentWalkingNode.X - this.x;
                velY = this.CurrentWalkingNode.Y - this.y;
                var distancefromNode = Math.abs(velX) + Math.abs(velY);
                if (distancefromNode < 10)
                {
                    this.CurrentWalkingNode = this.CurrentWalkingNode.GetNextNode();
                }
            }
            if (velX != 0 || velY != 0)
            {
                this.body.velocity.y = velY;
                this.body.velocity.x = velX;
                this.body.velocity.normalize();
                this.body.velocity.x *= this.MaxSpeed;
                this.body.velocity.y *= this.MaxSpeed;
            } else
            {
                this.body.velocity.y = 0;
                this.body.velocity.x = 0;
            }

            var UpDown = Math.abs(this.body.velocity.x) < Math.abs(this.body.velocity.y);

            if (!UpDown)
            {
                if (this.body.velocity.x < 0)
                {
                    this.animations.play('left');
                    this.facing = 'left';
                    if (this.animations.paused)
                    {
                        this.animations.paused = false;
                    }
                }
                else if (this.body.velocity.x > 0)
                {
                    this.animations.play('right');
                    this.facing = 'right';
                    if (this.animations.paused)
                    {
                        this.animations.paused = false;
                    }
                }

            } else
            {
                if (this.body.velocity.y < 0)
                {
                    if (this.facing != 'up')
                    {
                        this.animations.play('up');
                        this.facing = 'up';
                    }
                    else if (this.animations.paused)
                    {
                        this.animations.paused = false;
                    }
                }
                else if (this.body.velocity.y > 0)
                {
                    if (this.facing != 'down')
                    {
                        this.animations.play('down');
                        this.facing = 'down';
                    }
                    else if (this.animations.paused)
                    {
                        this.animations.paused = false;
                    }
                }
            }

        }
        SetWalkingNode(node: WalkingNode)
        {
            this.CurrentWalkingNode = node;
        }

        SetTarget(target: Characters.CharacterBase)
        {
            this.CurrentTarget = target;
        }
    }
}

