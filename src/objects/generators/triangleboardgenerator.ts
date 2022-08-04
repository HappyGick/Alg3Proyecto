import { Vector, Scene } from "excalibur";
import { ATriangleReceptor } from "../../actors/trianglereceptor";
import { HexagonGenerator } from "../abstract/generators/hexagongenerator";

export class TriangleBoardGenerator extends HexagonGenerator {
    public generate(at: Vector, scene: Scene): void {
        super.generate(at, scene);
        let hasDownNeighbor;
        let previousRow:Array<ATriangleReceptor>;
        let previousReceptor:ATriangleReceptor;
        let currentRow:Array<ATriangleReceptor>;
        let currentReceptor:ATriangleReceptor;
        
        currentRow = new Array<ATriangleReceptor>();
        for(let i = 0; i < this._layers * 2; i++) {
            let j=0;
            let isFirst = true;
            previousRow = currentRow;
            currentRow = new Array<ATriangleReceptor>();
            if(i<this._layers){
                hasDownNeighbor = true;
            } else {
                hasDownNeighbor = false;
            }
            let row = this.grid.getRowVectors(i, at);
            let rotation = i >= this._layers ? 1 : 0;
            for(let cell of row) {
                if (cell){
                    currentReceptor = new ATriangleReceptor(cell, rotation);
                    scene.add(currentReceptor);
                    rotation = (rotation + 1) % 2;

                    if(!isFirst){
                        currentReceptor.addNeighbor(-1,previousReceptor.getLogicReceptor());
                        previousReceptor.addNeighbor(1,currentReceptor.getLogicReceptor());
                    }

                    if(hasDownNeighbor){
                        currentRow.push(currentReceptor);
                    } else if (i!=0){
                        currentReceptor.addNeighbor(0,previousRow[j].getLogicReceptor());
                        previousRow[j].addNeighbor(0,currentReceptor.getLogicReceptor());
                        j++;
                    }
                    hasDownNeighbor = !hasDownNeighbor;
                    previousReceptor = currentReceptor;
                    isFirst = false;
                }
            }
        }
    }
}