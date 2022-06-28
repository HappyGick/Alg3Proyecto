import { GameEvent } from "excalibur";

export class EventHelper {
    static createEvent<T>(params: T) {
        let ev = new GameEvent<T>();
        ev.other = params;
        return ev;
    }
}