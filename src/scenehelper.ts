import { Engine, vec, Vector } from "excalibur";

export class SceneHelper {
    private static game: Engine;

    public static initialize(g: Engine) {
        this.game = g;
    }

    public static goToScene(sceneName: string) {
        this.game.goToScene(sceneName);
    }

    public static get screenWidth(): number {
        return this.game.canvasWidth;
    }

    public static get screenHeight(): number {
        return this.game.canvasHeight;
    }

    public static get screenCenter(): Vector {
        return vec(this.screenWidth / 2, this.screenHeight / 2);
    }
}