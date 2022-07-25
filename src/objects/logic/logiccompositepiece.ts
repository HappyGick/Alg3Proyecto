import { Observer, ObserverCallback } from "../observer";
import { Neighborhood } from "./neighborhood";

export class LogicCompositePiece<P,I>{
    composition:Neighborhood<I,P>;
    piece:P;defaultPiece:P;
    observer:Observer<P>;

    constructor(piece:P,defaultPiece:P,composition:Neighborhood<I,P>){
        this.piece = piece;
        this.defaultPiece = defaultPiece;
        this.composition = composition;
        this.observer = new Observer<P>(this.piece);
    }

    setNeighbors(n:Neighborhood<I,P>){
        this.composition = n;
    }
    addNeighbor(index:I,newNeighbor:P){
        this.composition.add(index,newNeighbor);
    }
    getNeighbor(index:I):P|undefined{
        return this.composition.get(index);
    }
    getPiece():P{
        return this.piece;
    }
    includesPiece(index:I):boolean{
        return this.composition.includes(index);
    }
    updateObserver(){
        this.observer.update(this.piece);
    }
    addSubscriber(newSubscriber:ObserverCallback<P>){
        this.observer.subscribe(newSubscriber);
    }
}