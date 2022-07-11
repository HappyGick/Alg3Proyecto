import { Vector, Scene } from "excalibur";
import { AReceptor } from "../../actors/receptor";
import { HexagonGenerator } from "../abstract/generators/hexagongenerator";

export class BoardGenerator extends HexagonGenerator {
    public generate(at: Vector, scene: Scene): void {
        super.generate(at, scene);
        console.log(this.grid);
        for(let i = 0; i < this._layers * 2; i++) {
            let row = this.grid.getRowVectors(i, at);
            let rotation = i >= this._layers ? 1 : 0;
            for(let cell of row) {
                if (cell){
                    // Aquí harías todo lo de los vecinos y qué sé yo, estas clases son flexibles
                    scene.add(new AReceptor(cell, rotation));
                    rotation = (rotation + 1) % 2;
                }
            }
        }
    }
}