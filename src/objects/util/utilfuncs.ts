import { PieceColor } from "../../types";

export function randomColor(): PieceColor {
    let colors: PieceColor[] = ['blue', 'green', 'purple', 'red', 'yellow'];
    let t = Math.floor(Math.random() * colors.length);
    return colors[t];
}