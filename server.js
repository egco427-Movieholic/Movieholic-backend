var express = require('express')
app         = express()
port        = process.env.PORT || 5000
mongoose    = require('mongoose')
movieComments = require('./API/models/commentModel')
movieVotes = require('./API/models/voteModel')
bodyParser  = require('body-parser')

//Database Mongo Atlas
//mongodb+srv://Admin:admin1234@moviecomments.hlyun.mongodb.net/MovieComments?retryWrites=true&w=majority

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/Movie', function(error){
    if(error) throw error
    console.log('Successfully connected');
})

const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

var commentRoute  = require('./API/routes/commentRoutes')
var voteRoute = require('./API/routes/voteRoutes')

commentRoute(app)
voteRoute(app)

app.listen(port)

console.log('API started on : '+ port)