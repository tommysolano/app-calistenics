const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.serializeUser((user, done) => { // conserva los datos del usuario
    done(null, user.id)
})

passport.deserializeUser( async(id, done) => { // recupera datos de la sesion del usuario
    const user = await User.findById(id)
    done(null, user)    
})


passport.use("local-signup", new LocalStrategy({ // analiza si el nuevo usuario creado se encuentra anteriormente registrado con el mismo mail
    usernameField: "email", 
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {

    const user = await User.findOne({email: email})
    

    if(user){
        return done("the email is already registered") 
    } else {
        encryptPassword = bcrypt.hashSync(password, salt) // encriptamos el password
        let {name} = req.body
        const newUser = new User()
        newUser.email = email
        newUser.password = encryptPassword
        newUser.name = name
        await newUser.save()
        done(null, newUser)
    }
}))


passport.use("local-signin", new LocalStrategy({ // compara el email y la comtraseña del usuario ya registrado
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async(req, email, password, done) => {

    const user = await User.findOne({email: email})

    if(!user){
        return done("the email is not registered") 
    }

    const validPassword = bcrypt.compareSync(password, user.password)

    if(!validPassword){
        return done("the password does not match") 
    }

    return done(null, user)

}))


passport.use(  
    new JWTstrategy(
        {
            secretOrKey: "TOP_SECRET",
            jwtFromRequest: ExtractJWT.fromBodyField("token") // se extrae el jwt de la solicitud
        }, async (token, done) => {
            try {
                return done(null, token.user)
            } catch (error) {
                done(error)
            }
        }
    )
)


module.exports = passport