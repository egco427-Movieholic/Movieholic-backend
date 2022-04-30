var mongoose = require('mongoose')
movieCommentAndVote = mongoose.model('CommentAndVote')

exports.getCommentAndVote = function(req, res){
    movieCommentAndVote.findOne({movie_id : req.params.movie_id}, null, function(err, response){
        if(err) throw err
       
        res.json(response)
    })
}

exports.addCommentAndVote = function(req, res){
    
    movieCommentAndVote.findOne({movie_id : req.params.movie_id}, null, function(err, response){
        if(err) throw err

        var currentCommentAndVote

        //==========[If no comment/vote yet, then create empty obj to store comment/vote]==========//
        if(response == null)
        {
            currentCommentAndVote = {
                movie_id: req.params.movie_id,
                total_score: 0,
                vote_count: 0,
                commentAndVote: []
            }
        }
        //==========[Else, read it from database]==========//
        else
        {
            currentCommentAndVote = {
                movie_id: req.params.movie_id,
                total_score: response.total_score,
                vote_count: response.vote_count,
                commentAndVote: response.commentAndVote
            }
        }

        //==========[Get current time]==========//
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+', '+time;

        //==========[Create object newCommentandVote]==========//
        var newCommentAndVote = {
            postBy: req.body.postBy,
            email: req.body.email,
            postTime: dateTime,
            text: req.body.text,
            score: req.body.score
        }
        
        //==========[Push new comment/vote into array inside the object, add new score and count up vote by 1]==========//
        currentCommentAndVote.commentAndVote.push(newCommentAndVote)
        currentCommentAndVote.total_score += req.body.score
        currentCommentAndVote.vote_count += 1

        //==========[Update comment/vote or create if non exist]==========//
        movieCommentAndVote.findOneAndUpdate({movie_id : currentCommentAndVote.movie_id}, currentCommentAndVote, {new: true,upsert: true}, function(err, response){})
        res.json(currentCommentAndVote)
    })
}

exports.getAverageVote = function(req, res){
    movieCommentAndVote.findOne({movie_id : req.params.movie_id}, null, function(err, response){
        
        let result = {
            averageVote: 0
        }

        if(response != null)
        {
            result.averageVote = (parseFloat(response.total_score)/ parseFloat(response.vote_count)).toFixed(1)
        }

        res.json(result)
    })
}


exports.getUserVoteStatus = function(req, res){
    movieCommentAndVote.findOne({movie_id : req.params.movie_id}, null, function(err, response){
        let result = {
            IsVoted: false
        }
        
        if(response != null)
        {
            for(var i=0 ; i<response.commentAndVote.length ; i++)
            {
                //==========[If found the same email, then user is already voted.]==========//
                if(req.params.email == response.commentAndVote[i].email)
                {
                    result.IsVoted = true 
                    break
                }
            }
        }
        
        res.json(result)
    })
}