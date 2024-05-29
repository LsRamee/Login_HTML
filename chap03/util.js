const util = require('util');
const crypto = require('crypto');

const dontUseMe = util.deprecate((x,y)=>{
    console.log(x + y);
},'dontUseMe 함수는 deprecated되었으니 더 이상 사용하지 마세요!');