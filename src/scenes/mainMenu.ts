import { Engine, Scene, vec, Vector } from "excalibur";
import { SceneHelper } from "../scenehelper";
import { UIGenericButton } from "../ui/genericbutton";

export class MainMenuScene extends Scene {
    constructor() {
        super();
    }

    onInitialize(_engine: Engine): void {
        let btnSize: Vector = vec(200, 50);
        let playBtn = new UIGenericButton(SceneHelper.screenCenter.sub(vec(0, 50)), btnSize, "Play");
        let creditsBtn = new UIGenericButton(SceneHelper.screenCenter.add(vec(0, 50)), btnSize, "Credits");
        playBtn.registerEvent((e) => {
            SceneHelper.goToScene("game");
        });
        creditsBtn.registerEvent((e) => {
            console.log("WIP");
        });
        this.add(playBtn);
        this.add(creditsBtn);
    }
}