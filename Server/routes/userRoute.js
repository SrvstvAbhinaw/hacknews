var express = require('express');
var router = express.Router();

var UserDetails = require('../controller/userController');

router.get('/fetchall', UserDetails.fetchUsers);

router.get('/fetch/:id',UserDetails.fetchUsersById);

router.post('/createnew', UserDetails.Create);

router.put('/update/:id', UserDetails.Update);

router.delete('/delete/:id', UserDetails.Delete);

module.exports =  router;