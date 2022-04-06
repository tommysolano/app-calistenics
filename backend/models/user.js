const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require("bcryptjs")

const userSchema = new Schema({
    email: String,
    password: String,
    name: String,
})


module.exports = mongoose.model("users", userSchema)