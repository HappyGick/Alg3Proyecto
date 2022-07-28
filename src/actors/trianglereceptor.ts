import { GameEvent, Vector } from "excalibur";
import { CollisionHelper } from "../collisionhelper";
import { MathHelper } from "../mathhelper";
import { AReceptorBase } from "../objects/abstract/base/receptorbase";
import { GameSystem } from "../objects/system";
import { Images } from "../resources";
import { ChangeColorEventParams, ElementSpriteList, SetColorEventParams } from "../types";

export class ATriangleReceptor extends AReceptorBase {
  protected readonly sprites: ElementSpriteList = {
    default: Images.GrayTriangle.toSprite(),
    red: Images.RedTriangle.toSprite(),
    green: Images.GreenTriangle.toSprite(),
    blue: Images.BlueTriangle.toSprite(),
    yellow: Images.YellowTriangle.toSprite(),
    purple: Images.PurpleTriangle.toSprite()
  };
  private _rotation: number;

  constructor(position: Vector, rotation: number) {
    super({
      pos: position,
      width: MathHelper.triangleSideLength,
      height: MathHelper.triangleHeight,
      collider: CollisionHelper.TriangleCollider(),
      anchor: MathHelper.triangleAnchor()
    });
    this._rotation = rotation;
  }

  protected changeColorEvent(e: GameEvent<ChangeColorEventParams>) {
    if ( (this._rotation !== e.other!.rotation)||(!this.isEmpty()) )return; //! Se pidio evitar este tipo de instrucciones
    this.currentColor = e.other!.color;
    if (e.other!.color !== 'default') this.graphics.opacity = 0.5;
    else this.graphics.opacity = 1;
  }

  protected setColorEvent(e: GameEvent<SetColorEventParams>) {
    if (this._rotation !== e.other!.rotation) {
      e.other!.result(false);
      return;
    }
    this.currentColor = e.other!.color;
    this.graphics.opacity = 1;
    e.other!.result(true);
  }

  protected updateSystemReceptorEvent(){
    GameSystem.setInsertReceptor(this._logicReceptor);
    //TEST Update system receptor?
      console.log("Graphic Receptor: Game System updated");
  }

  private rotatePiece() {
    this.rotation = this._rotation * Math.PI;
  }

  public onInitialize() {
    super.onInitialize();
    this.rotatePiece();
  }
}
