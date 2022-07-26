import { Color, Font, Scene, vec } from "excalibur";
import { OnClickFunction } from "../../types";
import { UIGenericButton } from "../../ui/genericbutton";
import { UIGenericText } from "../../ui/generictext";

export class UIBuilder {
    private _scene: Scene;

    constructor(scene: Scene) {
        this._scene = scene;
    }

    placeButton(btn: UIGenericButton, event?: OnClickFunction) {
        if (event) btn.registerEvent(event);
        this._scene.add(btn);
    }

    placeLabel(text: string, x: number, y: number, size?: number, color?: Color): UIGenericText {
        let label = new UIGenericText({text, pos: vec(x, y), font: new Font({size, color})});
        this._scene.add(label);
        return label;
    }
}