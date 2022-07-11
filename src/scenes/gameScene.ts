import { Scene, vec } from "excalibur";
import { BoardGenerator } from "../objects/generators/boardgenerator";
import { PieceGenerator } from "../objects/generators/piecegenerator";

export class GameScene extends Scene {
    constructor() {
        super();
        let board: BoardGenerator = new BoardGenerator(1);
        board.generate(vec(50, 50), this);
        //let p1: APiece = new APiece('purple', vec(500, 150), 0);
        //this.add(p1);
        let generator: PieceGenerator = new PieceGenerator(
            [
                vec(0, 0), vec(1, 0), vec(2, 0),
                vec(0, 1), vec(1, 1), vec(2, 1)
            ],
            'red'
        );
        generator.generate(vec(800, 150), this);
    }
}