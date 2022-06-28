import { ImageSource } from "excalibur";
import triRed from "./res/images/triangle_red.png";
import triBlue from "./res/images/triangle_blue.png";
import triYellow from "./res/images/triangle_yellow.png";
import triPurple from "./res/images/triangle_purple.png";
import triGreen from "./res/images/triangle_green.png";
import triGray from "./res/images/triangle_gray.png";

let Images: {[name: string]: ImageSource} = {
  RedTriangle: new ImageSource(triRed),
  BlueTriangle: new ImageSource(triBlue),
  YellowTriangle: new ImageSource(triYellow),
  PurpleTriangle: new ImageSource(triPurple),
  GreenTriangle: new ImageSource(triGreen),
  GrayTriangle: new ImageSource(triGray),
};

export { Images };