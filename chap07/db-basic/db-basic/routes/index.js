const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    res.send("DB연동");
});

module.exports = router;
