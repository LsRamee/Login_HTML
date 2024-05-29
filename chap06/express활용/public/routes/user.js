const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    res.send("User /");
})
router.get('/:id',(req,res)=>{
    console.log(req.params, req.query);
    res.send("User /"+req.params.id);
})
router.get('/list',(req,res)=>{
    res.send("User /");
})

module.exports = router;