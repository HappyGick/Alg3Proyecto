import { Actor, CollisionEndEvent, CollisionStartEvent, Vector } from "excalibur";
import { CollisionHelper } from "../collisionhelper";
import { EventHelper } from "../eventhelper";
import { MathHelper } from "../mathhelper";
import { Images } from "../resources";
import { ChangeColorEventParams, PieceColor, SetColorEventParams } from "../types";
import { ACompositePieceHolder } from "./compositepieceholder";

export class APiece extends Actor {
  private _currentColor: PieceColor;
  private _originalPos: Vector;
  private _collidingWith?: Actor;
  private _rotation: number;
  private _holder?: ACompositePieceHolder;

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

  public isColliding(): boolean {
    return this._collidingWith ? true : false;
  }

  public set holder(h: ACompositePieceHolder) {
    this._holder = h;
  }

  public finishPlacing() {
    if(this._collidingWith) {
      EventHelper.emitEvent<SetColorEventParams>(
        'setcolor',
        this._collidingWith,
        { 
          color: this._currentColor,
          rotation: this._rotation,
          result: this.receptorCollisionResult.bind(this),
        }
      );
    } else {
      this.pos = this._originalPos;
    }
  }

  receptorCollisionResult(res: boolean) {
    if(res) this.kill()
    else this.pos = this._originalPos;
  }

  collisionStartEvent(e: CollisionStartEvent<Actor>) {
    EventHelper.emitEvent<ChangeColorEventParams>(
      'changecolor',
      e.other,
      {
        color: this._currentColor,
        rotation: this._rotation
      }
    );
    this._collidingWith = e.other;
    this._holder?.registerReady();
  }

  collisionEndEvent(e: CollisionEndEvent<Actor>) {
    if (this.isKilled()) return;
    EventHelper.emitEvent<ChangeColorEventParams>(
      'changecolor',
      e.other,
      {
        color: "default",
        rotation: this._rotation
      }
    );
    this._collidingWith = undefined;
    this._holder?.unregisterReady();
  }

  rotatePiece() {
    this.rotation = this._rotation * Math.PI;
  }

  setupEvents() {
    this.on('collisionstart', this.collisionStartEvent.bind(this));
    this.on('collisionend', this.collisionEndEvent.bind(this));
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