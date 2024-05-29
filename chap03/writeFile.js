const fs = require('fs').promises;
console.log("시작");
fs.writeFile('writeme.txt',"아무거나 적는 곳")
    .then(()=>{
        console.log("작성완료");
    })
    .catch((err)=>{
        console.log(err);
    })
console.log("끝");