'use strict'
var mongoose = require('mongoose')
var Schema   = mongoose.Schema

var VoteSchema = new Schema({
    movie_id: {
        type: String,
        Required: 'Please enter'
    },
    total_score: {
        type: Number,
        Required: 'Please enter'
    },
    vote_count: {
        type: Number,
        Required: 'Please enter'
    },
    votes: [{
        voteBy: {
            type: String,
            Required: 'Please enter'
        },
        email: {
            type: String,
            Required: 'Please enter'
        },
        voteTime: {
            type: String,
            Required: 'Please enter'
        },
        score: {
            type: Number,
            Required: 'Please enter'
        },
        IsVoted: {
            type: Boolean,
            Required: 'Please enter'
        }
    }]
})

module.exports = mongoose.model('Votes', VoteSchema) 