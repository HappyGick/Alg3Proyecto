export class Score {
    static currentScore:number;
    //! Temporary solution, needs proper Math function
    static addScore(n:number){
        Score.currentScore += n + Score.currentScore*0.1;
    }
}