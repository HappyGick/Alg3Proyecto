import { ReceptorColor } from "../../../types";
import { LogicReceptor } from "../logicreceptor";
import { Neighborhood } from "../neighborhood";
import { RestrictionChecker } from "./restrictionchecker";

export class MatchChecker extends RestrictionChecker< Neighborhood<number,LogicReceptor<ReceptorColor,number>>, Neighborhood<number, LogicReceptor<ReceptorColor, number>> > {
    tryMatch():boolean{
        let success:boolean = this.check(this.element);
        if(success){this.updateRegion();}
        return success;
    }
    /**
     * Updates all receptors within the region to cleanse themselves
     */
    updateRegion(){
        for(let i=0;i<=5;i++){
            let nextReceptor:LogicReceptor<ReceptorColor,number>|undefined = this.element.get(i);
            if(nextReceptor){nextReceptor.clean();}
        }
    }
}