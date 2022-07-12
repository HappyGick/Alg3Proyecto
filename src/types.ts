import { Sprite, Vector } from "excalibur";

export type PieceColor = "red" | "green" | "blue" | "purple" | "yellow";
export type PieceRotation = 0 | 1;
export type ReceptorColor = PieceColor | "default";

export type SetColorEventParams = {
    color: ReceptorColor,
    rotation: number,
    result: (res: boolean) => void
};

export type ChangeColorEventParams = {
    color: ReceptorColor,
    rotation: number,
};

export type PartialTemplate = {
    cells: boolean[],
    head: number
}

export type TrianglePieceTemplate = {
    points: Vector[],
    headPiece: number
}

export type ElementSpriteList = {[color: string]: Sprite}