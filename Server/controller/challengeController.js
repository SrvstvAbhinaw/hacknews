var Challenge = require('../models/challengemodel');

// Get all records
module.exports.fetchChallenges = (req, res, next) => {
    Challenge.find(function (err, challenge) {
      if (err) return next(err);
      res.json(challenge);
    });
  };

// Get records by id
module.exports.fetchChalllengeById = (req,res,next) => {
    Challenge.findOne({id : req.params.id})
  .then(challenge => {
      if(!challenge) {
          return res.status(404).send({
              message: "challenge not found with ID " + req.params.id
          });            
      }
      res.send(challenge);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "challenge not found with ID " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error retrieving challenge with ID " + req.params.id
      });
  });
}

// Create record
module.exports.Create = (req, res) => {
  // Validate request
  if(!req.body) {
      return res.status(400).send({
          message: "Data can not be empty"
      });
  }

  const challenge = new Challenge({
      title: req.body.title, 
      description: req.body.description,
      tag: req.body.tag,
      totalvote: req.body.totalvote,
      createdby: req.body.createdby,
      createdon: req.body.createdon
    });

  // Save Note in the database
  challenge.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the Note."
      });
  });
};

// Update record
module.exports.Update = (req,res,next) => {
// Validate Request
if(!req.body) {
  return res.status(400).send({
      message: "Challenge ID is mandatory"
  });
}

// Find note and update it with the request body
Challenge.findOneAndUpdate({id : req.params.id}, {
    title: req.body.title, 
    description: req.body.description,
    tag: req.body.tag,
    totalvote: req.body.totalvote,
    createdby: req.body.createdby,
    createdon: req.body.createdon
}, {new: true})
.then(data => {
  if(!data) {
      return res.status(404).send({
          message: "Challenge not found with ID " + req.params.id
      });
  }
  res.send(data);
}).catch(err => {
  if(err.kind === 'ObjectId') {
      return res.status(404).send({
          message: "Challenge not found with ID " + req.params.id
      });                
  }
  return res.status(500).send({
      message: "Error updating challenge with ID " + req.params.id
  });
});
}

module.exports.UpdateVote = (req,res,next) => {
    // Validate Request
    if(!req.params.id) {
      return res.status(400).send({
          message: "Employee ID is mandatory hbhjh"
      });
    }
// Fetch all user vote for
Challenge.findOneAndUpdate({id : req.params.id}, {
    title: req.body.title, 
    description: req.body.description,
    tag: req.body.tag,
    totalvote: req.body.totalvote,
    createdby: req.body.createdby,
    createdon: req.body.createdon,
    $addToSet : { voted: [req.params.userid]}
  }, {new: true})
  .then(data => {
    if(!data) {
        return res.status(404).send({
            message: "Employees voted found with ID " + req.params.employeeid
        });
    }
    res.send(data);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Employee's vote not found with ID " + req.params.employeeid
        });                
    }
    return res.status(500).send({
        message: "Error updating employee's votes with ID " + req.params.employeeid
    });
  });
  }

// Delete record
module.exports.Delete = (req,res,next) => {
    Challenge.findOneAndRemove({id : req.params.id})
  .then(data => {
      if(!data) {
          return res.status(404).send({
              message: "Challenge not found with ID " + req.params.id
          });
      }
      res.send({message: "Challenge deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Challenge not found with ID " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Could not delete challenge with ID " + req.params.id
      });
  });
}