var mongoose = require('mongoose')
movieComments      = mongoose.model('Comments')

exports.getComments = function(req, res){
    movieComments.find({movie_id : req.params.movie_id}, null, function(err, comments){
        if(err) throw err
        console.log(comments)
        res.json(comments)
    })
}

exports.addComment = function(req, res){
    
    movieComments.find({movie_id : req.params.movie_id}, null, function(err, comments){
        if(err) throw err
        var currentComments = comments

        console.log("====================[    1    ]====================")
        console.log(currentComments)

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        var newComment = {
            postBy: req.body.postBy,
            postTime: dateTime,
            text: req.body.text
        }

        //var newCommentObj = JSON.parse(newComment);

        if(JSON.stringify(currentComments) == "[]")
        {
            currentComments = {
                movie_id: req.params.movie_id,
                comments: [newComment]
            }
        }
        else
        {
            
        }

        console.log("====================[    2    ]====================")
        console.log(currentComments)

        movieComments.findOneAndUpdate({movie_id : currentComments.movie_id}, currentComments, {new: true,upsert: true}, function(err, response){})
        res.json(currentComments)
    })

    

}