var sayNode = function(){
    console.log('node')
}
var es = 'ES';
var newObject = {
    sayJS(){
        console.log('JS')
    },
    sayNode,
    [es+6]:"Fantasitic"
}


newObject.sayNode()//Node
newObject.sayJS()//JS
console.log(newObject.ES6);
console.log(newObject["ES6"]);
