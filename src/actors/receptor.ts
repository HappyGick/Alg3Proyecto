import { Actor, GameEvent, Vector } from "excalibur";
import { CollisionHelper } from "../collisionhelper";
import { MathHelper } from "../mathhelper";
import { Images } from "../resources";
import { ChangeColorEventParams, ReceptorColor, SetColorEventParams } from "../types";

export class AReceptor extends Actor {
  private _currentColor: ReceptorColor = "default";
  private _rotation: number;

  private set currentColor(newColor: ReceptorColor) {
    this._currentColor = newColor;
    this.graphics.show(this._currentColor);
  }

  constructor(position: Vector, rotation: number) {
    super({
      width: MathHelper.triangleSideLength,
      height: MathHelper.triangleHeight,
      collisionGroup: CollisionHelper.collidesWithPieces,
      collider: CollisionHelper.TriangleCollider(),
      anchor: MathHelper.triangleAnchor()
    });
    this._rotation = rotation;
    this.pos = position;
  }

  changeColorEvent(e: GameEvent<ChangeColorEventParams>) {
    if (this._rotation !== e.other!.rotation) return;
    this.currentColor = e.other!.color;
    if (e.other!.color !== 'default') this.graphics.opacity = 0.5;
    else this.graphics.opacity = 1;
  }

  setColorEvent(e: GameEvent<SetColorEventParams>) {
    if (this._rotation !== e.other!.rotation) {
      e.other!.result(false);
      return;
    }
    this.currentColor = e.other!.color;
    this.graphics.opacity = 1;
    e.other!.result(true);
  }

  setupEvents() {
    this.events.on('changecolor', this.changeColorEvent.bind(this));
    this.events.on('setcolor', this.setColorEvent.bind(this));
  }

  addGraphics() {
    this.graphics.add(Images.GrayTriangle.toSprite());
    this.graphics.add("red", Images.RedTriangle.toSprite());
    this.graphics.add("blue", Images.BlueTriangle.toSprite());
    this.graphics.add("green", Images.GreenTriangle.toSprite());
    this.graphics.add("yellow", Images.YellowTriangle.toSprite());
    this.graphics.add("purple", Images.PurpleTriangle.toSprite());
  }

  rotatePiece() {
    this.rotation = this._rotation * Math.PI;
  }

  onInitialize() {
    this.addGraphics();
    this.setupEvents();
    this.rotatePiece();
  }
}
