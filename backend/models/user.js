import { Schema, model } from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new Schema({
    email: String,
    passport: String
})

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

export default model("users", userSchema)