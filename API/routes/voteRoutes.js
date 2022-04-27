'use strict'
module.exports = function(app){
    var votes = require('../controllers/voteController')

    app.route('/movieDetail/vote/:movie_id')
        .get(votes.getAverageVote)
        .post(votes.addVote)

    app.route('/movieDetail/vote/:movie_id/:name')
        .get(votes.getUserVoteStatus)
}