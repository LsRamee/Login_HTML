const express = require('express');
const { sequelize } = require('../models');

const router = express.Router();

router.get('/', (req, res)=>{
    res.send("raw 쿼리 실행")
})
router.get('/insert', async (req, res, next)=>{
   const result= await sequelize.query(
        `INSERT INTO users(name, age, married, comment)
         VALUES('김철수',60,TRUE,'영희남편')
        `)
    console.log(result);
    res.send("DB생성 완료");
})
router.get('/select', async (req, res, next)=>{
    const result= await sequelize.query(
        `SELECT name, age, married FROM users
         WHERE married=0 and age >20
        `)
    console.log(result)
    res.send(result);
})
router.get('/update', async (req, res, next)=>{
    const result= await sequelize.query(
        `UPDATE users SETs comment='바꿀내용' WHERE id=2
        `)
    console.log(result)
    res.send("DB수정 완료");
})
router.get('/delete', async (req, res, next)=>{
    const result= await sequelize.query(
        `DELETE FROM users WHERE id = 7
        `)
    console.log(result)
    res.send("DB삭제 완료");
})

module.exports = router;
