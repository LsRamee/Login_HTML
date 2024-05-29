const http = require('http');

const server = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
    res.write("<h1>hello,Node!</h1>")
    res.write("<h2>Hi</h2>")
    res.write(`
        <ul>
            <li>NODE 1</li>
            <li>NODE 2</li>
            <li>NODE 3</li>
            <li>NODE 4</li>
        </ul>
    `)
    res.end("<p>END!!</p>")
})

server.listen(8080,()=>{
    console.log("8080포트로 서버 대기중...!");
})