import { Actor, Collider, GameEvent, Vector } from "excalibur";
import { CollisionHelper } from "../../../collisionhelper";
import { ChangeColorEventParams, ElementSpriteList, ReceptorColor, SetColorEventParams } from "../../../types";

type ReceptorOptions = {
  pos: Vector,
  width: number,
  height: number,
  collider?: Collider,
  anchor?: Vector
}

export abstract class AReceptorBase extends Actor {
  protected _currentColor: ReceptorColor = "default";

  protected abstract readonly sprites: ElementSpriteList;

  protected set currentColor(newColor: ReceptorColor) {
    this._currentColor = newColor;
    this.graphics.show(this._currentColor);
  }

  constructor(options: ReceptorOptions) {
    super({
      width: options.width,
      height: options.height,
      collisionGroup: CollisionHelper.collidesWithPieces,
      collider: options.collider,
      anchor: options.anchor
    });
    this.pos = options.pos;
  }

  protected abstract changeColorEvent(e: GameEvent<ChangeColorEventParams>): void;

  protected abstract setColorEvent(e: GameEvent<SetColorEventParams>): void;

  protected setupEvents() {
    // Estos dos son eventos para los receptores, si tu método
    // no permite asegurarle al compilador que el objeto con el que
    // interactúas es un AReceptor, puedes hacer EventHelper.emit<T>(evento, actor, parámetros: T)
    // para activar estos eventos
    this.events.on('changecolor', this.changeColorEvent.bind(this));
    this.events.on('setcolor', this.setColorEvent.bind(this));
  }

  protected addGraphics() {
    for(let c in this.sprites) {
      this.graphics.add(c, this.sprites[c]);
    }
  }

  public onInitialize() {
    this.addGraphics();
    this.setupEvents();
  }
}