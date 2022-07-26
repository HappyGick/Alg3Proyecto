import { Graphic, GraphicsGroup, vec, Vector } from "excalibur";
import { Images } from "../resources";
import { UIGenericButton } from "./genericbutton";

export class UIIconButton extends UIGenericButton {
    constructor(position: Vector, size: number, icon: Graphic) {
        super(position, vec(size, size), '');
        let backgroundImage = Images.SquareButton.toSprite();
        backgroundImage.scale = vec(icon.width / backgroundImage.width, icon.height / backgroundImage.height);
        this._image = new GraphicsGroup({members: [{graphic: backgroundImage, pos: Vector.Zero}, {graphic: icon, pos: Vector.Zero}]});
    }
}