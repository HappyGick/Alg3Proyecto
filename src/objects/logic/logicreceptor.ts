import { Neighborhood } from "../logic/neighborhood";
import { Observer, ObserverCallback } from "../observer";

export class LogicReceptor<P,I>{
    neighbors:Neighborhood<I,LogicReceptor<P,I>>;
    piece:P; defaultPiece:P;
    observer:Observer<P>;
    
    constructor(piece:P,defaultPiece:P){
        this.piece = piece;
        this.defaultPiece = defaultPiece;
        this.neighbors = new Neighborhood<I,LogicReceptor<P,I>>();
        this.observer = new Observer<P>(this.piece);
    }

    setNeighbors(n:Neighborhood<I,LogicReceptor<P,I>>){
        this.neighbors = n;
    }
    addNeighbor(index:I,newNeighbor:LogicReceptor<P,I>){
        this.neighbors.add(index,newNeighbor);
    }
    getNeighbor(index:I):LogicReceptor<P,I>|undefined{
        return this.neighbors.get(index);
    }
    placePiece(newPiece:P){
        this.piece = newPiece;
        this.updateObserver();
    }
    getPiece():P{
        return this.piece;
    }
    clean(){
        this.piece = this.defaultPiece;
        this.updateObserver();
    }
    updateObserver(){
        this.observer.update(this.piece);
    }
    addSubscriber(newSubscriber:ObserverCallback<P>){
        this.observer.subscribe(newSubscriber);
    }
}