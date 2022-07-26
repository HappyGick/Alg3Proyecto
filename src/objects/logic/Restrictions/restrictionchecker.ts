export interface Restriction<E> {
    check(element:E):boolean;
}
export interface RestrictionRegionGenerator<E>{
    generateRegion(element:E,initialInput:number):Array<E>; //? Any way to make this more flexible/generic?
}

export class RestrictionChecker<E,F>{
    element:E;
    restriction:Restriction<F>;

    constructor(element:E,check:Restriction<F>){
        this.element = element;
        this.restriction = check;
    }

    check(toCheck:F):boolean{
        return this.restriction.check(toCheck);
    }
    setRestriction(newRestriction:Restriction<F>){
        this.restriction = newRestriction;
    }

    //TEST Create on-demand regions?
    generateRegion(r:RestrictionRegionGenerator<E>,initialElement:E,initialPos:number):Array<E>{
        return r.generateRegion(initialElement,initialPos);
    }
}