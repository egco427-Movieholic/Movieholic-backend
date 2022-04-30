'use strict'
var mongoose = require('mongoose')
var Schema   = mongoose.Schema

var CommentAndVoteSchema = new Schema({
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
    commentAndVote: [{
        postBy: {
            type: String,
            Required: 'Please enter'
        },
        email: {
            type: String,
            Required: 'Please enter'
        },
        postTime: {
            type: String,
            Required: 'Please enter'
        },
        text: {
            type: String,
            Required: 'Please enter'
        },
        score: {
            type: Number,
            Required: 'Please enter'
        },
    }]
})

module.exports = mongoose.model('CommentAndVote', CommentAndVoteSchema) 