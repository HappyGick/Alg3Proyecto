import { Vector, Scene } from "excalibur";
import { ATriangleReceptor } from "../../actors/trianglereceptor";
import { HexagonGenerator } from "../abstract/generators/hexagongenerator";

export class TriangleBoardGenerator extends HexagonGenerator {
    public generate(at: Vector, scene: Scene): void {
        super.generate(at, scene);
        for(let i = 0; i < this._layers * 2; i++) {
            let row = this.grid.getRowVectors(i, at);
            let rotation = i >= this._layers ? 1 : 0;
            for(let cell of row) {
                if (cell){
                    // Aquí harías todo lo de los vecinos y qué sé yo, estas clases son flexibles
                    scene.add(new ATriangleReceptor(cell, rotation));
                    rotation = (rotation + 1) % 2;
                }
            }
        }
    }
}