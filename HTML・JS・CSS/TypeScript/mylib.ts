interface Printable {
    print():string;
}


export class Person implements Printable {
    name:string;
    mail:string;
    private _age:number;
    
    get age() {
        return this._age;
    }
    set age(n:number) {
        this._age = n < 0 ? 0 :n;
    }
    
    constructor(nm , ml ,ag) {
        this.name = nm;
        this.mail = ml;
        this.age = ag;
    }
    
    print():string {
      return this.name + ',' + this.mail + ',' + this.age;
    }

}
