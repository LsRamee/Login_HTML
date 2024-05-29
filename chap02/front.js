const http = require('http');//모듈을 불러온다.
const fs = require('fs');

//서버가 들어갈  변수를 지정한다. 두 개의 인자를 사용할 수 있다. 
const server = http.createServer((req, res) => {
    //console.log(req);
    //res.writeHead(200,{"Content-Type" : "text/html"})
    //res.write(`<meta charset ="utf8">`)
    // res.write(`<h1>안녕하세요</h2>`)
    // res.write(`<div>2037053 이제원입니다.</div>`)
    // res.end()

    switch (req.url) {
        case "/favicon.ico":
            break;
        case "/":
            fs.readFile(__dirname + '/index.html', (err, data) => { // 파일 읽는 메소드
                if (err) {
                    return console.error(err); // 에러 발생시 에러 기록하고 종료
                }
                res.write(data, 'utf-8'); // 브라우저로 전송
                res.end();
            });
            break;

        case "/list":
            for(let i=0; i<100;i++)
            {
                res.write(`<div>${i}</div>`)
            }
            res.end();
            break;
        
        case "/upload":
            res.write(`<input type="file">`);
            res.end();
            break;

        case "/api/get" :
            if(req.method === "GET"){
                res.write(JSON.stringify({
                    univ:"영남이공대학교",
                    dept:"사이버보안스쿨"
                }));
            }
            res.end()
            break;

        case "/api/post" :
                if(req.method === "POST"){
                    let body = ""
                    req.on("data", (data)=>{
                        body += data;
                    })
                    req.on("end",()=>{
                        //body = JSON.parse(body)
                        console.log(body)

                        res.write(JSON.stringify({
                            name:body.name,
                            birth : body.birth,
                            login : body.name==="이제원" &&  body.birth === 2001? "성공" : "실패",
                            univ:"영남이공대학교",
                            dept:"사이버보안스쿨"
                        }))
                        res.end()
                    })
                 
                }
                break;

        default:
            console.log(req.url)
            res.end();
    }

});

server.listen(80, () => {
    console.log(" server listening ")
});
