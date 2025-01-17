
const express = require("express");
const ensureAuthenticated = require("../Middlewares/StudentAuth");
const router = express.Router();

router.get('/',ensureAuthenticated,(req,res)=>{
    console.log('------logged in use detail------',req.Student);

    res.status(200).json([
        {
            name:'student',
            price:10000
        },
        {
            name:'tv',
            price:200000
        }
    ])
});

module.exports = router;