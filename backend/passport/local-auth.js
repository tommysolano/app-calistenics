const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/user')

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
        return done(null, false, ) // TODO: añadir mensaje de que el email ya ha sido tomado
    } else {
        const newUser = new User()
        newUser.email = email
        newUser.password = newUser.encryptPassword(password)
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
        done(null, false, ) // TODO: añadir al mensaje de que el email no esta registrado
    }

    if(!user.comparePassword(password)){
        return done(null, false, ) // TODO: añadir mensaje de la contraseña no es igual
    }

    done(null, user)

}))
