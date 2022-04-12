const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


//Initializations
const app = express();
require("./database.js") //connect to database


//settings
app.set("port", process.env.PORT || 5000)


//middlewares
app.use(morgan("dev"))
app.use(express.json()); // sirve para entender los archivos json
app.use(express.urlencoded({extended: false})) // sirve para endender los datos enviados desde un formulario 
app.use(
    cors({
      origin: "http://localhost:3000", // <-- location of the react app were connecting to
      credentials: true,
    })
  );


//routers
app.use("/api", require("./routes/index"))


//starting the server
app.listen(app.get("port"), () => {
    console.log("server on port", app.get("port"))
  })

