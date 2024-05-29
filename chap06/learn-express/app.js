const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
//const cookiePaser = require('cookieParser');
const session = require('session');

dotenv.config()

console.log(process.env.LOG_ID, process.env.LOG_PW, process.env.NAME);

const app = express();

app.set("port",process.env.PORT || 3000)

app.use(morgan('dev'))
app.use("/",express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//app.use(cookiePaser());
app.use(session({
    resave: false,
    saveUninitialized : false,
    secret : "abcde12345",
    cookie : {
        httpOnly : false
    },
    name : "session"
}))

app.get('/',(req,res)=>{
    res.send("Index");
})
app.get('/setSession',(req,res)=>{
    req.session.name ="wpdnjs";
    req.session.height = 170;
    res.send("세션 생성완료 : "+req.sessionID);
})
app.get('/delSession',(req,res)=>{
    req.session.destroy();
    res.send("세션 생성완료 : "+req.sessionID);
})
app.get('/session1',(req,res)=>{
    res.send(`
    session 1 <br>
    name : ${req.session.name}, <br>
    height : ${req.session.height}<br>`);
})

app.get('/setCookie',(req,res)=>{
    res.cookie("name","wpdnjs",{
        expires:new Date(Date.now() + (5 *60 * 1000)),

    })
    res.send("setCookie");
})

app.get('/cookie1',(req,res)=>{
    console.log(req.signedCookies)
})

app.post('/postData',(req,res)=>{
    console.log("postData",req.body.id, req.body.password);
    if(req.body.id === "wpdnjs"&&req.body.password==="1234"){
        console.log("로그인 성공")
    }else{
        console.log("로그인 실패")
    }
    res.send(`postData<br>
        id:${req.body.id},
        password:${req.body.password}`);
})

app.get('/user',
    (req,res,next) =>{
        console.log("/user로 GET방식으로 요청되면 수행되는 미들웨어");
    },
    (req,res)=>{
    res.send("Hello User!");}
)

app.listen(app.get("port"), ()=>{
    console.log(app.get("port") + '번 포트에서 대기중...');
})