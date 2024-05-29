const http = require('http');

const server = http.createServer((req, res)=>{
    res.writeHead(200, {'Set-Cookie':'school=ync; HttpOnly;'})

    console.log(req.url, req.headers.cookie);
    res.end("Hellow, Cookie")
}) 

server.listen(8090,()=>{
    console.log("8090포트로 서버 대기중...!");
})