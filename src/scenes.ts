import { Scene } from "excalibur";
import { GameScene } from "./scenes/gameScene";
import { MainMenuScene } from "./scenes/mainMenu";

let Scenes: {[name: string]: Scene} = {
    game: new GameScene(),
    mainMenu: new MainMenuScene()
};

export { Scenes };