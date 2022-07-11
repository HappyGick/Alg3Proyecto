import { MathHelper } from "../../../mathhelper";
import { Generator } from "../base/generator";
import { GridSystem } from "../../gridsystem";

export abstract class HexagonGenerator extends Generator {
    protected grid: GridSystem;
    private _maxCells: number;
    protected _layers: number;
    
    constructor(layers: number) {
        super();
        this._layers = layers;
        this._maxCells = 4 * this._layers - 1;
        this.grid = new GridSystem({
            columns: this._maxCells,
            rows: 2 * this._layers,
            cellWidth: MathHelper.triangleSideLength / 2 + 6,
            cellHeight: MathHelper.triangleHeight + 18,
            cellOrigin: MathHelper.triangleAnchor()
        });
    }

    private generateRow(index: number, secondHalf?: boolean) {
        for (let i = 0; i < this._maxCells; i++) {
            if((i >= index) && (i <= (this._maxCells - (index + 1)))) {
                if (secondHalf) {
                    this.grid.set(i, index + this._layers, true);
                } else {
                    this.grid.set(i, (this._layers - 1) - index, true);
                }
            }
        }
    }

    fillGrid(): void {
        for(let i = this._layers - 1; i >= 0; i--) {
            this.generateRow(i);
        }

        for(let i = 0; i < this._layers; i++) {
            this.generateRow(i, true);
        }
    }
}