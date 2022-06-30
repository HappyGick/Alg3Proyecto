import { Scene, vec } from "excalibur";
import { APiece } from "../actors/piece";
import { AReceptor } from "../actors/receptor";
import { OCompositePiece } from "../objects/compositepiece";

export class GameScene extends Scene {
    constructor() {
        super();
        let r1: AReceptor = new AReceptor(vec(150, 150), 1);
        this.add(r1);
        let r2: AReceptor = new AReceptor(vec(150, 300), 0);
        this.add(r2);
        let p1: APiece = new APiece('purple', vec(500, 150), 0);
        this.add(p1);
        let piece: OCompositePiece = new OCompositePiece('red', [0, 1, 2, 3, 4, 5], vec(500, 150));
        piece.addToScene(this);
    }
}