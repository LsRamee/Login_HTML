const express = require('express');
const path = require('path');
const morgan = require('morgan');

const { sequelize } = require('./models');
const indexRouter = require('./routes');
const rawRouter = require('./routes/raw');
const seqRouter = require('./routes/seq');

const app = express();
app.set('port', process.env.PORT || 3001);

sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/seq', seqRouter);
app.use('/raw', rawRouter);

app.use((req, res, next) => {
    const error =    new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.send(err.message);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
