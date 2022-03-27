const express = require('express');
const morgan = require('morgan');
const passport = require('./passport/local-auth');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');



//Initializations
const app = express();
require("./database.js") //connect to database
require("./passport/local-auth") 


//settings
app.set("port", process.env.PORT || 5000)


//middlewares
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(
    cors({
      origin: "http://localhost:3000", // <-- location of the react app were connecting to
      credentials: true,
    })
  );
app.use(session({
    secret: "thisismysecretsessionXD",
    resave: true,
    saveUninitialized: true,
    //cookie: {secure: true}
}))
app.use(cookieParser("thisismysecretsessionXD"))
app.use(passport.initialize())
app.use(passport.session())


//routers
app.use("/api", require("./routes/index"))


//starting the server
app.listen(app.get("port"), () => {
    console.log("server on port", app.get("port"))
})

