export interface Restriction<E> {
    check(element:E):boolean;
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
}