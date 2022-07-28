import { Observer, ObserverCallback } from "../observer";
import { Neighborhood } from "./neighborhood";

export class LogicCompositePiece<P,I>{
    composition:Neighborhood<I,P>;
    piece:P;defaultPiece:P;headPos:I;
    observer:Observer<P>;

    constructor(piece:P,defaultPiece:P,composition:Neighborhood<I,P>,headPos:I){
        this.piece = piece;
        this.defaultPiece = defaultPiece;
        this.composition = composition;
        this.headPos = headPos;
        this.observer = new Observer<P>(this.piece);
    }

    loadTemplate(template:{cells:boolean[],head:I},indexTransform:{(value:number):I}){
        this.composition = new Neighborhood<I,P>;
        for(let i=0; i<template.cells.length; i++){
            if(template.cells[i]){this.composition.add(indexTransform(i),this.piece)}
        }
        this.composition.add(template.head,this.piece);
        this.headPos = template.head;
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
    getHeadPos():I{
        return this.headPos;
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