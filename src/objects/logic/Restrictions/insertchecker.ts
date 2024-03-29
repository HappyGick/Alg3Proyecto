import { PieceColor, ReceptorColor } from "../../../types";
import { LogicCompositePiece } from "../logiccompositepiece";
import { LogicReceptor } from "../logicreceptor";
import { Neighborhood } from "../neighborhood";
//import { TryInsert } from "./insert"; //to-do Rework condition use. Should use a restriction. Not using it since it was wrongly implemented
import { RestrictionChecker } from "./restrictionchecker";

export class InsertChecker extends RestrictionChecker< Neighborhood<number,LogicReceptor<ReceptorColor,number>>, LogicCompositePiece<PieceColor,number> > {
    check(toCheck: LogicCompositePiece<PieceColor, number>): boolean {
        let isValid:boolean = true;
        for(var i=0; i<=5; i++){
            if (toCheck.includesPiece(i)){ 
                let receptor:LogicReceptor<ReceptorColor,number>|undefined = this.element.get(i);
                if (!receptor){
                    isValid = false;
                    break;
                } else {
                    if(!receptor.isEmpty()){
                        isValid = false;
                        break;
                    }
                }
            }
        }
        return isValid;
    }

    tryInsert(composite: LogicCompositePiece<PieceColor,number>):boolean{
        let success:boolean = this.check(composite);
        if(success){
            let receptor:LogicReceptor<ReceptorColor,number>|undefined;
            for(var i=0;i<=5;i++){
                let newPiece:ReceptorColor|undefined = composite.getNeighbor(i);
                if(newPiece){
                    receptor = this.element.get(i);
                    if(receptor){receptor.placePiece(newPiece);}
                }
            }
        }
        return success;
    }
}