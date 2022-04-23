var mongoose = require('mongoose')
movieComments      = mongoose.model('Comments')

exports.getComments = function(req, res){
    movieComments.findOne({movie_id : req.params.movie_id}, null, function(err, comments){
        if(err) throw err
        console.log(comments)
        res.json(comments)
    })
}

exports.addComment = function(req, res){
    
    movieComments.findOne({movie_id : req.params.movie_id}, null, function(err, response){
        if(err) throw err

        var currentComments

        //==========[If no comment yet, then create empty obj to store comment]==========//
        if(response == null)
        {
            currentComments = {
                movie_id: req.params.movie_id,
                comments: []
            }
        }
        //==========[Else, read it from database]==========//
        else
        {
            var currentComments = {
                movie_id: response.movie_id,
                comments: response.comments
            }
        }

        //==========[Get current time]==========//
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+', '+time;

        //==========[Create object newComment]==========//
        var newComment = {
            postBy: req.body.postBy,
            postTime: dateTime,
            text: req.body.text
        }
        
        //==========[Push new comment into array inside the object]==========//
        currentComments.comments.push(newComment)

        //==========[Update comment or create if non exist]==========//
        movieComments.findOneAndUpdate({movie_id : currentComments.movie_id}, currentComments, {new: true,upsert: true}, function(err, response){})
        res.json(currentComments)
    })
}