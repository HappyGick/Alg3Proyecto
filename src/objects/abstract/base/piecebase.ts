import { Actor, Collider, CollisionEndEvent, CollisionStartEvent, Vector } from "excalibur";
import { APieceHolder } from "../../../actors/pieceholder";
import { CollisionHelper } from "../../../collisionhelper";
import { PieceColor, ElementSpriteList } from "../../../types";

type PieceOptions = {
  width: number,
  height: number,
  collider?: Collider,
  anchor?: Vector,
  color: PieceColor,
  pos: Vector
}

export abstract class APieceBase extends Actor {
  protected _currentColor: PieceColor;
  protected _originalPos: Vector;
  protected _holder?: APieceHolder<this>; // importante para la colaboración
  protected _isHead: boolean = false;
  protected _collidingWith?: Actor;
  
  protected abstract readonly sprites: ElementSpriteList;

  constructor(options: PieceOptions) {
    super({
      width: options.width,
      height: options.height,
      collisionGroup: CollisionHelper.collidesWithReceptors,
      collider: options.collider,
      anchor: options.anchor
    });
    this._currentColor = options.color;
    this._originalPos = options.pos;
    this.pos = options.pos;
  }

  private addGraphics() {
    for(let c in this.sprites) {
      this.graphics.add(c, this.sprites[c]);
    }
  }

  protected collisionEnterEvent(e: CollisionStartEvent<Actor>) {
    if (!this._collidingWith) this._collidingWith = e.other;
  }
  protected collisionLeaveEvent(e: CollisionEndEvent<Actor>) {
    this._collidingWith = undefined;
  }

  protected setupEvents() {
    this.on('collisionend', this.collisionLeaveEvent.bind(this));
    this.on('collisionstart', this.collisionEnterEvent.bind(this))
  }

  public resetPosition() {
    this.pos = this._originalPos;
  }

  public toggleHead() {
    this._isHead = !this._isHead;
  }

  public set holder(h: APieceHolder<this>) {
    this._holder = h;
  }

  public onInitialize() {
    this.addGraphics();
    this.graphics.show(this._currentColor);
    this.setupEvents();
  }
}