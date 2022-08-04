import { Actor, Vector } from "excalibur";
import { CollisionHelper } from "../collisionhelper";
import { PointerEvent } from "excalibur/build/dist/Input/PointerEvent";
import { EventHelper } from "../eventhelper";
import { APieceBase } from "../objects/abstract/base/piecebase";
import { PartialTemplate, PieceColor, RotatePieceCallback } from "../types";
import { LogicCompositePiece } from "../objects/logic/logiccompositepiece";
import { Neighborhood } from "../objects/logic/neighborhood";
import { GameSystem } from "../objects/system";
import { Box } from "../objects/box";

export class APieceHolder<T extends APieceBase> extends Actor {
    private _originalPos: Vector;
    private _pieces: T[];
    private _headPiece: T; // cabeza
    private followMouseHandler?: (event: PointerEvent) => void;
    //TEST Piece holders have composite pieces inside?
    private _logicComposite: LogicCompositePiece<PieceColor,number>;
    private _template: PartialTemplate;
    private _pieceColor: PieceColor;
    private dragging: boolean = false;
    private rotateRequestCallback: RotatePieceCallback = () => {};
    private _replace: () => void = () => {};

    public set rotateCallback(c: RotatePieceCallback) {
        this.rotateRequestCallback = c;
    }

    public set replaceCallback(c: () => void) {
        this._replace = c;
    }

    constructor(position: Vector, pieces: T[], headPiece: T, template : PartialTemplate, color: PieceColor) {
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
        this._template = template;
        this._pieceColor = color;

        for(let p of pieces) {
            p.holder = this;
        }

        this._logicComposite = new LogicCompositePiece<PieceColor,number>(color,color,new Neighborhood<number,PieceColor>(),0);
        this._logicComposite.loadTemplate(template,function(x:number):number{return x})
    }

    private killEverything() {
        this.kill();
        for(let p of this._pieces) {
            p.kill();
        }
    }

    public replace() {
        this._replace();
        this.killEverything();
    }

    onClickEvent() {
        if (!GameSystem.usePowerUp('piece', new Box(this))) {
            this.rotateRequestCallback(this._template, this._pieceColor);
            this.killEverything();
        }
    }

    pointerUpEvent() {
        if (this.dragging) return;
        this.onClickEvent();
    }

    dragMoveEvent(e: PointerEvent) {
        this.dragging = true;
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
        if (GameSystem.tryInsert(this._logicComposite)) {
            this.replace();
        }
        this.dragging = false;
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
        this.on('pointerup', this.pointerUpEvent.bind(this));
        this.on('pointerdragmove', this.dragMoveEvent.bind(this));
        this.on('pointerdragend', this.dragEndEvent.bind(this));
        this.on('pointerdragleave', this.dragLeaveEvent.bind(this));
        this.on('pointerdragenter', this.dragEnterEvent.bind(this));
    }

    onInitialize() {
        this.setupEvents();
    }
}