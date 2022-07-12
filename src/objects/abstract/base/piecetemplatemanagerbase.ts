export abstract class PieceTemplateManagerBase<T> {
  public templates: T[] = [];
  public abstract initialize(): void;

  public randomTemplate() {
    let t = Math.floor(Math.random() * this.templates.length);
    return this.templates[t];
  }
}