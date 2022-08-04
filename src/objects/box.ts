export class Box<T> {
    private _data: T;

    constructor(data: T) {
        this._data = data;
    }

    public unwrap(): T {
        return this._data;
    }
}