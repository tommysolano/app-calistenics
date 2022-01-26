const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');


//Initializations
const app = express();
require("./database.js") //connect to database


//settings
app.set("port", process.env.PORT || 3000)


//middlewares
app.use(morgan("dev"))


//starting the server
app.listen(app.get("port"), () => {
    console.log("server on port", app.get("port"))
})