const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

dotenv.config()

//.env 파일내에 키=값 형태로 저장되어 있는 값들을 이용할 수 있음
console.log(process.env.LOG_ID, process.env.LOG_PW, process.env.NAME);

const app = express();

//
app.set("port", process.env.PORT || 3000)

//요청에 대한 기록을 남겨주는 모듈
app.use(morgan('dev'))

//요청되는 경로의 파일이 public 폴더아래에 있으면 정적 파일을을 읽어서 응답
//파일이 있으면 next()를 호출하지 않으므로 그 아래에 있는 미들웨어들이 진행되지않는다.
//파일이 없으면 next()를 호출하여 그다음 미들웨어들이 동작될 수 있도록 한다. 
app.use("/", express.static(path.join(__dirname, 'public')));

//요청 데이터중 body에 있는 데이터는 스트림형식이기에 아래의 미들웨어가 body의 데이터를 바로 사용할 수 있도록 파싱(parsing)하여 req.body에 객체형태로 담아둔다.
//express.json()은 넘어오는 데이터의 Content-Type이 application/json 타입(대표적으로 axios같은 ajax타입으로 전송되는 경우가 많음)인 경우 파싱하여 req.body에 넣어둔다.
//express.urlencoded는 Content-Type이 urlencoding 방식(대부분 html에서 post로 데이터를 넒기는 경우)인 경우에 파싱하여 req.body에 넣어둔다.
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//요청 헤더를 통해 전달된 쿠카값(Cookie)에 있는 쿠키 데이터를 이용하기 편리하도록 파싱하여 req.cookies에 객체형식으로 담아둔다.
//cookieParser()에 메개변수로 데이터가 들어가는 경우 클라이언트에 저장되는 데이터는 서명데이터를 포함하기때문에 외부에서 변경이 불가능하다.
app.use(cookieParser("abcde12345"));

//서버의 세션을 사용할수 있도록 설정
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "abcde12345",   //세션ID를 쿠키값으로저장할때 서명값을 작성하기위한 키
    cookie:{                //쿠키 저장 옵션
        httpOnly: false
    },
    name:"seesion-cookie"   //세션ID를 저장할 쿠키 이름 지정
}))

const multer = require('multer');
const fs = require('fs');

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
             //한글 이름깨짐 방지 처리
            const ext = path.extname(file.originalname);
        
            file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
            //done(null, path.basename(file.originalname, ext) + ext);
        }
    }),
    limits: {
        fileSize: 5 * 1024 * 1024 //5242880 = 5M
    }
});

const indexRouter = require("./routes");
const userRouter = require("./routes/user");

app.use("/",indexRouter);
app.use("/user", userRouter);


/*
    [미들웨어]
    app.use(콜백) : 모든 요청에 대해서 실행할 미들웨어(콜백)를 실행하도록 설정
    app.use('경로', 콜백) : 모든 요청중 해당 경로에 대해서 요청이 있는경우 콜백 실행
    app.get('경로', 콜백) : get 요청중 해당 경로에 대해서 요청이 있는경우 콜백 실행
    app.post('경로', 콜백) : get 요청중 해당 경로에 대해서 요청이 있는경우 콜백 실행

    각 미들웨어는 순서대로 실행이되며 각 미들웨어(콜백)에는 req, res, next를 매개변수로 받으며, next()를 수행해야만 다음 미들웨어를 실행
*/
app.post('/upload/single', upload.single('image'), (req, res) => {
    console.log(req.file, req.body);
    res.send('single upload OK');
});
app.post('/upload/none', upload.none(), (req, res) => {
    console.log(req.file, req.body);
    res.send('none upload OK');
});
app.post('/upload/array', upload.array('many'), (req, res) => {
    console.log(req.files, req.body);
    res.send('array upload OK');
});
app.post('/upload/fields', upload.fields([{name:'image1'}, {name:'image2'}]), (req, res) => {
    console.log(req.files, req.body);
    res.send('fields upload OK');
});
app.post('/upload/combine', upload.fields([{name:'single'}, {name:'many'}]), (req, res) => {
    console.log(req.files, req.body);
    res.send('combine upload OK');
});

app.get('/', (req, res)=>{
    res.send("Index");
})
app.post('/login', (req, res)=>{
    // post 방식으로 /login 경로로 요청이왔을때 실행됨
    // req.body 에는 post방식으로 요청을 할때 보내온 데이터가 앞에 express.json 또는 express.urlencoded 미들웨어에 의해서 데이터가 파싱되어 들어가있음
    // 보내온 데이터의 키=값 형식으로 넘어오기때문에 req.body.id는 id, req.body.password에는 password의 키로 넘어온 데이터를 읽어올 수 있음
    // 넘어온 데이터인 id값이 .env의 LOG_ID와 같고, password값이 .env의 LOG_PW값과 같은경우 로그인처리르하고 그렇지않은경우 실패처리
    if(req.body.id === process.env.LOG_ID && req.body.password === process.env.LOG_PW){
        //req.session 에 내가 원하는 형식으로 세션데이터를 저장할수 있음
        //세션에 login 키에 로그인된 id 값을 저장
        //세션은 모든 요청에대해서 해당 클라이어트만 접근할 수 있음
        req.session.login = req.body.id;
        res.send("로그인 성공");
    } else {
        res.send("로그인 실패");
    }
})
app.get("/loginTest", (req, res)=>{
    // 세션의 login에 id가 있으면 (위 /login 요청에서 로그인이 성공했따면) 로그인되었을 때의 데이터를 전송
    if(req.session.login){
        res.send(`
            ${req.session.login}님 환영합니다.
            <button type="button" onclick="location.href='/logout'">로그아웃</button>
        `)
    //로그인 되어있지 않은경우 비 로그인시에 대한 데이터를 전송할 수 있음
    } else {
        res.send(`
            로그인이 필요합니다.
            <button type="button" onclick="location.href='/login.html'">로그인</button>
        `)
    }
})
app.get("/logout", (req, res)=>{
    // get형식으로 /logout 경로로 요청이 온 경우 seesion의 destroy메소드를 실행하여 세션저장소를 모두 지움
    req.session.destroy()
    res.send(`
        로그아웃 되었습니다.
        <button type="button" onclick="location.href='/login.html'">로그인</button>
    `)
})


app.get('/setSession', (req, res)=>{
    req.session.name="kclee";
    req.session.height=180;
    res.send("세션 생성완료:"+req.sessionID);
})
app.get('/delSession', (req, res)=>{
    req.session.destroy();
    res.send("세션 삭제완료:"+req.sessionID);
})
app.get('/session1', (req, res)=>{
    res.send(`
        Session 1<br>
        name : ${req.session.name}, <br>
        height : ${req.session.height}
    `);
})
app.get('/session2', (req, res)=>{
    res.send(`
        Session 2<br>
        name : ${req.session.name}, <br>
        height : ${req.session.height}
    `);
})

app.get('/setCookie', (req, res)=>{
    //쿠키 설정
    res.cookie("name", "kclee", {
        expires: new Date(Date.now() + (5 * 60 * 1000)),
        httpOnly: true,
        signed: true
    })
    res.send("setCookie");
})
app.get('/cookie1', (req, res)=>{
    //cookieParse에서 서명용 키를 입력하여 서명데이터가 같이 저장된 쿠키의 경우 req.singedCookies를 통해 데이터를 확인
    console.log(req.signedCookies)
    res.send("Cookie - name:"+req.signedCookies.name);
})
app.get('/cookie2', (req, res)=>{
    //cookieParse에서 서명용 키를 입력하지 않아 그냥 데이터만 저장된 쿠키의 경우 req.cookies를 통해 데이터를 확인
    console.log(req.cookies)
    res.send("Cookie - name:"+req.cookies.name);
})
app.post('/postData', (req, res)=>{
    console.log("postData", req.body.id, req.body.password);
    if(req.body.id === "kclee" && req.body.password === "1234"){
        console.log("로그인 성공");
    } else {
        console.log("로그인 실패");
    }

    res.send(`postData<br>
        id: ${req.body.id},
        password: ${req.body.password}
    `);
})

app.use((req,res,next)=>{
    res.status(404).send("요청된 경로가 없습니다.");
})

app.listen(app.get("port"), ()=>{
    console.log(app.get("port") + '번 포트에서 대기중...');
})