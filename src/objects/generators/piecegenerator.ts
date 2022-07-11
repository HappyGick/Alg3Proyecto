import { Scene, vec, Vector } from "excalibur";
import { ACompositePieceHolder } from "../../actors/compositepieceholder";
import { APiece } from "../../actors/piece";
import { MathHelper } from "../../mathhelper";
import { PieceColor } from "../../types";
import { HexagonGenerator } from "../abstract/generators/hexagongenerator";

export class PieceGenerator extends HexagonGenerator {
    private _template: Vector[];
    private _color: PieceColor;

    constructor(template: Vector[], color: PieceColor) {
        super(1);
        this._template = template;
        this._color = color;
    }

    public generate(at: Vector, scene: Scene): void {
        let vectors: Vector[] = this._template.map((value) => this.grid.vectorAt(value.x, value.y, at));
        let pieces: APiece[] = [];
        for(let v in vectors) {
            let piece = new APiece(this._color, vectors[v], this._template[v].x % 2 + this._template[v].y);
            scene.add(piece);
            pieces.push(piece);
        }

        scene.add(new ACompositePieceHolder(vec(at.x + MathHelper.triangleHeight, at.y + 65), pieces));
    }
}