import { Scene } from "excalibur";
import { GameScene } from "./scenes/gameScene";

let Scenes: {[name: string]: Scene} = {
    gameScene: new GameScene()
};

export { Scenes };