import { APieceHolder } from "../actors/pieceholder";
import { PowerUpBase, SenderType } from "./abstract/base/powerupbase";

export class TrashPowerUp extends PowerUpBase<APieceHolder<any>> {
    protected readonly _name: string = "Trash";
    protected readonly _acceptedType: SenderType = 'piece';
    protected action(object: APieceHolder<any>): void {
        object.replace();
    }
}