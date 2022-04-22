'use strict'
var mongoose = require('mongoose')
var Schema   = mongoose.Schema

var CommentSchema = new Schema({
    movie_id: {
        type: String,
        Required: 'Please enter'
    },
    comments: [{
        postBy: {
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
        }
    }]
})

module.exports = mongoose.model('Comments', CommentSchema) 