import { ReceptorColor } from "../../../types";
import { LogicReceptor} from "../logicreceptor";
import { Neighborhood } from "../neighborhood";
import { RestrictionRegionGenerator } from "./restrictionchecker";

/**
 * Generates a hexagon-shaped region using receptor collaboration
 */
export class HexagonRegion implements RestrictionRegionGenerator<LogicReceptor<ReceptorColor,number>>{
    //NOTE Hexagon top-row has index [0,1,2] left-to-right, and bottom-row has [3,4,5]
    generateRegion(receptor: LogicReceptor<ReceptorColor, number>, initialPos:number): Neighborhood<number,LogicReceptor<ReceptorColor,number>> {
        let hexagon:Neighborhood<number,LogicReceptor<ReceptorColor,number>> = new Neighborhood<number,LogicReceptor<ReceptorColor,number>>();
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
    private constructHexagon(receptor:LogicReceptor<ReceptorColor,number>):Neighborhood<number,LogicReceptor<ReceptorColor,number>>{
        let verticalNeighbor:LogicReceptor<ReceptorColor,number>|undefined;
        let upperRow:Array<LogicReceptor<ReceptorColor,number>>;
        let lowerRow:Array<LogicReceptor<ReceptorColor,number>> = new Array<LogicReceptor<ReceptorColor,number>>;
        let hexagon:Neighborhood<number,LogicReceptor<ReceptorColor,number>> = new Neighborhood<number,LogicReceptor<ReceptorColor,number>>();

        verticalNeighbor = this.shiftRow(receptor);
        upperRow = this.constructRow(receptor,0,2,false);
        if(!verticalNeighbor){
            if(upperRow[2]){verticalNeighbor = this.shiftRow(upperRow[2]);}
            if(verticalNeighbor){lowerRow = this.constructRow(verticalNeighbor,0,2,true);}
        } else {
            lowerRow = this.constructRow(verticalNeighbor,0,2,false);
        }

        let i:number = 0;
        for(var e of upperRow){
            hexagon.add(i,e);
            i++;
        }
        i=3; //Lower row starts at '3' (upperRow max elements + 1) independently of how long the upper row was
        for(var e of lowerRow){
            hexagon.add(i,e);
            i++;
        }
        return hexagon;
    }
    private shiftRow(receptor: LogicReceptor<ReceptorColor,number>):LogicReceptor<ReceptorColor,number>|undefined{
        return receptor.getNeighbor(0);
    }
    private constructRow(receptor: LogicReceptor<ReceptorColor,number>,currentPos:number,targetPos:number,isInverted:boolean): LogicReceptor<ReceptorColor, number>[] {
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