import { Scene, vec, Vector } from "excalibur";
import { APieceHolder } from "../../actors/pieceholder";
import { ATrianglePiece } from "../../actors/trianglepiece";
import { MathHelper } from "../../mathhelper";
import { TemplateManagers } from "../../templatemanagers";
import { PieceColor, TrianglePieceTemplate } from "../../types";
import { HexagonGenerator } from "../abstract/generators/hexagongenerator";
import { randomColor } from "../util/utilfuncs";

export class TrianglePieceGenerator extends HexagonGenerator {
    private _template: TrianglePieceTemplate;
    private _color: PieceColor;
    private _scene: Scene;

    constructor(template: TrianglePieceTemplate, color: PieceColor, scene: Scene) {
        super(1);
        this._template = template;
        this._color = color;
        this._scene = scene;
    }

    public reset(template: TrianglePieceTemplate, color: PieceColor) {
        this._template = template;
        this._color = color;
    }

    public resetRandom() {
        this._template = TemplateManagers.triangle.randomTemplate();
        this._color = randomColor();
    }

    public generate(at: Vector): APieceHolder<ATrianglePiece> {
        let vectors: Vector[] = this._template.points.map((value) => this.grid.vectorAt(value.x, value.y, at));
        let pieces: ATrianglePiece[] = [];
        let head: ATrianglePiece = new ATrianglePiece('red', Vector.Zero, 0);
        for(let i = 0; i < vectors.length; i++) {
            let piece = new ATrianglePiece(this._color, vectors[i], this._template.points[i].x % 2 + this._template.points[i].y);
            if (i === this._template.headPiece) head = piece;
            this._scene.add(piece);
            pieces.push(piece);
        }

        let p = new APieceHolder<ATrianglePiece>(vec(at.x + MathHelper.triangleHeight, at.y + 65), pieces, head, this._template.originalTemplate, this._color);
        this._scene.add(p);
        return p;
    }
}