import { PieceColor, ReceptorColor } from "../types";
import { UIGenericText } from "../ui/generictext";
import { PowerUpBase, SenderType } from "./abstract/base/powerupbase";
import { Box } from "./box";
import { LogicCompositePiece } from "./logic/logiccompositepiece";
import { LogicReceptor } from "./logic/logicreceptor";
import { Neighborhood } from "./logic/neighborhood";
import { HexagonRegion } from "./logic/Restrictions/hexagonregion";
import { TryInsert } from "./logic/Restrictions/insert";
import { InsertChecker } from "./logic/Restrictions/insertchecker";
import { TryMatch } from "./logic/Restrictions/match";
import { MatchChecker } from "./logic/Restrictions/matchchecker";
import { Observer } from "./observer";
import { Score } from "./score";

export class GameSystem {
    private static insertReceptor:LogicReceptor<ReceptorColor,number>|undefined;
    private static regionGenerator:HexagonRegion = new HexagonRegion();
    private static scorer = new Score();
    private static activePowerUp?: PowerUpBase<any>;
    private static powerUpName: Observer<string> = new Observer("");
    
    public static setPowerUp(p: PowerUpBase<any> | undefined) {
        this.activePowerUp = p;
        if (p) this.powerUpName.update(p.name);
        else this.powerUpName.update("None");
    }

    public static usePowerUp(senderType: SenderType, senderObject: Box<any>): boolean {
        if (this.activePowerUp) {
            this.activePowerUp.apply(senderType, senderObject);
            this.setPowerUp(undefined);
            return true;
        }
        return false;
    }

    public static bindPowerUpName(label: UIGenericText) {
        label.bindTextOn("Power up: [val]", this.powerUpName);
    }

    public static bindScore(label: UIGenericText) {
        label.bindTextTo("Score: [val]", this.scorer);
    }

    static setInsertReceptor(receptor:LogicReceptor<ReceptorColor,number>){
        GameSystem.insertReceptor = receptor;
    }
    static deleteInsertReceptor(){
        GameSystem.insertReceptor = undefined;
    }

    static tryInsert(composite:LogicCompositePiece<PieceColor,number>){
        let success: boolean = false;
        if(GameSystem.insertReceptor){
            let hexagon:Neighborhood<number,LogicReceptor<ReceptorColor,number>> = this.regionGenerator.generateRegion(GameSystem.insertReceptor,composite.getHeadPos());
            let insertLogic:InsertChecker = new InsertChecker(hexagon,new TryInsert(GameSystem.insertReceptor.getPiece()));
            success = insertLogic.tryInsert(composite);
            if(success){
                GameSystem.scorer.addScore(10);
                for(let i=0;i<=5;i++){
                    let receptor:LogicReceptor<ReceptorColor,number>|undefined = hexagon.get(i);
                    if(receptor){
                        GameSystem.setInsertReceptor(receptor);
                        GameSystem.tryMatch();
                    }
                }
                //After trying match, is game over?
                let emptySequence:[number,boolean] = GameSystem.insertReceptor.countEmpty(new Set<LogicReceptor<ReceptorColor,number>>());
                if(emptySequence[0] < 6){GameSystem.gameOver();}
            }
            //to-do Not take into consideration repeated hexagons, yet provide chances for all inserted pieces to form hexagons (i.e. erase inserted pieces at last)
        }
        return success;
    }

    static tryMatch(){
        if(GameSystem.insertReceptor){
            let totalMatches:Set<number> = new Set<number>();
            for(let i=0;i<=5;i++){
                let hexagon:Neighborhood<number,LogicReceptor<ReceptorColor,number>> = this.regionGenerator.generateRegion(GameSystem.insertReceptor,i)
                if( (hexagon.getSize() === 6)&&(!totalMatches.has(i-3)) ) {
                    let matchLogic:MatchChecker = new MatchChecker(hexagon,new TryMatch());
                    if(matchLogic.check(hexagon)){
                        totalMatches.add(i);
                    }
                }
            }
            for(var i of totalMatches){
                GameSystem.scorer.addScore(200 + 100*i);
                let hexagon:Neighborhood<number,LogicReceptor<ReceptorColor,number>> = this.regionGenerator.generateRegion(GameSystem.insertReceptor,i)
                let matchLogic:MatchChecker = new MatchChecker(hexagon,new TryMatch());
                matchLogic.updateRegion();
            }
        }
    }

    static gameOver(){
        //Print a game over message over console, just in case
            console.log("Game over!");
        if(GameSystem.insertReceptor){GameSystem.insertReceptor.cleanAll(new Set<LogicReceptor<ReceptorColor,number>>());}
        GameSystem.scorer.reset();
    }
}