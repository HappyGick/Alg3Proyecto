import { ReceptorColor } from "../../../types";
import { Score } from "../../score";
import { LogicReceptor } from "../logicreceptor";
import { RestrictionChecker } from "./restrictionchecker";

export class MatchChecker extends RestrictionChecker< Array<LogicReceptor<ReceptorColor,number>>, ReceptorColor > {
    //to-do Subscribe restriction to receptor observer?
    check(toCheck: ReceptorColor): boolean {
        let isMatch = super.check(toCheck);
        if(isMatch){
            this.updateRegion();
        }
        return isMatch;
    }
    /**
     * Updates all receptors within the region to cleanse themselves
     */
    updateRegion(){
        for(var e of this.element){
            e.clean();
        }
        Score.addScore(200);//! Temporary solution
    }
}