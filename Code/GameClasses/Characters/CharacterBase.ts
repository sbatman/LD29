module LD29.Characters
{
    export class CharacterBase extends Phaser.Sprite
    {

        MyWorld: World;
        
        facing: string;
        MaxHealth: number;
        Health: number;
        MaxMana: number;
        Mana: number;

        constructor(game: Phaser.Game, x: number, y: number, image: string)
        {
            super(game, x, y, image, 0);

            this.anchor.setTo(0.5, 1);

            this.facing = 'right';
            game.add.existing(this);
    

            this.animations.add('down', [0, 1, 2], 10, true);
            this.animations.add('left', [3, 4, 5], 10, true);
            this.animations.add('right', [6, 7, 8], 10, true);
            this.animations.add('up', [9, 10, 11], 10, true);

            game.physics.enable(this);
            this.body.height = 16;
            this.body.width = 16;
        }

        Hit(strength: number)
        {
            this.Health -= strength;
        }

        SetWorld(world: World)
        {
            this.MyWorld = world;
        }

        update()
        {
        }

        MovementUpdate() { }

    }
} 