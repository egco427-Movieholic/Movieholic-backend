'use strict'
module.exports = function(app){
    var commentAndVote = require('../controllers/commentAndVoteController')

    app.route('/movieDetail/commentAndVote/:movie_id')
        .get(commentAndVote.getCommentAndVote)
        .post(commentAndVote.addCommentAndVote)

    app.route('/movieDetail/averageRating/:movie_id')
        .get(commentAndVote.getAverageVote)

    app.route('/movieDetail/checkUserVote/:movie_id/:email')
        .get(commentAndVote.getUserVoteStatus)
}