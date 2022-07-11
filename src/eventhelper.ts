import { Actor, GameEvent } from "excalibur";
import { PointerAbstraction } from "excalibur/build/dist/Input/PointerAbstraction";
import { PointerEvent } from "excalibur/build/dist/Input/PointerEvent";

export class EventHelper {
    public static pointerReference: PointerAbstraction;
    private static followMouseHandler?: (event: PointerEvent) => void;

    public static createEvent<T>(params: T) {
        let ev = new GameEvent<T>();
        ev.other = params;
        return ev;
    }

    public static emitEvent<T>(eventName: string, to: Actor, params: T) {
        to.emit(eventName, this.createEvent<T>(params));
    }

    public static initializePointerReference(pointer: PointerAbstraction) {
        this.pointerReference = pointer;
    }

    public static registerFollowMouseEvent(actor: Actor) {
        this.followMouseHandler = (e: PointerEvent) => {
            actor.pos = e.coordinates.worldPos;
        };
        this.pointerReference.on('move', this.followMouseHandler);
    }

    public static unregisterFollowMouseEvent() {
        if(this.followMouseHandler) this.pointerReference.off("move", this.followMouseHandler);
    }
}