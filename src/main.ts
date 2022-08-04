import { Color, DisplayMode, Engine, Loadable, Loader, Vector } from "excalibur";
import { EventHelper } from "./eventhelper";
import { TemplateManagers } from "./templatemanagers";
import { Images } from "./resources";
import { Scenes } from './scenes';
import { SceneHelper } from "./scenehelper";

class Game extends Engine {

  private loadableRes: Loadable<any>[] = [];
  public mousePos: Vector = Vector.Zero;

  constructor() {
    super({
      displayMode: DisplayMode.FillScreen,
      backgroundColor: new Color(10, 1, 33, 255)
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

  initializeTemplateManagers() {
    for(let m in TemplateManagers) {
      TemplateManagers[m].initialize();
    }
  }

  initialize() {
    
    SceneHelper.initialize(this);
    this.initializeTemplateManagers();
    this.addImages();
    this.addScenes();

    const loader = new Loader(this.loadableRes);
    this.start(loader).then(() => {
      EventHelper.initializePointerReference(this.input.pointers.primary);
      this.goToScene('mainMenu');
    });
    
  }
}

export const game = new Game();
game.initialize();