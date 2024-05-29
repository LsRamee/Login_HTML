const express = require('express');
const {Op}= require("sequelize");
const { User, Comment } = require('../models');

const router = express.Router();

router.get('/', (req, res)=>{
    res.send("seq 쿼리 실행")
})
router.get('/insert', async (req, res, next)=>{
    try{
        User.create({

                name:"김철수",
                age: 55,
                married: true,
                comment:"영희남편"
    })
    res.send("DB생성 완료");}
    catch(err){
        console.log(err);
        next(err);
    }
})
router.get('/select', async (req, res, next)=>{
    const users = await User.findAll({
        attributes:['name','age','married'],
        where:{
           [Op.or]: [{married:1},{age:{[Op.gte]:24}}] //gt:큰거 / gte: 큰거나 같은거/ lt : 작은거 / lte:작거나 같은
        },
        order:[['married','ASC'],['age','DESC']], //ASC 오름차순 DESC 내림차순
        limit:2,
        offset:1,
        raw:true
    })
    console.log(users);

    res.send();
})
router.get('/update', async (req, res, next)=>{
    User.update({
        comment:"바꿀 내용"
    },{
        where : {id:2}
    })
    res.send("DB수정 완료");
})
router.get('/delete', async (req, res, next)=>{
    User.destroy({
        where:{id:7}
    })
    res.send("DB삭제 완료");
})

module.exports = router;
