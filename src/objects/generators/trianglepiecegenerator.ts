import { Scene, vec, Vector } from "excalibur";
import { APieceHolder } from "../../actors/pieceholder";
import { ATrianglePiece } from "../../actors/trianglepiece";
import { MathHelper } from "../../mathhelper";
import { PieceColor, TrianglePieceTemplate } from "../../types";
import { HexagonGenerator } from "../abstract/generators/hexagongenerator";

export class TrianglePieceGenerator extends HexagonGenerator {
    private _template: TrianglePieceTemplate;
    private _color: PieceColor;

    constructor(template: TrianglePieceTemplate, color: PieceColor) {
        super(1);
        this._template = template;
        this._color = color;
    }

    public reset(template: TrianglePieceTemplate, color: PieceColor) {
        this._template = template;
        this._color = color;
    }

    public generate(at: Vector, scene: Scene): void {
        let vectors: Vector[] = this._template.points.map((value) => this.grid.vectorAt(value.x, value.y, at));
        let pieces: ATrianglePiece[] = [];
        let head: ATrianglePiece = new ATrianglePiece('red', Vector.Zero, 0);
        for(let i = 0; i < vectors.length; i++) {
            let piece = new ATrianglePiece(this._color, vectors[i], this._template.points[i].x % 2 + this._template.points[i].y);
            if (i === this._template.headPiece) head = piece;
            scene.add(piece);
            pieces.push(piece);
        }

        scene.add(new APieceHolder<ATrianglePiece>(vec(at.x + MathHelper.triangleHeight, at.y + 65), pieces, head, this._template.originalTemplate, this._color)); //TEST Do APieceHolder now work as intended??? //? Violates Demeter Law
    }
}