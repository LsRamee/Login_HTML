class Car {
    constructor(color='black'){  //생성하는 함수 거의 필수적으로 사용함
        this.color = color;
        this.speed = 0;
    }

    getColor(){
        return this.color;
    }

    setColor(color){
        this.color = color;
    }

    getSpeed(){
        return this.speed;
    }
    
    setSpeed(speed){
        this.speed = speed;
    }
}
class Truck extends Car{
    setLoad(load){
        this.load = load;
    }
    
    getLoad(){
        return this.load;
    }
    
    setSpeed(speed){
        if(speed >= 200) speed = 200;
        else if (speed < 0) speed = 0;
        super.setSpeed(speed);
    }


}
let carOne = new Truck();
let carTwo = new Truck('red');

carTwo.setColor('white')
console.log(`carOne의 색깔은 ${carOne.getColor()}입니다.`)
console.log(`carTwo의 색깔은 ${carTwo.getColor()}입니다.`)

carOne.setSpeed(10000)
carTwo.setSpeed(15000)
console.log(`carOne의 속도는 ${carOne.getSpeed()}Km/h입니다.`)
console.log(`carTwo의 속도는 ${carTwo.getSpeed()}Km/h입니다.`)

carOne.setLoad(1)
console.log(`carOne의 적재량은 ${carOne.getLoad()}톤입니다.`)