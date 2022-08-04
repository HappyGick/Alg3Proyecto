import { ReceptorColor } from "../../../types";
import { LogicReceptor } from "../logicreceptor";
import { Neighborhood } from "../neighborhood";
import { Restriction } from "./restrictionchecker";

export class TryMatch implements Restriction< Neighborhood<number,LogicReceptor<ReceptorColor,number>> >{
    check(element: Neighborhood<number, LogicReceptor<ReceptorColor, number>>): boolean {
        let hexagon:Array<LogicReceptor<ReceptorColor,number>> = new Array<LogicReceptor<ReceptorColor,number>>();
        for(let i=0;i<=5;i++){
            let nextReceptor:LogicReceptor<ReceptorColor,number>|undefined = element.get(i);
            if(nextReceptor){hexagon.push(nextReceptor);}
        }
        let isMatch = true;
        if(hexagon.length < 6){isMatch = false}
        if(isMatch){
            let matchColor:ReceptorColor = hexagon[0].getPiece();
            for(var e of hexagon){
                if( (e.getPiece() != matchColor)||(e.isEmpty()) ) {
                    isMatch = false;
                    break;
                }
            }
        }
        return isMatch;
    }
}