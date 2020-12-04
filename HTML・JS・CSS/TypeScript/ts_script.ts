import { Person } from './mylib.js';

class Teen extends Person {
    private __age:number;
    school:string;
    
    constructor(nm , ml , ag , sc){
        super(nm, ml, ag);
        this.school = sc;
    }
    
    get age() {
       return this.__age;
    }
    set age(n:number) {
      this.__age = n < 0 ? 0 : n >= 20 ? 19 : n;
    }
    
    toString()  {
       return this.name + ',' + this.mail + ',' + this.age + ' (' + this.school + ')';
    }
}

let taro = new Person('Tato','taro@test',35);
let hanako = new Teen('Hanako','hanako@flower',17,'Tokyo High-school');

function load(){
	let msg = `<ul>
	<li>?{taro.print()}</li>
	<li>?{hanako.print()}</li>
	</ul>`;
	document.querySelector('#msg').textContent = msg;
}

load();