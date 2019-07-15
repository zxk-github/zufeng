/**
 * 装点原来的东西，但是不会改变原来本身的东西，只是加强功能或者业务逻辑更加强大
 * 装饰器中后者的属性方法和前面的要一样，但是适配器模式不需要一样 
 * */


 class Duck {
     constructor(name) {
        this.name = name;
     }
     eat(food) {
        console.log(`吃${food}`)
     }
 }

 class TangDuck {
     constructor(name) {
        this.duck = new Duck(name)
     }
     eat (food) {
         this.duck.eat(food)
         console.log('谢谢')
     }

 }

 const t1 = new TangDuck('唐老鸭');
 t1.eat('jizi')












