import { Vector } from "excalibur";
import { CollisionHelper } from "../collisionhelper";
import { MathHelper } from "../mathhelper";
import { APieceBase } from "../objects/abstract/base/piecebase";
import { Images } from "../resources";
import { PieceColor, ElementSpriteList } from "../types";

export class ATrianglePiece extends APieceBase {
  protected sprites: ElementSpriteList = {
    red: Images.RedTriangle.toSprite(),
    green: Images.GreenTriangle.toSprite(),
    blue: Images.BlueTriangle.toSprite(),
    yellow: Images.YellowTriangle.toSprite(),
    purple: Images.PurpleTriangle.toSprite()
  };
  private _rotation: number;

  constructor(color: PieceColor, startPos: Vector, rotation: number) {
    super({
      pos: startPos,
      color,
      width: MathHelper.triangleSideLength,
      height: MathHelper.triangleHeight,
      collider: CollisionHelper.TriangleCollider(),
      anchor: MathHelper.triangleAnchor()
    });
    this._originalPos = startPos;
    this._rotation = rotation;
  }

  rotatePiece() {
    this.rotation = this._rotation * Math.PI;
  }

  setupEvents() {
    // todos los eventos que necesites colócalos aquí
  }

  public onInitialize(): void {
    super.onInitialize();
    this.rotatePiece();
  }
}