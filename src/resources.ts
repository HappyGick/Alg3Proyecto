import { ImageSource } from "excalibur";
import sword from "./res/images/sword.png";

let Images: {[name: string]: ImageSource} = {
  Sword: new ImageSource(sword)
};

export { Images };