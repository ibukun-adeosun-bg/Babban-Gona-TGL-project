const db = require("../config/dbConfig")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { createError } = require("../middleware/error")
const { schema } = require("../middleware/validation")

//REGISTER A USER
const register  = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)
        const info = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: req.body.isAdmin ? req.body.isAdmin : false
        }
        const alreadyExistsUser = await db.user.findOne({ where: { email: req.body.email }})
        if (alreadyExistsUser) return next(createError(409, "This User already Exists"))

        if (!schema.validate(req.body.password)) {
            next(createError(403, "Password must contain at least 8 characters, an uppercase letter, a lowercase letter, no spaces and at least 2 digits"))
        } else {
            const newUser = new db.user(info)
            await newUser.save()
                .then(() => {
                    res.status(200).json({
                        success: true,
                        message: "User has been Successfully Registered"
                    })
                }).catch(err => {
                    res.status(500).json(err)
                })
        }
    } catch (err) {
        next(err)
    }
}

//LOGIN AN EXISTING USER
const login = async (req, res, next) => {
    try {
        const user = await db.user.findOne({ where: { email: req.body.email }})
        if (!user) return next(createError(404, "User Not Found!!!"))

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)
        if (!isPasswordCorrect) return next(createError(401, "Email Address and Password don't match"))
        
        const accessToken = jwt.sign(
            {
                username: user.username,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SEC,
            { expiresIn: "30d" }
        )
        res.status(200).json({
            message: "You are now logged in and Authorized",
            id: user.id,
            isAdmin: user.isAdmin,
            username: user.username,
            accessToken: accessToken
        })
    } catch (err) {
        next(err)
    }
}


module.exports = { register, login }