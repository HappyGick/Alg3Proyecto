import { DisplayMode, Engine, Loadable, Loader, Vector } from "excalibur";
import { EventHelper } from "./eventhelper";
import { TemplateManager } from "./objects/templatemanager";
import { Images } from "./resources";
import { Scenes } from './scenes';

class Game extends Engine {

  private loadableRes: Loadable<any>[] = [];
  public mousePos: Vector = Vector.Zero;

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
    
    TemplateManager.initialize();
    this.addImages();
    this.addScenes();

    const loader = new Loader(this.loadableRes);
    this.start(loader).then(() => {
      EventHelper.initializePointerReference(this.input.pointers.primary);
      this.goToScene('gameScene');
    });
    
  }
}

export const game = new Game();
game.initialize();