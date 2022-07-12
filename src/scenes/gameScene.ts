import { Engine, Scene, vec } from "excalibur";
import { TriangleBoardGenerator } from "../objects/generators/triangleboardgenerator";
import { TrianglePieceGenerator } from "../objects/generators/trianglepiecegenerator";
import { TemplateManagers } from "../templatemanagers";

export class GameScene extends Scene {
    public onInitialize(_engine: Engine): void {
        let board: TriangleBoardGenerator = new TriangleBoardGenerator(3);
        board.generate(vec(50, 50), this);
        //let p1: APiece = new APiece('purple', vec(500, 150), 0);
        //this.add(p1);
        let generator: TrianglePieceGenerator = new TrianglePieceGenerator(
            TemplateManagers.triangle.templates[8],
            'red'
        );
        generator.generate(vec(800, 150), this);
        generator.reset(TemplateManagers.triangle.templates[3], 'purple');
        generator.generate(vec(950, 150), this);
        generator.reset(TemplateManagers.triangle.templates[4], 'green');
        generator.generate(vec(1100, 150), this);
    }
}