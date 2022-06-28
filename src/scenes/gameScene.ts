import { Scene } from "excalibur";
import { APiece } from "../actors/piece";
import { AReceptor } from "../actors/receptor";

export class GameScene extends Scene {
    constructor() {
        super();
        let player: AReceptor = new AReceptor();
        this.add(player);
        let piece: APiece = new APiece();
        this.add(piece);
    }
}