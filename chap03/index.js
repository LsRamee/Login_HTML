const {odd, even}= require(`./var`);
const checkNumber = require(`./func`);

function check0dd0rEven(str){
    if(str.length % 2){
        return odd;
    }
    return even;
}

console.log(checkNumber(10));
console.log(check0dd0rEven(`hell`));