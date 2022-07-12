import { Actor, Vector } from "excalibur";
import { CollisionHelper } from "../collisionhelper";
import { MathHelper } from "../mathhelper";
import { Images } from "../resources";
import { PieceColor } from "../types";
import { ACompositePieceHolder } from "./compositepieceholder";

export class APiece extends Actor {
  private _currentColor: PieceColor;
  private _originalPos: Vector;
  private _rotation: number;
  private _holder?: ACompositePieceHolder; // importante para la colaboración

  constructor(color: PieceColor, startPos: Vector, rotation: number) {
    super({
      width: MathHelper.triangleSideLength,
      height: MathHelper.triangleHeight,
      collisionGroup: CollisionHelper.collidesWithReceptors,
      collider: CollisionHelper.TriangleCollider(),
      anchor: MathHelper.triangleAnchor()
    });
    this._currentColor = color;
    this._originalPos = startPos;
    this._rotation = rotation;
    this.pos = startPos;
  }

  public resetPosition() {
    this.pos = this._originalPos;
  }

  public set holder(h: ACompositePieceHolder) {
    this._holder = h;
  }

  rotatePiece() {
    this.rotation = this._rotation * Math.PI;
  }

  setupEvents() {
    // todos los eventos que necesites colócalos aquí
  }

  addGraphics() {
    this.graphics.add("red", Images.RedTriangle.toSprite());
    this.graphics.add("blue", Images.BlueTriangle.toSprite());
    this.graphics.add("green", Images.GreenTriangle.toSprite());
    this.graphics.add("yellow", Images.YellowTriangle.toSprite());
    this.graphics.add("purple", Images.PurpleTriangle.toSprite());
  }

  onInitialize() {
    this.addGraphics();
    this.graphics.show(this._currentColor);
    this.setupEvents();
    this.rotatePiece();
  }
}