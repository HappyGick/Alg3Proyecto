import { Actor, Vector, Color, Font, vec, Graphic } from "excalibur";
import { PointerEvent } from "excalibur/build/dist/Input/PointerEvent";
import { CollisionHelper } from "../../collisionhelper";
import { UIGenericText } from "../generictext";

export abstract class UIButton extends Actor {
    private _label: UIGenericText;
    protected _dimensions: Vector;
    protected abstract _image: Graphic;

    abstract onClick(e: PointerEvent): void;

    constructor(position: Vector, dimensions: Vector, text: string) {
        super({
            pos: position,
            width: dimensions.x,
            height: dimensions.y,
            collisionGroup: CollisionHelper.collidesWithNone,
            z: 1
        });

        this._dimensions = dimensions;
        this._label = new UIGenericText(
            {
                text: '\n' + text + '\n',
                z: 2,
                font: new Font({size: 30, color: Color.White}),
                anchor: vec(0.5, 0.5)
            }
        );
        this.addChild(this._label);
    }

    setupGraphics(): void {
        this._image.scale = vec(this._dimensions.x / this._image.width, this._dimensions.y / this._image.height);
        this.graphics.show(this._image);
    }

    setupEvents(): void {
        this.on('pointerdown', this.onClick.bind(this));
    }

    onInitialize(): void {
        this.setupEvents();
        this.setupGraphics();
    }
}