import { Actor, Collider, GameEvent, Vector } from "excalibur";
import { CollisionHelper } from "../../../collisionhelper";
import { ChangeColorEventParams, ElementSpriteList, ReceptorColor, SetColorEventParams } from "../../../types";
import { Box } from "../../box";
import { LogicReceptor } from "../../logic/logicreceptor";
import { Neighborhood } from "../../logic/neighborhood";
import { GameSystem } from "../../system";

type ReceptorOptions = {
  pos: Vector,
  width: number,
  height: number,
  collider?: Collider,
  anchor?: Vector
}

export abstract class AReceptorBase extends Actor {
  protected _currentColor: ReceptorColor = "default";
  protected _logicReceptor: LogicReceptor<ReceptorColor,number> = new LogicReceptor<ReceptorColor,number>(this._currentColor,"default");

  protected abstract readonly sprites: ElementSpriteList;

  protected set currentColor(newColor: ReceptorColor) {
    this._currentColor = newColor;
    this.graphics.show(this._currentColor);
  }
  protected changeColor(newColor: ReceptorColor):void {
    this.currentColor = newColor;
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
    this._logicReceptor.addSubscriber(this.changeColor.bind(this));
  }

  protected abstract changeColorEvent(e: GameEvent<ChangeColorEventParams>): void;

  protected abstract setColorEvent(e: GameEvent<SetColorEventParams>): void;

  protected abstract updateSystemReceptorEvent():void;

  protected setupEvents() {
    // Estos dos son eventos para los receptores, si tu método
    // no permite asegurarle al compilador que el objeto con el que
    // interactúas es un AReceptor, puedes hacer EventHelper.emit<T>(evento, actor, parámetros: T)
    // para activar estos eventos
    this.on('pointerdown', this.onClick.bind(this));
    this.events.on('changecolor', this.changeColorEvent.bind(this));
    this.events.on('setcolor', this.setColorEvent.bind(this));
    this.events.on('updatesystemreceptor',this.updateSystemReceptorEvent.bind(this));
  }

  protected onClick() {
    GameSystem.usePowerUp('receptor', new Box(this));
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

  public clean() {
    this._logicReceptor.clean();
  }

  //Neighbor-related
  getLogicReceptor():LogicReceptor<ReceptorColor,number>{
    return this._logicReceptor;
  }
  setNeighbors(n:Neighborhood<number,LogicReceptor<ReceptorColor,number>>){
    this._logicReceptor.setNeighbors(n);
  }
  addNeighbor(index:number,newNeighbor:LogicReceptor<ReceptorColor,number>){
    this._logicReceptor.addNeighbor(index,newNeighbor);
  }
  getNeighbor(index:number):LogicReceptor<ReceptorColor,number>|undefined{
    return this._logicReceptor.getNeighbor(index);
  }
  //Status-related
  isEmpty():boolean{
    return this._logicReceptor.isEmpty(); //to-do Create comparison algorhythm?
  }
}