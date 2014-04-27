///<reference path='CharacterBase.ts'/>
module LD29.Characters
{
    export class Player extends CharacterBase
    {
        CanAttackCounterSkill1: number;
        CanAttackCounterSkill2: number;

        constructor(game: Phaser.Game, x: number, y: number, image: string)
        {
            super(game, x, y, image);
            this.MaxHealth = 100;
            this.Health = this.MaxHealth;
            game.camera.follow(this);
            this.CanAttackCounterSkill1 = 0;
            this.CanAttackCounterSkill2 = 0;
        }

        update()
        {
            GameState.GameHud.CurrentHP = (this.Health / this.MaxHealth) * 10;
            if (this.CanAttackCounterSkill1 > 0) this.CanAttackCounterSkill1--;
            if (this.CanAttackCounterSkill2 > 0) this.CanAttackCounterSkill2--;
            
        }

        MovementUpdate()
        {

            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            {
                this.body.velocity.x = -100;
                this.animations.play('left');
                this.facing = 'left';
                if (this.animations.paused)
                {
                    this.animations.paused = false;
                }
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
            {
                this.body.velocity.x = 100;
                this.animations.play('right');
                this.facing = 'right';
                if (this.animations.paused)
                {
                    this.animations.paused = false;
                }
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
            {
                this.body.velocity.y = -100;
                if (this.facing != 'up')
                {
                    this.animations.play('up');
                    this.facing = 'up';
                }
                else if (this.animations.paused)
                {
                    this.animations.paused = false;
                }
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
            {
                this.body.velocity.y = 100;
                if (this.facing != 'down')
                {
                    this.animations.play('down');
                    this.facing = 'down';
                }
                else if (this.animations.paused)
                {
                    this.animations.paused = false;
                }
            } else
            {
                this.animations.paused = true;
            }
            
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.ONE) && this.CanAttackCounterSkill1 == 0)
            {
                this.CanAttackCounterSkill1 = 40;
                switch (this.facing)
                {
                    case 'left':
                        World.AddAttack(new DamageBox(this.game, this.body.x + 8 + 5, this.body.y + 8, -1, 0,this,0));
                        break;
                    case 'right':
                        World.AddAttack(new DamageBox(this.game, this.body.x + 8 - 5, this.body.y + 8, 1, 0, this, 0));
                        break;
                    case 'up':
                        World.AddAttack(new DamageBox(this.game, this.body.x + 8, this.body.y + 8+ 5, 0, -1, this, 0));
                        break;
                    case 'down':
                        World.AddAttack(new DamageBox(this.game, this.body.x + 8, this.body.y + 8 - 5, 0, 1, this, 0));
                        break;

                }
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.TWO) && this.CanAttackCounterSkill2 == 0)
            {
                this.CanAttackCounterSkill2 = 400;
                switch (this.facing)
                {
                    case 'left':
                        World.AddAttack(new DamageBox(this.game, this.body.x + 8 + 5, this.body.y + 8, -1, 0, this, 2));
                        break;
                    case 'right':
                        World.AddAttack(new DamageBox(this.game, this.body.x + 8 - 5, this.body.y + 8, 1, 0, this, 2));
                        break;
                    case 'up':
                        World.AddAttack(new DamageBox(this.game, this.body.x + 8, this.body.y + 8 + 5, 0, -1, this, 2));
                        break;
                    case 'down':
                        World.AddAttack(new DamageBox(this.game, this.body.x + 8, this.body.y + 8 - 5, 0, 1, this, 2));
                        break;

                }
            }
        }

    }


} 