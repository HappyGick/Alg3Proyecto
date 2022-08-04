import { PieceColor, ReceptorColor } from "../../../types";
import { LogicCompositePiece } from "../logiccompositepiece";
import { Restriction } from "./restrictionchecker";

export class TryInsert implements Restriction<LogicCompositePiece<PieceColor,number>>{
    validColor:ReceptorColor;
    constructor(validColor:ReceptorColor){
        this.validColor = validColor;
    }
    check(element: LogicCompositePiece<PieceColor,number>): boolean {
        return (element.getPiece() === this.validColor); //to-do Create comparison function?
    }
}