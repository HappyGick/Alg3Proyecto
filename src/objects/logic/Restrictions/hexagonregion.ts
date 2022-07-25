import { ReceptorColor } from "../../../types";
import { LogicReceptor} from "../logicreceptor";
import { RestrictionRegionGenerator } from "./restrictionchecker";

/**
 * Generates a hexagon-shaped region using receptor collaboration
 */
export class HexagonRegion implements RestrictionRegionGenerator<LogicReceptor<ReceptorColor,number>>{
    //NOTE Hexagon top-row has index [0,1,2] left-to-right, and bottom-row has [3,4,5]
    generateRegion(receptor: LogicReceptor<ReceptorColor, number>, initialPos:number): LogicReceptor<ReceptorColor, number>[] {
        let hexagon:Array<LogicReceptor<ReceptorColor,number>> = new Array<LogicReceptor<ReceptorColor,number>>;
        if(initialPos!=0){
            let nextReceptor:LogicReceptor<ReceptorColor,number>|undefined 
            if(initialPos != 3){
                nextReceptor = receptor.getNeighbor(-1);
                if(nextReceptor){hexagon = this.generateRegion(nextReceptor,initialPos - 1);}
            } else {
                nextReceptor = receptor.getNeighbor(0);
                if(nextReceptor){hexagon = this.generateRegion(nextReceptor,0);}
            }
        } else {
            hexagon = this.constructHexagon(receptor);
        }
        return hexagon;
    }
    constructHexagon(receptor:LogicReceptor<ReceptorColor,number>):Array<LogicReceptor<ReceptorColor,number>>{
        let verticalNeighbor:LogicReceptor<ReceptorColor,number>|undefined;
        let upperRow:Array<LogicReceptor<ReceptorColor,number>>;
        let lowerRow:Array<LogicReceptor<ReceptorColor,number>> = new Array<LogicReceptor<ReceptorColor,number>>;

        verticalNeighbor = this.shiftRow(receptor);
        upperRow = this.constructRow(receptor,0,2,false);
        if(!verticalNeighbor){
            verticalNeighbor = this.shiftRow(upperRow[2]);
            if(verticalNeighbor){lowerRow = this.constructRow(verticalNeighbor,0,2,true);}
        } else {
            lowerRow = this.constructRow(verticalNeighbor,0,2,true);
        }
        return upperRow.concat(lowerRow);
    }
    shiftRow(receptor: LogicReceptor<ReceptorColor,number>):LogicReceptor<ReceptorColor,number>|undefined{
        return receptor.getNeighbor(0);
    }
    constructRow(receptor: LogicReceptor<ReceptorColor,number>,currentPos:number,targetPos:number,isInverted:boolean): LogicReceptor<ReceptorColor, number>[] {
        let direction:number = 1;
        if(isInverted){direction *= -1}
        let currentRow:Array<LogicReceptor<ReceptorColor,number>> = new Array<LogicReceptor<ReceptorColor,number>>();
        let nextReceptor:LogicReceptor<ReceptorColor,number>|undefined = receptor.getNeighbor(direction);
        let nextPart:Array<LogicReceptor<ReceptorColor,number>> = new Array<LogicReceptor<ReceptorColor,number>>();

        if(currentPos!=targetPos){
            if(nextReceptor){
                nextPart = this.constructRow(nextReceptor,currentPos+1,targetPos,isInverted);
            }
        }
        currentRow.push(receptor);
        if(!isInverted)
        {
            currentRow = currentRow.concat(nextPart);
        } else {
            currentRow = nextPart.concat(currentRow);
        }

        return currentRow;
    }
}