// Dependency
var mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');

// Schema
var challengeSchema = new mongoose.Schema({
    id: {
        type:Number,
        unique:true
    },
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    totalvote:{
        type: Number,
        required: true
    },
    createdby: {
        type: String,
        required: true
    },
    createdon: {
        type:Date,
        required: true
    },
    voted: {
        type: Array
    }
});

var connection = mongoose.createConnection('mongodb://localhost:27017/hacknewsDB');

autoIncrement.initialize(connection);

challengeSchema.plugin(autoIncrement.plugin,{model: 'challenges', field: 'id', startAt:1000, incrementBy:1});
// Return model
module.exports = mongoose.model('challenges', challengeSchema);

