const jwt = require("jsonwebtoken") 

async function verifyToken(req, res, next) {
    
    // obtenemos el token del header
    const token = req.headers["x-access-token"];

    // si no existe el token
    if (!token) {
        return res
            .status(401)
            .send({ auth: false, message: "no token provided" })
    }

    // decodificamos el token
    const decoded = await jwt.verify(token, process.env.SECRET_KEY)

    // guardamos el token en un objeto del request para ser usado en las rutas
    req.userId = decoded.id

    //continuamos con la siguiente function
    next()
}

module.exports = verifyToken