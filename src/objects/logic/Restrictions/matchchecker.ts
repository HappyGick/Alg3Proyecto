import { ReceptorColor } from "../../../types";
import { Score } from "../../score";
import { LogicReceptor } from "../logicreceptor";
import { RestrictionChecker } from "./restrictionchecker";

export class MatchChecker extends RestrictionChecker< Array<LogicReceptor<ReceptorColor,number>> > {
    /**
     * Updates all receptors within the region to cleanse themselves
     */
    //to-do Subscribe restriction to receptor observer?
    updateCheck(color:ReceptorColor){
        this.restriction.check(this.element);
    }
    updateRegion(){
        for(var e of this.element){
            e.clean();
        }
        Score.addScore(200);//! Temporary solution
    }
}