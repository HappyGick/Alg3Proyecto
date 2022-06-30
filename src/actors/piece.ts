import { Actor, CollisionEndEvent, CollisionStartEvent, Color, Vector } from "excalibur";
import { PointerEvent } from "excalibur/build/dist/Input/PointerEvent";
import { CollisionHelper } from "../collisionhelper";
import { EventHelper } from "../eventhelper";
import { MathHelper } from "../mathhelper";
import { Images } from "../resources";
import { ChangeColorEventParams, PieceColor, SetColorEventParams } from "../types";

export class APiece extends Actor {
  private _currentColor: PieceColor;
  private _originalPos: Vector;
  private _collidingWith?: Actor;
  private _rotation: number;

  constructor(color: PieceColor, startPos: Vector, rotation: number) {
    super({
      width: 60,
      height: 55,
      collisionGroup: CollisionHelper.collidesWithReceptors,
      collider: CollisionHelper.TriangleCollider(),
      anchor: MathHelper.triangleAnchor()
    });
    this._currentColor = color;
    this._originalPos = startPos;
    this._rotation = rotation;
    this.pos = startPos;
    if (color === 'red') this.angularVelocity = 0.1;
  }

  dragMoveEvent(e: PointerEvent) {
    this.pos = e.coordinates.worldPos;
    EventHelper.unregisterFollowMouseEvent();
  }

  receptorCollisionResult(res: boolean) {
    if(res) this.kill()
    else this.pos = this._originalPos;
  }

  dragEndEvent() {
    EventHelper.unregisterFollowMouseEvent();
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

  dragEnterEvent() {
    EventHelper.unregisterFollowMouseEvent();
  }

  dragLeaveEvent() {
    EventHelper.registerFollowMouseEvent(this);
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
  }

  rotatePiece() {
    this.rotation = this._rotation * (Math.PI / 3);
  }

  setupEvents() {
    this.on('pointerdragmove', this.dragMoveEvent.bind(this));
    this.on('pointerdragend', this.dragEndEvent.bind(this));
    this.on('pointerdragleave', this.dragLeaveEvent.bind(this));
    this.on('pointerdragenter', this.dragEnterEvent.bind(this));
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
    console.log(this.anchor);
  }
}