import { ReceptorColor } from "../../../types";
import { Score } from "../../score";
import { LogicCompositePiece } from "../logiccompositepiece";
import { LogicReceptor } from "../logicreceptor";
import { TryInsert } from "./insert";
import { RestrictionChecker } from "./restrictionchecker";

export class InsertChecker extends RestrictionChecker< Array<LogicReceptor<ReceptorColor,number>>, LogicCompositePiece<ReceptorColor,number> > {
    check(toCheck: LogicCompositePiece<ReceptorColor, number>): boolean {
        let isValid:boolean = true;
        for(var i=0;i<=5;i++){
            if( (!this.element[i].isEmpty())&&(isValid) ){
                this.setRestriction(new TryInsert(this.element[i].getPiece()));
                isValid = super.check(toCheck);
            }
        }
        return isValid;
    }
    tryInsert(composite: LogicCompositePiece<ReceptorColor,number>):boolean{
        let success:boolean = this.check(composite);
        if(success){
            this.element[0].placePiece(composite.getPiece());
            for(var i=0;i<=5;i++){
                let newPiece:ReceptorColor|undefined = composite.getNeighbor(i);
                if(newPiece){
                    this.element[i].placePiece(newPiece);
                }
            }
            //TEST Correct placement gives points?
                Score.addScore(10);
        }
        return success;
    }
}