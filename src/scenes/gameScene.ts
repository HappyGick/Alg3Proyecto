import { Engine, Scene, vec } from "excalibur";
import { BoardGenerator } from "../objects/generators/boardgenerator";
import { PieceGenerator } from "../objects/generators/piecegenerator";
import { TemplateManager } from "../objects/templatemanager";

export class GameScene extends Scene {
    public onInitialize(_engine: Engine): void {
        let board: BoardGenerator = new BoardGenerator(3);
        board.generate(vec(50, 50), this);
        //let p1: APiece = new APiece('purple', vec(500, 150), 0);
        //this.add(p1);
        let generator: PieceGenerator = new PieceGenerator(
            TemplateManager.templates[8],
            'red'
        );
        generator.generate(vec(800, 150), this);
        generator.reset(TemplateManager.templates[3], 'purple');
        generator.generate(vec(950, 150), this);
        generator.reset(TemplateManager.templates[4], 'green');
        generator.generate(vec(1100, 150), this);
    }
}