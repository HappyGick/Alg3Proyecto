import { Actor, Color, Vector } from "excalibur";
import { CollisionHelper } from "../collisionhelper";
import { PointerEvent } from "excalibur/build/dist/Input/PointerEvent";
import { EventHelper } from "../eventhelper";
import { APiece } from "./piece";

export class ACompositePieceHolder extends Actor {
    private _originalPos: Vector;
    private _pieces: APiece[];
    private _readyToPlace: number = 0;
    private followMouseHandler?: (event: PointerEvent) => void;

    constructor(position: Vector, pieces: APiece[]) {
        super({
            pos: position,
            width: 130,
            height: 130,
            collisionGroup: CollisionHelper.collidesWithNone,
            color: Color.Black,
            z: -1
        })
        this._originalPos = position;
        this._pieces = pieces;

        for(let p of pieces) {
            p.holder = this;
        }
    }

    public registerReady() {
        this._readyToPlace += 1;
        console.log(this._readyToPlace);
    }

    public unregisterReady() {
        this._readyToPlace -= 1;
        console.log(this._readyToPlace);
    }

    dragMoveEvent(e: PointerEvent) {
        let deltaPos = e.coordinates.worldPos.sub(this.pos);
        this.pos = e.coordinates.worldPos;
        for (let piece of this._pieces) {
            piece.pos = piece.pos.add(deltaPos);
        }
        this.unregisterFollowMouse();
    }

    dragEndEvent() {
        this.unregisterFollowMouse();
        if (this._readyToPlace === this._pieces.length) {
            
        } else {
            this.pos = this._originalPos;
            for(let piece of this._pieces) {
                piece.resetPosition();
            }
        }
    }

    dragEnterEvent() {
        this.unregisterFollowMouse();
    }
    
    dragLeaveEvent() {
        this.registerFollowMouse();
    }

    registerFollowMouse() {
        this.followMouseHandler = (e: PointerEvent) => {
            let deltaPos = e.coordinates.worldPos.sub(this.pos);
            this.pos = e.coordinates.worldPos;
            for (let piece of this._pieces) {
                piece.pos = piece.pos.add(deltaPos);
            }
        };
        EventHelper.pointerReference.on('move', this.followMouseHandler);
    }

    unregisterFollowMouse() {
        if (this.followMouseHandler) EventHelper.pointerReference.off("move", this.followMouseHandler);
    }

    setupEvents() {
        this.on('pointerdragmove', this.dragMoveEvent.bind(this));
        this.on('pointerdragend', this.dragEndEvent.bind(this));
        this.on('pointerdragleave', this.dragLeaveEvent.bind(this));
        this.on('pointerdragenter', this.dragEnterEvent.bind(this));
    }

    onInitialize() {
        this.setupEvents();
    }
}