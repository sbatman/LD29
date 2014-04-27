///<reference path='CharacterBase.ts'/>
module LD29.Characters
{
    export class Monster extends CharacterBase
    {
        CurrentTarget: Characters.CharacterBase;
        CurrentWalkingNode: WalkingNode;
        CheckForPlayerInterval: number;

        MaxSpeed: number;
        constructor(game: Phaser.Game, x: number, y: number, image: string)
        {
            super(game, x, y, image);

            this.animations.play('down');
            this.animations.paused = true;
            this.MaxSpeed = 85;
            this.CheckForPlayerInterval = 40;
        }



        MovementUpdate()
        {
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
                    var distanceFromNode = Math.abs(this.CurrentWalkingNode.X - this.x) + Math.abs(this.CurrentWalkingNode.Y - this.y);
                    if (distanceFromNode > 100)
                    {
                        this.CurrentWalkingNode = World.GetClosestWalkingNode(this.x, this.y);
                    }
                }
                else if (distance < 50)
                {
                    velX = 0;
                    velY = 0;
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

