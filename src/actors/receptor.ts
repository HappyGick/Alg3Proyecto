import { Actor, GameEvent, PolygonCollider, vec } from "excalibur";
import { collidesWithPieces } from "../collisiongroups";
import { Images } from "../resources";
import { ReceptorColor } from "../types";

export class AReceptor extends Actor {
  private _currentColor: ReceptorColor = "default";

  private set currentColor(newColor: ReceptorColor) {
    this._currentColor = newColor;
    this.graphics.show(this._currentColor);
  }

  constructor() {
    super({
      pos: vec(150, 150),
      width: 100,
      height: 100,
      collisionGroup: collidesWithPieces
    });
  }

  changeColorEvent() {
    let obj = this;
    return (e: GameEvent<ReceptorColor>) => {
      obj.currentColor = e.other!;
      if (e.other! !== 'default') obj.graphics.opacity = 0.5;
      else obj.graphics.opacity = 1;
    }
  }

  setColorEvent() {
    let obj = this;
    return (e: GameEvent<ReceptorColor>) => {
      obj.currentColor = e.other!;
      obj.graphics.opacity = 1;
    }
  }

  setupEvents() {
    this.events.on('changecolor', this.changeColorEvent());
    this.events.on('setcolor', this.setColorEvent());
  }

  addGraphics() {
    this.graphics.add(Images.GrayTriangle.toSprite());
    this.graphics.add("red", Images.RedTriangle.toSprite());
    this.graphics.add("blue", Images.BlueTriangle.toSprite());
    this.graphics.add("green", Images.GreenTriangle.toSprite());
    this.graphics.add("yellow", Images.YellowTriangle.toSprite());
    this.graphics.add("purple", Images.PurpleTriangle.toSprite());
  }

  onInitialize() {
    this.addGraphics();
    this.setupEvents();
  }
}
