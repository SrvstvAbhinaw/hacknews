var User = require('../models/usermodel');

// Get all records
module.exports.fetchUsers = (req, res, next) => {
    User.find(function (err, users) {
      if (err) return next(err);
      res.json(users);
    });
  };

// Get records by id
module.exports.fetchUsersById = (req,res,next) => {
  User.findOne({employeeid : req.params.id})
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "Employee not found with ID " + req.params.id
          });            
      }
      res.send(user);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Employee not found with ID " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error retrieving employee with ID " + req.params.id
      });
  });
}

// Create record
module.exports.Create = (req, res) => {
  // Validate request
  if(!req.body.employeeid) {
      return res.status(400).send({
          message: "Data can not be empty"
      });
  }

  const user = new User({
      employeeid: req.body.employeeid, 
      employeename: req.body.employeename
  });

  // Save Note in the database
  user.save()
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
if(!req.body.employeeid) {
  return res.status(400).send({
      message: "Employee ID is mandatory"
  });
}

// Find note and update it with the request body
User.findOneAndUpdate({employeeid : req.params.id}, {
  employeename: req.body.employeename
}, {new: true})
.then(data => {
  if(!data) {
      return res.status(404).send({
          message: "Employee not found with ID " + req.params.employeeid
      });
  }
  res.send(data);
}).catch(err => {
  if(err.kind === 'ObjectId') {
      return res.status(404).send({
          message: "Employee not found with ID " + req.params.employeeid
      });                
  }
  return res.status(500).send({
      message: "Error updating employee with ID " + req.params.employeeid
  });
});
}

// Delete record
module.exports.Delete = (req,res,next) => {
  User.findOneAndRemove({employeeid : req.params.id})
  .then(data => {
      if(!data) {
          return res.status(404).send({
              message: "Employee not found with ID " + req.params.id
          });
      }
      res.send({message: "Employee deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Employee not found with ID " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Could not delete employee with ID " + req.params.id
      });
  });
}