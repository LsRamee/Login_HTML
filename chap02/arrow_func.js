function add1(x,y){
    return x + y;
}
var add2 = function(x, y){
    return x + y;
}
var add3 = (x, y) => {
    return x + y;
}
var add4 = (x,y) => (x + y)

console.log( add4(1,2))

function not1(x){
    return !x
}
const not2 = x => !x

console.log(not2(false))
console.log((x => !x)(false))

