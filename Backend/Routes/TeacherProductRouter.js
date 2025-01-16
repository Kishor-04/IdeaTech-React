
const express = require("express");
const ensureAuthenticated = require("../Middlewares/TeacherAuth");
const router = express.Router();

router.get('/',ensureAuthenticated,(req,res)=>{
    console.log('------logged in use detail------',req.Teacher);

    res.status(200).json([
        {
            name:'Teacher',
            price:10000
        },
        {
            name:'tv',
            price:200000
        }
    ])
});

module.exports = router;