import { Scene, vec, Vector } from "excalibur";
import { APiece } from "../actors/piece";
import { MathHelper } from "../mathhelper";
import { PieceColor } from "../types";

export class OCompositePiece {
    private _pieces: (APiece | undefined)[];
    private readonly maxPieces: number = 6;
    private readonly _pieceDistanceFromOrigin: number = MathHelper.triangleHeight;

    constructor(color: PieceColor, pieceIndexes: number[], originPos: Vector) {
        this._pieces = [];
        for(let i = 0; i < this.maxPieces; i++) {
            if(pieceIndexes.includes(i)) {
                this._pieces.push(
                    new APiece(
                        color,
                        this.hexagonPlacementPattern(
                            originPos,
                            this._pieceDistanceFromOrigin,
                            i
                        ),
                        0
                    )
                )
            } else {
                this._pieces.push(undefined);
            }
        }
    }

    hexagonPlacementPattern(origin: Vector, distance: number, n: number): Vector {
        let deg_60 = 60 * MathHelper.Deg2Rad;
        let deg_30 = 30 * MathHelper.Deg2Rad;
        let angle = deg_30 + deg_60 * n;
        return vec(origin.x + (distance * Math.cos(angle)), origin.y - (distance * Math.sin(angle)));
    }

    addToScene(scene: Scene) {
        for (let p of this._pieces) {
            if (p) scene.add(p);
        }
    }
}