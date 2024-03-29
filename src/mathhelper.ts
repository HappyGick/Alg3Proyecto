import { vec, Vector } from "excalibur";

export class MathHelper {
    public static readonly PI = Math.PI;
    public static readonly Deg2Rad = this.PI / 180;
    public static readonly Rad2Deg = 180 / this.PI;
    public static readonly rootThree = 1.73205080757;
    public static readonly rootSeven = 2.64575131106;
    public static readonly triangleSideLength = 60;
    public static readonly triangleHeight = (this.triangleSideLength * this.rootThree) / 2;

    public static triangleAnchor(): Vector {
        return vec(0.5, 1 - (this.rootThree / 3));
    }
}