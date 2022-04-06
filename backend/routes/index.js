const express = require('express');
const router = express.Router()
const passport = require('passport');
const jwt = require('jsonwebtoken');


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
            res.status(200).json({
                ok: true,
                user: {
                    id: req.user._id,
                    email: req.user.email,
                    name: req.user.name
                }
            })
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
        });

        const body = { _id: user._id, email: user.email, name: user.name}
        const token = jwt.sign( { user:body } , "TOP_SECRET")

        return res.json({ token, user: body})
    })(req, res, next)
})

// ----------------------- USER -------------------------------

router.get("/user", (req, res) => {
    const newUser = req.user
    newUser.password = null
    res.send(newUser)
})

router.get("/protected"), passport.authenticate("jwt", {session: false}), (req, res) => {
    res.json({
        ok: req.user
    })
}

// ----------------------- LOGOUT -------------------------------


router.get("/logout", (req, res, next) => {
    req.logout()
    res.send("logout")
})
 

// ----------------------- AUTHETICATION -------------------------------


/* router.use((req, res, next) => {
    isAuthenticated(req, res, next)
    //next()
})


function isAuthenticated(req, res, next) {
    console.log(req.isAuthenticated)
    if(req.isAuthenticated()){
        return next()
    }
    //res.redirect("/")
}
 */

module.exports = router