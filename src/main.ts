import { DisplayMode, Engine, Loadable, Loader} from "excalibur";
import { Images} from "./resources";
import { Scenes } from './scenes';

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

  addScenes() {
    for (let s in Scenes) {
      this.add(s, Scenes[s]);
    }
  }

  initialize() {
    
    this.addImages();
    this.addScenes();

    const loader = new Loader(this.loadableRes);
    this.start(loader).then(() => {
      this.goToScene('gameScene');
    });
  }
}

export const game = new Game();
game.initialize();