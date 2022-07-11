import { Scene, Vector } from "excalibur";
import { GridSystem } from "../../gridsystem";

export abstract class Generator {
    protected abstract grid: GridSystem;
    abstract fillGrid(): void;

    public generate(at: Vector, scene: Scene): void {
        this.fillGrid();
    }
}