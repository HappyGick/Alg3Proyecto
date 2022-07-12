import { Scene, vec, Vector } from "excalibur";
import { ACompositePieceHolder } from "../../actors/compositepieceholder";
import { APiece } from "../../actors/piece";
import { MathHelper } from "../../mathhelper";
import { PieceColor, PieceTemplate } from "../../types";
import { HexagonGenerator } from "../abstract/generators/hexagongenerator";

export class PieceGenerator extends HexagonGenerator {
    private _template: PieceTemplate;
    private _color: PieceColor;

    constructor(template: PieceTemplate, color: PieceColor) {
        super(1);
        this._template = template;
        this._color = color;
    }

    public reset(template: PieceTemplate, color: PieceColor) {
        this._template = template;
        this._color = color;
    }

    public generate(at: Vector, scene: Scene): void {
        let vectors: Vector[] = this._template.points.map((value) => this.grid.vectorAt(value.x, value.y, at));
        let pieces: APiece[] = [];
        let head: APiece = new APiece('red', Vector.Zero, 0);
        for(let i = 0; i < vectors.length; i++) {
            let piece = new APiece(this._color, vectors[i], this._template.points[i].x % 2 + this._template.points[i].y);
            if (i === this._template.headPiece) head = piece;
            scene.add(piece);
            pieces.push(piece);
        }

        scene.add(new ACompositePieceHolder(vec(at.x + MathHelper.triangleHeight, at.y + 65), pieces, head));
    }
}