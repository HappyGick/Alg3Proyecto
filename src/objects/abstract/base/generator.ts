import { Scene, Vector } from "excalibur";
import { GridSystem } from "../../gridsystem";

export abstract class Generator {
    protected abstract grid: GridSystem;
    abstract fillGrid(): void;

    // Devuelve any para que sus subclases cumplan con Liskov.
    // La idea de esta clase es que sea nada más un esqueleto
    // para generar lo que sea que se pueda plantear con un sistema de
    // coordenadas discreto, no sólo tableros.
    // @ts-ignore unused-property
    public generate(at: Vector, scene: Scene): any {
        this.fillGrid();
    }
}