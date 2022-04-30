var express = require('express')
app         = express()
port        = process.env.PORT || 5000
mongoose    = require('mongoose')
movieCommentAndVote = require('./API/models/commentAndVoteModel')
bodyParser  = require('body-parser')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/Movie', function(error){
    if(error) throw error
    console.log('Successfully connected');
})

const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

var commentAndVoteRoute  = require('./API/routes/commentAndVoteRoutes')


commentAndVoteRoute(app)

app.listen(port)

console.log('API started on : '+ port)