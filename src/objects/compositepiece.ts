import { Scene, vec, Vector } from "excalibur";
import { ACompositePieceHolder } from "../actors/compositepieceholder";
import { APiece } from "../actors/piece";
import { MathHelper } from "../mathhelper";
import { PieceColor } from "../types";

export class OCompositePiece {
    private _pieces: (APiece | undefined)[];
    private _origin: Vector;
    private readonly maxPieces: number = 6;
    private readonly _pieceDistanceFromOrigin: number = 45;

    constructor(color: PieceColor, pieceIndexes: number[], originPos: Vector) {
        this._pieces = [];
        this._origin = originPos;
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
                        i % 2
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
        let activePieces: APiece[] = [];
        for (let p of this._pieces) {
            if (p) {
                activePieces.push(p);
                scene.add(p);
            }
        }
        let holder: ACompositePieceHolder = new ACompositePieceHolder(this._origin, activePieces);
        scene.add(holder);
    }
}