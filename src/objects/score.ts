export class Score {
    currentScore:number;
    constructor(){
        this.currentScore = 0;
    }
    //! Temporary solution, needs proper Math function
    addScore(n:number){
        this.currentScore += n + Math.floor(this.currentScore*0.1);
        //TEST Every time score is added, send console log
            console.log(this.currentScore);
    }
}