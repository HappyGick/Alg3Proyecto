import { ReceptorColor } from "../../../types";
import { LogicReceptor } from "../logicreceptor";
import { Restriction } from "./restrictionchecker";

export class TryMatch implements Restriction< Array<LogicReceptor<ReceptorColor,number>> >{
    check(element: Array< LogicReceptor<ReceptorColor, number> >): boolean {
        let isMatch = true;
        let matchColor:ReceptorColor = element[0].getPiece();
        for(var e of element){
            if(e.getPiece() != matchColor) {
                isMatch = false;
                break;
            }
        }
        return isMatch;
    }
}