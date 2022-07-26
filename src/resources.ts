import { ImageSource } from "excalibur";
import triRed from "./res/images/triangle_red.png";
import triBlue from "./res/images/triangle_blue.png";
import triYellow from "./res/images/triangle_yellow.png";
import triPurple from "./res/images/triangle_purple.png";
import triGreen from "./res/images/triangle_green.png";
import triGray from "./res/images/triangle_gray.png";
import btnGeneric from "./res/images/ui/button.png";
import btnSquare from './res/images/ui/squarebutton.png';
import trashIcon from './res/images/ui/trash.png';
import hammerIcon from './res/images/ui/hammer.png';
import houseIcon from './res/images/ui/house.png';
import redoIcon from './res/images/ui/redo.png';

let Images: {[name: string]: ImageSource} = {
  RedTriangle: new ImageSource(triRed),
  BlueTriangle: new ImageSource(triBlue),
  YellowTriangle: new ImageSource(triYellow),
  PurpleTriangle: new ImageSource(triPurple),
  GreenTriangle: new ImageSource(triGreen),
  GrayTriangle: new ImageSource(triGray),
  GenericButton: new ImageSource(btnGeneric),
  SquareButton: new ImageSource(btnSquare),
  HouseIcon: new ImageSource(houseIcon),
  HammerIcon: new ImageSource(hammerIcon),
  RedoIcon: new ImageSource(redoIcon),
  TrashIcon: new ImageSource(trashIcon)
};

export { Images };