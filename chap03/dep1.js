const dep2 = require(`./dep2`);
console.log('require dep first',dep2);
module.exports = () => {
    console.log('dep21',dep2);
};