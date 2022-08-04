import { ITextReactor } from "../types";
import { Observer } from "./observer";

export class Score implements ITextReactor<number> {
    private currentScore: Observer<number>;

    constructor(){
        this.currentScore = new Observer(0);
    }

    public watch(callback: (s: number) => void) {
        this.currentScore.subscribe(callback);
    }

    //! Temporary solution, needs proper Math function
    public addScore(n:number){
        let score = this.currentScore.value;
        score += n;
        this.currentScore.update(score);
    }
}