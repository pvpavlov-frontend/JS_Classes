"use strict"

// 1) Переписать функцию-конструктор MyArray на классы. 
// * Переписать методы unshift и/или push для неограниченного числа аргументов.

const array = [ 1, 2, 3, 4, 5];

class MyArray {
  constructor() {
    this.length = 0;
    for (let i = 0; i < arguments.length; i++) {
      this[i] = arguments[i];
    }
    this.length = arguments.length;
  }
  shift() {
    let arrLength = this.length;
    let deleteObj = this[0];
    for (let i = 0; i < arrLength; i++) {
      this[i] = this[i + 1];
    }
    this.length -= 1;
    return deleteObj;
  }
  push() {
    var argLength = arguments.length;
    var arrLength = this.length;
    for (var i = 0; i < argLength; i++) {
      this[arrLength + i] = arguments[i];
    }
    return this.length;
  }
  unshift() {
      let argulength = arguments.length;
      let arrLength = this.length;
      for (let i = arrLength; i >= 0; i--) {
        this[i + argulength - 1] = this[i - 1]
      }
      for (let i = 0; i < argulength; i++) {
        this[i] = arguments[i]
      }
      return this.length;
    };
}
  
const myArray = new MyArray( array );
// console.log('myArray[0] :>> ', myArray[0]);

// console.log('myArray :>> ', myArray[0].unshift(-1, 0)); // добавляем -1, 0 в начало массива, метод возвращает новую длинну массива
// console.log('myArray :>> ', myArray[0].push(6, 7)); // добавляем 6, 7 в конец массива, метод возвращает новую длинну массива
// console.log('myArray[0] :>> ', myArray[0] );



// 2) Реализовать класс RangeValidator, со следующими свойствами:
// ■ from (типа number);
// ■ to (типа number);
// (from <= to)

class RangeValidator{
  constructor(from, to){
    this.val1 = from;
    this.val2 = to;
  }
  validate(v){
    if(typeof v !== "number" || Number.isNaN(v)){
      return false;   
    }
    return v >= this.val1 && v <= this.val2;
  }
  get range(){
    return [this.val1, this.val2];
  }  

  /**
   * @param {number} v
   */
  set val1(v){
    if(typeof v !== "number"){
      throw new TypeError("Параметр должен быть числом");   
    }
    if( Number.isNaN(v) ) {
      throw new RangeError("Параметр должен быть не NaN");
    }
    if( "_val2" in this && v > this.val2) {
      throw new RangeError("Первый параметр должен быть <=  второго" );
    }
    this._val1 = v;

  }
  get val1(){
    return this._val1;
  }
  /**
   * @param {number} v
   */
  
  set val2(v){
    if (typeof v !== "number"){
      throw new TypeError("Параметр должен быть числом");     
    }
    if( Number.isNaN(v) ) {
      throw new RangeError("Параметр должен быть не NaN");
    }
    if( v < this.val1 ) {
      throw new RangeError("Второй параметр должен быть >= первому" );
    }
    this._val2 = v;
  }
  get val2(){
    return this._val2;
  }
}
try {
  const range1 = new RangeValidator(1, 5) // Отрабатывает
  // const range2 = new RangeValidator(10, 5.5) // ОШИБКА!!!

  range1.val1 = 5; // Отрабатывает
  // range1.val1 = 200; // ОШИБКА!!!
  
  range1.val2 = 80; // Отрабатывает
  // range1.val2 = -55; // ОШИБКА!!! 
  
  console.log(range1.val1) // => 5
  console.log(range1.val2) // => 80 

  console.log(range1.range) // => [5, 80]

  console.log(range1.validate(10)) // => true
  console.log(range1.validate(100)) // => false

} catch (error) {
  console.log('error :>> ', error);
}