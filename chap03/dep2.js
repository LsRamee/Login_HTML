const dep1 = require(`./dep1`);
console.log('require dep second',dep1);
module.exports = () => {
    console.log('dep12',dep1);
};