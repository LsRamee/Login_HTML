const http = require('http');

const server = http.createServer((req, res)=>{
    console.log(req.method,req.url)
    if(req.url === "/about"){
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
    res.write("<h1>hello, about Node!</h1>")
    res.end("<p>END!!</p>")
    }else if(req.url ==="/user"){
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
        res.write("<h1>hello,user Node!</h1>")
        res.end("<p>END!!</p>")
    }
    else{
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
        res.write("<h1>hello,Node!</h1>")
        res.end("<p>END!!</p>")
    }
})

server.listen(8080,()=>{
    console.log("8080포트로 서버 대기중...!");
})