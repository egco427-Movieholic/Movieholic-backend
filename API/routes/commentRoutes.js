'use strict'
module.exports = function(app){
    var comments = require('../controllers/commentController')

    app.route('/movieDetail/comment/:movie_id')
        .get(comments.getComments)
        .post(comments.addComment)
}