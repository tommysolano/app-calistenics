const express = require('express');
const morgan = require('morgan');
const passport = require('./passport/local-auth');
const session = require('express-session');



//Initializations
const app = express();
require("./database.js") //connect to database
require("./passport/local-auth") 


//settings
app.set("port", process.env.PORT || 3000)


//middlewares
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: "mysecretsession",
    resave: false,
    saveUninitialized: false,
    cookie: {secure: true}
}))
app.use(passport.initialize())
app.use(passport.session())


//routers
app.use("/api", require("./routes/index"))


//starting the server
app.listen(app.get("port"), () => {
    console.log("server on port", app.get("port"))
})

