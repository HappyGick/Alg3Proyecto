import { vec, Vector } from "excalibur";

export class GridSystem {
    private _columns: number;
    private _rows: number;
    private _cellWidth: number;
    private _cellHeight: number;
    private _cellOrigin: Vector;
    private cells: boolean[][];

    constructor(params: {columns: number, rows: number, cellWidth: number, cellHeight?: number, cellOrigin?: Vector}) {
        let {columns, rows, cellWidth, cellHeight, cellOrigin} = params;

        this._columns = columns;
        this._rows = rows;
        this._cellWidth = cellWidth;
        this._cellHeight = cellHeight ? cellHeight : cellWidth;
        this._cellOrigin = cellOrigin ? cellOrigin : vec(0.5, 0.5);
        
        this.cells = [];
        for(let i = 0; i < this._columns; i++) {
            this.cells.push([])
            for(let j = 0; j < this._rows; j++) {
                this.cells[i].push(false);
            }
        }
    }

    public at(x: number, y: number) {
        return this.cells[x][y];
    }

    public set(x: number, y: number, value: boolean) {
        this.cells[x][y] = value;
    }

    public fill(from: Vector, to: Vector) {
        for(let i = from.x; i <= to.x; i++) {
            for(let j = from.y; j <= to.y; j++) {
                this.cells[i][j] = true;
            }
        }
    }

    public invert(from: Vector, to: Vector) {
        for(let i = from.x; i <= to.x; i++) {
            for(let j = from.y; j <= to.y; j++) {
                this.cells[i][j] = !this.cells[i][j];
            }
        }
    }

    public toFillVectorArray(systemOrigin: Vector): Vector[] {
        let vectors: Vector[] = [];

        for(let i = 0; i < this._columns; i++) {
            for(let j = 0; j < this._rows; j++) {
                if(this.cells[i][j]) {
                    vectors.push(this.vectorAt(j, i, systemOrigin));
                }
            }
        }

        return vectors;
    }

    public getRowVectors(row: number, origin: Vector): Vector[] {
        let vectors: Vector[] = [];

        for(let i = 0; i < this._columns; i++) {
            if (this.cells[i][row]) vectors.push(this.vectorAt(i, row, origin));
        }

        return vectors;
    }

    public getColumnVectors(column: number, origin: Vector): Vector[] {
        return this.cells[column]
                    .filter((value) => value)
                    .map((value, index) => this.vectorAt(column, index, origin));
    }

    public vectorAt(x: number, y: number, origin: Vector) {
        return vec(
            origin.x + x * (this._cellWidth) + (this._cellWidth) * this._cellOrigin.x,
            origin.y + y * (this._cellHeight) + (this._cellHeight) * this._cellOrigin.y
        );
    }
}