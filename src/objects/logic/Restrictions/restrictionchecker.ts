export interface Restriction<E> {
    check(element:E):boolean;
}

export class RestrictionChecker<E>{
    element:E;
    restriction:Restriction<E>;

    constructor(element:E,check:Restriction<E>){
        this.element = element;
        this.restriction = check;
    }

    check():boolean{
        return this.restriction.check(this.element);
    }
}