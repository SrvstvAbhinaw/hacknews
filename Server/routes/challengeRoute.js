var express = require('express');
var router = express.Router();

var ChallengeDetails = require('../controller/challengeController');

router.get('/fetchall', ChallengeDetails.fetchChallenges);

router.get('/fetch/:id',ChallengeDetails.fetchChalllengeById);

router.post('/createnew', ChallengeDetails.Create);

router.put('/update/:id', ChallengeDetails.Update);

router.delete('/delete/:id', ChallengeDetails.Delete);

router.put('/vote/:id/:userid', ChallengeDetails.UpdateVote);

module.exports =  router;