import { ReceptorColor } from "../../../types";
import { LogicReceptor} from "../logicreceptor";
import { RestrictionRegionGenerator } from "./restrictionchecker";

/**
 * Generates a hexagon-shaped region using receptor collaboration
 */
export class HexagonRegion implements RestrictionRegionGenerator<LogicReceptor<ReceptorColor,number>>{
    //NOTE Hexagon begins at top-left corner with initialPos [0] and increments in clockwise fashion
    generateRegion(receptor: LogicReceptor<ReceptorColor, number>, currentPos: number, targetPos:number): LogicReceptor<ReceptorColor, number>[] {
        let currentRegion:Array<LogicReceptor<ReceptorColor,number>> = new Array<LogicReceptor<ReceptorColor,number>>();
        let nextReceptor:LogicReceptor<ReceptorColor,number>|undefined;
        
        if(currentPos!=targetPos){
            if(currentPos < 2){
                nextReceptor = receptor.getNeighbor(1);
            } else if((currentPos < 5)&&(currentPos>2)){
                nextReceptor = receptor.getNeighbor(-1);
            } else {
                nextReceptor = receptor.getNeighbor(0);
            }

            if(currentPos === 5){
                currentPos = 0;
            } else {
                currentPos++;
            }

            if(nextReceptor){
                currentRegion = this.generateRegion(nextReceptor,currentPos,targetPos);
            }
        }
        currentRegion.push(receptor);

        return currentRegion;
    }
}