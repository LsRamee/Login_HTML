const fs = require('fs').promises;
console.log("시작");
fs.readFile('readme.txt')
    .then((data)=>{
        console.log(data);
        console.log(data.toString());
    })
    .catch((err)=>{
        console.log(err);
    })
console.log("끝");