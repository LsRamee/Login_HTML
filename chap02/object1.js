var sayNode = function(){
    console.log('node')
}
var es = 'ES';
var oldObject = {
    sayJS: function(){
        console.log('JS')
    },
    sayNode: sayNode,

}
oldObject[es+6] = "Fantasitic";

oldObject.sayNode()//Node
oldObject.sayJS()//JS
console.log(oldObject.ES6);
console.log(oldObject["ES6"]);
