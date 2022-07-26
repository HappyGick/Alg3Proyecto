import { ReceptorColor } from "../../../types";
import { Score } from "../../score";
import { LogicCompositePiece } from "../logiccompositepiece";
import { LogicReceptor } from "../logicreceptor";
import { Neighborhood } from "../neighborhood";
import { TryInsert } from "./insert";
import { RestrictionChecker } from "./restrictionchecker";

export class InsertChecker extends RestrictionChecker< Neighborhood<number,LogicReceptor<ReceptorColor,number>>, LogicCompositePiece<ReceptorColor,number> > {
    check(toCheck: LogicCompositePiece<ReceptorColor, number>): boolean {
        let isValid:boolean = true;
        for(var i=0; i<=5; i++){
            if (toCheck.includesPiece(i)){
                let receptor:LogicReceptor<ReceptorColor,number>|undefined = this.element.get(i);
                if (!receptor){
                    isValid = false;
                    break;
                } else {
                    if( (!receptor.isEmpty())&&(isValid) ){
                        this.setRestriction(new TryInsert(receptor.getPiece()));
                        isValid = super.check(toCheck);
                        if(!isValid){break;}
                    }
                }
            }
        }
        return isValid;
    }

    tryInsert(composite: LogicCompositePiece<ReceptorColor,number>):boolean{
        let success:boolean = this.check(composite);
        if(success){
            let receptor:LogicReceptor<ReceptorColor,number>|undefined = this.element.get(0);
            if(receptor){receptor.placePiece(composite.getPiece());}
            for(var i=0;i<=5;i++){
                let newPiece:ReceptorColor|undefined = composite.getNeighbor(i);
                if(newPiece){
                    receptor = this.element.get(i);
                    if(receptor){receptor.placePiece(newPiece);}
                }
            }
            //TEST Correct placement gives points?
                Score.addScore(10);
        }
        return success;
    }
}