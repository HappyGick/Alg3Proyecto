import { Actor, Vector } from "excalibur";
import { CollisionHelper } from "../collisionhelper";
import { PointerEvent } from "excalibur/build/dist/Input/PointerEvent";
import { EventHelper } from "../eventhelper";
import { APieceBase } from "../objects/abstract/base/piecebase";
import { PartialTemplate, ReceptorColor } from "../types";
import { LogicCompositePiece } from "../objects/logic/logiccompositepiece";
import { Neighborhood } from "../objects/logic/neighborhood";
import { GameSystem } from "../objects/system";

export class APieceHolder<T extends APieceBase> extends Actor {
    private _originalPos: Vector;
    private _pieces: T[];
    private _headPiece: T; // cabeza
    private followMouseHandler?: (event: PointerEvent) => void;
    //TEST Piece holders have composite pieces inside?
    private _logicComposite: LogicCompositePiece<ReceptorColor,number>;

    constructor(position: Vector, pieces: T[], headPiece: T, template : PartialTemplate, color:ReceptorColor) {
        super({
            pos: position,
            width: 130,
            height: 130,
            collisionGroup: CollisionHelper.collidesWithNone,
            z: -1
        })
        this._originalPos = position;
        this._pieces = pieces;
        this._headPiece = headPiece;
        this._headPiece.toggleHead();

        for(let p of pieces) {
            p.holder = this;
        }

        this._logicComposite = new LogicCompositePiece<ReceptorColor,number>(color,color,new Neighborhood<number,ReceptorColor>(),0);
        this._logicComposite.loadTemplate(template,function(x:number):number{return x})
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
        this.pos = this._originalPos;
        for(let piece of this._pieces) {
            piece.resetPosition();
        }

        //TEST Insertion via static method
            GameSystem.tryInsert(this._logicComposite);
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