import { DisplayMode, Engine, Loadable, Loader } from "excalibur";
import { Images } from "./resources";
import { GameScene } from "./scenes/gameScene";

class Game extends Engine {

  loadableRes: Loadable<any>[] = [];

  constructor() {
    super({
      displayMode: DisplayMode.FillScreen
    });
  }

  addImages() {
    for (let l in Images) {
      this.loadableRes.push(Images[l]);
    }
  }

  initialize() {
    
    this.addImages();

    const gameScene = new GameScene();
    this.add('gameScene', gameScene);

    const loader = new Loader(this.loadableRes);
    this.start(loader).then(() => {
      this.goToScene('gameScene');
    });
  }
}

export const game = new Game();
game.initialize();