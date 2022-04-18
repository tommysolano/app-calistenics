const express = require('express');
const router = express.Router();
const User = require('../models/user')
const jwt = require("jsonwebtoken")
const verifyToken = require('../libs/verifyToken')

// registro de usuarios
router.post("/signup", async (req, res) => {

    // verificamos que el usuario no este registrado
    const verifyEmail = await User.findOne({ email: req.body.email })

    if(verifyEmail){
        return res.status(401).send("El email ya esta registrado")
    }

    try {
        // recibiendo la informacion
        const { username, email, password } = req.body

        // creando un nuevo usuario
        const user = new User({
            username,
            email,
            password
        })

        //encriptamos la contraseña
        user.password = await user.encryptPassword(password)

        await user.save() // se guarda el usuario

        // creamos el token
        const token = jwt.sign({ id: user.id}, process.env.SECRET_KEY, {
            expiresIn: 60 * 60 * 24 // expira en 24 horas
        })

        res.json({ auth: true, token})

    } catch (error) {
        console.log(error)
        res.status(500).send("Hubo un problema registrando su usuario")
    }
});


// inicio de sesion de usuarios
router.post("/signin", async (req, res) => {

    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return res.status(404).send("El email no existe")
    }

    const validPassword = await user.comparePassword(
        req.body.password, user.password
    )

    const token = jwt.sign({ id: user._id}, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24
    })

    res.status(200).json({ auth: true, token})
});



// cerrar sesion
router.get("/logout", async (req, res) => {
    res.status(200).send({ auth: false, token: null})
});



// devuelve los datos del usuario
router.get("/profile", verifyToken, async (req, res) => {

    // buscamos al usuario en la base de datos luego de verificar el token
    const user = await User.findById(req.userId, {password: 0})

    // en caso de no encontrar al usuario
    if (!user) {
        return res.status(404).send("no se encontro el usuario")
    }

    // devolvemos al usuario
    res.status(200).json(user)
})


module.exports = router