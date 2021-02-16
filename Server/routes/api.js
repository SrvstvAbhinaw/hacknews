// Dependencies
var express = require('express');
var router = express.Router();

// Routes

router.use('/home',function(req, res) {
    res.send('api connected !');
 }); 

 router.use('/Users', require('./userRoute'));
 router.use('/Challenges', require('./challengeRoute'));

// Return router
module.exports = router;