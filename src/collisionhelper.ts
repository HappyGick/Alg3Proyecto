import { CollisionGroup, CollisionGroupManager, PolygonCollider, Shape, vec } from "excalibur";
import { MathHelper } from "./mathhelper";

export class CollisionHelper {
    public static readonly pieces = CollisionGroupManager.create('pieces');
    public static readonly receptors = CollisionGroupManager.create('receptors');
    public static readonly collidesWithPieces = CollisionGroup.collidesWith([this.pieces]);
    public static readonly collidesWithReceptors = CollisionGroup.collidesWith([this.receptors]);
    public static readonly collidesWithNone = CollisionGroup.collidesWith([]);

    /**
     * Collider con forma de triángulo equilátero.
     */
    public static TriangleCollider(): PolygonCollider {
        const halfHeight = MathHelper.triangleHeight / 2;
        const sideHalf = MathHelper.triangleSideLength / 2;
        return Shape.Polygon([vec(sideHalf, sideHalf), vec(0, -halfHeight), vec(-sideHalf, sideHalf)]);
    }
}