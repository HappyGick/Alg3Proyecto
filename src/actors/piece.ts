import { Actor, CollisionEndEvent, CollisionStartEvent, GameEvent, vec, Vector } from "excalibur";
import { PointerEvent } from "excalibur/build/dist/Input/PointerEvent";
import { collidesWithReceptors } from "../collisiongroups";
import { EventHelper } from "../eventhelper";
import { Images } from "../resources";
import { PieceColor, ReceptorColor } from "../types";

export class APiece extends Actor {
  private _currentColor: PieceColor = "red";
  private _originalPos: Vector = vec(500, 150);
  private _collidingWith?: Actor;

  // NO BORRAR
  private set currentColor(newColor: PieceColor) {
    this._currentColor = newColor;
    this.graphics.show(this._currentColor);
  }

  constructor() {
    super({
      pos: vec(500, 150),
      width: 100,
      height: 100,
      collisionGroup: collidesWithReceptors
    });
  }

  dragMoveEvent() {
    // typescript momento, esto es horrible y no me gusta, pero quiero que
    // el código esté bien organizado y funcione
    let obj = this;
    return (e: PointerEvent) => {
      obj.pos = e.coordinates.worldPos;
    }
  }

  dragEndEvent() {
    let obj = this;
    return () => {
      if(obj._collidingWith) {
        obj._collidingWith.events.emit('setcolor', EventHelper.createEvent<ReceptorColor>(obj._currentColor));
        obj.kill();
      } else {
        obj.pos = obj._originalPos;
      }
    }
  }

  collisionStartEvent() {
    let obj = this;
    return (e: CollisionStartEvent<Actor>) => {    
      e.other.events.emit('changecolor', EventHelper.createEvent<ReceptorColor>(obj._currentColor));
      obj._collidingWith = e.other;
    }
  }

  collisionEndEvent() {
    let obj = this;
    return (e: CollisionEndEvent<Actor>) => {
      if (obj.isKilled()) return;
      e.other.events.emit('changecolor', EventHelper.createEvent<ReceptorColor>("default"));
      obj._collidingWith = undefined;
    }
  }

  setupEvents() {
    this.on('pointerdragmove', this.dragMoveEvent());
    this.on('pointerdragend', this.dragEndEvent());
    this.on('collisionstart', this.collisionStartEvent());
    this.on('collisionend', this.collisionEndEvent());
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
    this.graphics.show("red");
    this.setupEvents();
    console.log(this);
  }
}