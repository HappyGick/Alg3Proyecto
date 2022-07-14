type ObserverCallback<T> = (value: T) => void;

export class Observer<T> {
    private data:T;
    private updateCallbacks: ObserverCallback<T>[] = [];

    constructor(value: T) {
        this.data = value;
    }

    public subscribe(callback: ObserverCallback<T>) {
        this.updateCallbacks.push(callback);
    }

    public update(newValue: T) {
        this.data = newValue;
        for(let c of this.updateCallbacks) {
            c(this.data);
        }
    }
}