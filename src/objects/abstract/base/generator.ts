import { Scene, Vector } from "excalibur";
import { GridSystem } from "../../gridsystem";

export abstract class Generator {
    protected abstract grid: GridSystem;
    abstract fillGrid(): void;

    // @ts-ignore unused-property
    public generate(at: Vector, scene: Scene): void {
        this.fillGrid();
    }
}