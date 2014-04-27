// /// LD29
// /// 03/04/2014
// /// By Steven Batchelor-Manning (http://insanedev.co.uk)
// /// and Sin Estelle
// ///////////////////////////
module LD29
{
    export class WalkingNode
    {
        static AltChance : number = 0;
        private NextNode: WalkingNode;
        private Alternative: WalkingNode;
        X: number;
        Y: number;
        constructor(nextNode: WalkingNode, alternative: WalkingNode, x: number, y: number)
        {
            this.X = x;
            this.Y = y;
            this.NextNode = nextNode;
            this.Alternative = alternative;
        }
        GetNextNode()
        {
            WalkingNode.AltChance++;
            if (WalkingNode.AltChance % 2 == 0)
            {
                if (this.Alternative != null)
                {
                    return this.Alternative;
                }
            }
            return this.NextNode;
        }
    }
}