'use strict'
module.exports = function(app){
    var comments = require('../controllers/commentController')

    app.route('/movieDetail/:movie_id')
        .get(comments.getComments)
        
    
    app.route('/movieDetail/:postby/:text')
        .post(comments.addComment) 
}