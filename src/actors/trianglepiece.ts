import { Actor, CollisionEndEvent, CollisionStartEvent, Vector } from "excalibur";
import { CollisionHelper } from "../collisionhelper";
import { EventHelper } from "../eventhelper";
import { MathHelper } from "../mathhelper";
import { APieceBase } from "../objects/abstract/base/piecebase";
import { Images } from "../resources";
import { PieceColor, ElementSpriteList, ChangeColorEventParams } from "../types";

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

  protected collisionEnterEvent(e: CollisionStartEvent<Actor>): void {
    if (!this._isHead) return;
    super.collisionEnterEvent(e);
    if(this._collidingWith) {
      // "Desconocemos" a lo que tocamos con este evento, así que toca usar
      // el EventHelper para comunicarnos con el receptor
      // Este evento sólo cambia el color del receptor
      EventHelper.emitEvent<ChangeColorEventParams>(
        'changecolor',
        this._collidingWith,
        {
          color: this._currentColor,
          rotation: this._rotation
        }
      );

      // Pon el resto del código aquí
    }
  }

  protected collisionLeaveEvent(e: CollisionEndEvent<Actor>): void {
    if (!this._isHead) return;
    if(this._collidingWith) {
      // "Desconocemos" a lo que tocamos con este evento, así que toca usar
      // el EventHelper para comunicarnos con el receptor
      // Este evento sólo cambia el color del receptor
      EventHelper.emitEvent<ChangeColorEventParams>(
        'changecolor',
        this._collidingWith,
        {
          color: "default",
          rotation: this._rotation
        }
      );

      // Pon el resto del código aquí
    }
    super.collisionLeaveEvent(e);
  }

  public onInitialize(): void {
    super.onInitialize();
    this.rotatePiece();
  }
}