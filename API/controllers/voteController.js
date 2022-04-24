var mongoose = require('mongoose')
movieVotes      = mongoose.model('Votes')

exports.getAverageVote = function(req, res){
    movieVotes.findOne({movie_id : req.params.movie_id}, null, function(err, votes){
        
        let result = {
            averageVote: 0
        }

        if(votes != null)
        {
            result.averageVote = (parseFloat(votes.total_score)/ parseFloat(votes.vote_count)).toFixed(2)
        }

        res.json(result)
    })
}

exports.addVote = function(req, res){
    
    movieVotes.findOne({movie_id : req.params.movie_id}, null, function(err, response){
        if(err) throw err

        var currentVotes

        //==========[If no vote yet, then create empty obj to store vote]==========//
        if(response == null)
        {
            currentVotes = {
                movie_id: req.params.movie_id,
                total_score: 0,
                vote_count: 0,
                votes: []
            }
        }
        //==========[Else, read it from database]==========//
        else
        {
            currentVotes = {
                movie_id: req.params.movie_id,
                total_score: response.total_score,
                vote_count: response.vote_count,
                votes: response.votes
            }
        }

        //==========[Get current time]==========//
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+', '+time;

        //==========[Create object newVote]==========//
        var newVote = {
            voteBy: req.body.voteBy,
            voteTime: dateTime,
            score: req.body.score
        }
        
        //==========[Push new vote into array inside the object]==========//
        currentVotes.votes.push(newVote)
        currentVotes.total_score += req.body.score
        currentVotes.vote_count += 1

        //==========[Update vote or create if non exist]==========//
        movieVotes.findOneAndUpdate({movie_id : currentVotes.movie_id}, currentVotes, {new: true,upsert: true}, function(err, response){})
        res.json(currentVotes)
    })
}