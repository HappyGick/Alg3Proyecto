export class Neighborhood<I,E>{
    maping:Map<I,E>;
    constructor(){
        this.maping = new Map<I,E>();
    }

    add(index:I,element:E):void{
        this.maping.set(index,element);
    }
    get(index:I):E|undefined{
        return this.maping.get(index); //May or may not include the index requested. Take into consideration as postcondition
    }
    includes(index:I):boolean{
        return this.maping.has(index);
    }
    getSize():number{
        return this.maping.size;
    }
}