
const express = require("express");
const ensureAuthenticated = require("../Middlewares/AdminAuth");
const router = express.Router();

router.get('/',ensureAuthenticated,(req,res)=>{
    console.log('------logged in use detail------',req.Admin);

    res.status(200).json([
        {
            name:'admin',
            price:10000
        },
        {
            name:'tv',
            price:200000
        }
    ])
});

module.exports = router;