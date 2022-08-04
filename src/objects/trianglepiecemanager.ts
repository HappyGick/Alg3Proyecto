import { vec, Vector } from "excalibur";
import { APieceHolder } from "../actors/pieceholder";
import { ATrianglePiece } from "../actors/trianglepiece";
import { TemplateManagers } from "../templatemanagers";
import { PartialTemplate, PieceColor, TrianglePieceTemplate } from "../types";
import { TrianglePieceGenerator } from "./generators/trianglepiecegenerator";

export class TrianglePieceManager {
    private pieceGen: TrianglePieceGenerator;
    private pieces: APieceHolder<ATrianglePiece>[] = [];

    constructor(gen: TrianglePieceGenerator) {
        this.pieceGen = gen;
    }

    protected piecePos(pieceId: number): Vector {
        switch (pieceId) {
            case 0:
                return vec(900, 90);
            case 1:
                return vec(900, 250);
            case 2:
                return vec(900, 400);
        }
        return Vector.Zero;
    }

    public generatePieces() {
        for (let i = 0; i < 3; i++) {
            this.pieceGen.resetRandom();
            let piece = this.pieceGen.generate(this.piecePos(i));
            piece.replaceCallback = this.regeneratePieceCallback(i).bind(this);
            piece.rotateCallback = this.rotatePieceCallback(i).bind(this);
            this.pieces.push(piece);
        }
    }

    protected rotatePieceCallback(id: number): (t: PartialTemplate, c: PieceColor) => void {
        return (t: PartialTemplate, c: PieceColor) => {
            this.regeneratePiece(id, TemplateManagers.triangle.rotateTemplate(t), c);
        }
    }

    protected regeneratePieceCallback(id: number): () => void {
        return () => {
            this.regeneratePieceRandom(id);
        }
    }

    protected generatePiece(id: number) {
        this.pieces[id] = this.pieceGen.generate(this.piecePos(id));
        this.pieces[id].replaceCallback = this.regeneratePieceCallback(id).bind(this);
        this.pieces[id].rotateCallback = this.rotatePieceCallback(id).bind(this);
    }

    protected regeneratePieceRandom(id: number) {
        this.pieceGen.resetRandom()
        this.generatePiece(id);
    }

    protected regeneratePiece(id: number, t: TrianglePieceTemplate, c: PieceColor) {
        this.pieceGen.reset(t, c);
        this.generatePiece(id);
    }
}