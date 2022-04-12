const mongoose = require('mongoose')

mongoose.connect(process.env.DB_CALISTENICS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(db => console.log("database is connect"))
    .catch(err => console.log(err))