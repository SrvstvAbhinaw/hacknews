// Dependency
var mongoose = require('mongoose');

// Schema
var userSchema = new mongoose.Schema({
    employeeid : {
        type: Number,
        unique : true,
        required : true
    },
    employeename: {
        type: String,
        required:true
    }
});

// Return model
module.exports = mongoose.model('users', userSchema);