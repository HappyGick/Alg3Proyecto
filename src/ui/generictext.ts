import { Color, Vector, Font, Actor, ActorArgs, Text, vec } from "excalibur";
import { Observer } from "../objects/observer";
import { ITextReactor } from "../types";

export interface TextOptions {
  text?: string;
  color?: Color;
  pos?: Vector;
  font?: Font
}

/**
 * Reimplementación de los labels de Excalibur. Le quité la funcionalidad
 * innecesaria y añadí un método que necesito. Además, su origen de coordenadas
 * está centrado.
 */
export class UIGenericText extends Actor {
  private _font: Font = new Font({ color: Color.Black });
  private _text: Text = new Text({ text: '', font: this._font });

  public get text(): string {
    return this._text.text;
  }

  public set text(text: string) {
    this._text.text = text;
  }

  public get font() {
    return this._font;
  }

  public set font(newFont: Font) {
    this._font = newFont;
    this._text.font = newFont;
  }

  constructor(options: TextOptions & ActorArgs) {
    super(options);
    const {text, pos, font, color} = options;

    this.pos = pos ?? this.pos;
    this.text = text ?? this.text;
    this.font = font ?? this._font;
    this._text.color = color ?? this.color;
    this.graphics.use(this._text);
    this.graphics.anchor = vec(0.5, 0.25);
    console.log(this.graphics.anchor);
  }

  public getTextWidth(): number {
    return this._text.width;
  }

  public getTextHeight(): number {
    return this._text.height;
  }

  public bindTextTo(text: string, reactor: ITextReactor<any>) {
    reactor.watch(((value: any) => { this.text = text.replace(/\[val\]/g, "" + value) }).bind(this));
  }

  public bindTextOn(text: string, observer: Observer<any>) {
    observer.subscribe(((value: any) => { this.text = text.replace(/\[val\]/g, "" + value) }).bind(this));
  }
}