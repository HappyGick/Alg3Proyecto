import { PartialTemplate } from "../../../types";

export abstract class PieceTemplateManagerBase<T> {
  public templates: T[] = [];
  public abstract initialize(): void;
  public abstract rotateTemplate(template: PartialTemplate): T;
  public abstract importTemplate(template: PartialTemplate): T;
  public abstract rotated(id: number): T;

  public randomTemplate() {
    let t = Math.floor(Math.random() * this.templates.length);
    return this.templates[t];
  }
}