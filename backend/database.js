const mongoose = require('mongoose')
const { mongodb } = require('./keys')

mongoose.connect(mongodb.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(db => console.log("database is connect"))
    .catch(err => console.log(err))