export class Score {
    static currentScore:number;
    //! Temporary solution, needs proper Math function
    static addScore(n:number){
        Score.currentScore += n + Score.currentScore*0.1;
        //TEST Every time score is added, send console log
            console.log(Score.currentScore);
    }
}