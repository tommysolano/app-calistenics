const express = require('express');
const router = express.Router()
const passport = require('passport');


// ----------------------- REGISTER -------------------------------

router.post("/signup", (req, res) => {
    passport.authenticate("local-signup", function (error, user, info) {
        if (error) {
            return res.status(500).json({
                message: error || "Something happend",
                error: error.message || "Server error",
            });
        }
        req.logIn(user, function (error, data) {
            if (error) {
                return res.status(500).json({
                    message: error || "Something happend",
                    error: error.message || "Server error",
                });
            }
            res.status(200)
            console.log(req.user)
        });
    })(req, res)
})


// ----------------------- LOGIN -----------------------------------


router.post("/signin", (req, res, next) => {
    passport.authenticate("local-signin", function (error, user, info) {
        if (error) {
            return res.status(500).json({
                message: error || "Something happend",
                error: error.message || "Server error",
            });
        }

        req.logIn(user, function (error, data) {
            if (error) {
                return res.status(500).json({
                    message: error || "Something happend",
                    error: error.message || "Server error",
                });
            }
            //res.sendStatus(200)
            console.log(req.user)
        });

        //?user.isAuthenticated = true?  deberia utilizar esta metodo de autenticacion o solo el expuesto abajo?
        return res.json(user);
    })(req, res, next)
})

// ----------------------- USER -------------------------------

router.get("/user", (req, res) => {
    res.send(req.user)
    console.log(req.user)
})

// ----------------------- LOGOUT -------------------------------


router.get("/logout", (req, res, next) => {
    req.logout()
    //res.redirect("/")
    //res.send("logout success")
})
 

// ----------------------- AUTHETICATION -------------------------------


router.use((req, res, next) => {
    isAuthenticated(req, res, next)
    next()
})


function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next()
    }
    //res.redirect("/")
}


module.exports = router