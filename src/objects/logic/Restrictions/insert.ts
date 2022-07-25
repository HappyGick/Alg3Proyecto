import { ReceptorColor } from "../../../types";
import { LogicCompositePiece } from "../logiccompositepiece";
import { Restriction } from "./restrictionchecker";

export class TryInsert implements Restriction<LogicCompositePiece<ReceptorColor,number>>{
    validColor:ReceptorColor;
    constructor(validColor:ReceptorColor){
        this.validColor = validColor;
    }
    check(element: LogicCompositePiece<ReceptorColor,number>): boolean {
        return (element.getPiece() === this.validColor); //to-do Create comparison function?
    }
}