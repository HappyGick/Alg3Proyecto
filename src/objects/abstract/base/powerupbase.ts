import { Box } from "../../box";

export type SenderType = 'receptor' | 'piece';

export abstract class PowerUpBase<T> {
    protected abstract readonly _name: string;
    protected abstract readonly _acceptedType: SenderType;
    
    protected abstract action(object: T): void;
    
    public get name(): string {
        return this._name;
    }

    public apply(senderType: SenderType, senderObject: Box<any>): void {
        if (senderType !== this._acceptedType) return;
        this.action(senderObject.unwrap());
    }
}