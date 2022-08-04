import { PowerUpBase, SenderType } from "./abstract/base/powerupbase";
import { AReceptorBase } from "./abstract/base/receptorbase";

export class HammerPowerUp extends PowerUpBase<AReceptorBase> {
    protected readonly _name: string = "Hammer";
    protected readonly _acceptedType: SenderType = 'receptor';
    protected action(object: AReceptorBase): void {
        object.clean();
    }
}