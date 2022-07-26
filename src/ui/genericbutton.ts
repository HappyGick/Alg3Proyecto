import { Graphic, Vector } from "excalibur";
import { PointerEvent } from "excalibur/build/dist/Input/PointerEvent";
import { Images } from "../resources";
import { OnClickFunction } from "../types";
import { UIButton } from "./base/uibutton";

export class UIGenericButton extends UIButton {
    protected _image: Graphic = Images.GenericButton.toSprite();
    protected _onClickEvents: OnClickFunction[] = [];

    constructor(position: Vector, dimensions: Vector, text: string) {
        super(position, dimensions, text);
    }

    registerEvent(f: OnClickFunction) {
        this._onClickEvents.push(f);
    }

    onClick(e: PointerEvent) {
        for(let f of this._onClickEvents) {
            f(e);
        }
    }
}