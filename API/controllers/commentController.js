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
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    
    var currentComment = {
        movie_id: req.body.movie_id,
        comments: req.body.comments
    }

    console.log(currentComment)

    var newComment = {
        postby: req.params.postby,
        postTime: dateTime,
        text: req.params.text
    }

    if(currentComment.comments == null)
    {
        currentComment.comments = []
    }
    currentComment.comments.push(newComment)
    console.log(currentComment)

    movieComments.findOneAndUpdate({movie_id : currentComment.movie_id}, currentComment, {new: true,upsert: true}, function(err, contact){
        if(err) throw err
        //console.log(newComment)
        res.json(newComment)
    })

}