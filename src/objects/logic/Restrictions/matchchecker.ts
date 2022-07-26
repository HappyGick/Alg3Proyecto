import { ReceptorColor } from "../../../types";
import { Score } from "../../score";
import { LogicReceptor } from "../logicreceptor";
import { Neighborhood } from "../neighborhood";
import { RestrictionChecker } from "./restrictionchecker";

export class MatchChecker extends RestrictionChecker< Neighborhood<number,LogicReceptor<ReceptorColor,number>>, ReceptorColor > {
    //to-do Subscribe restriction to receptor observer?
    updateMatch(toCheck: ReceptorColor): void {
        let isMatch = this.check(toCheck);
        if(isMatch){
            this.updateRegion();
        }
    }
    /**
     * Updates all receptors within the region to cleanse themselves
     */
    updateRegion(){
        for(let i=0;i<=5;i++){
            let nextReceptor:LogicReceptor<ReceptorColor,number>|undefined = this.element.get(i);
            if(nextReceptor){nextReceptor.clean();}
        }
        Score.addScore(200);//! Temporary solution
    }
}