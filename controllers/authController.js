const db = require("../config/dbConfig")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { createError } = require("../middleware/error")

//REGISTER A USER
const register  = async (req, res, next) => {
    try {
        //Creating a user
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
        const newUser = new db.user(info)
        await newUser.save()
            .then(() => {
                res.status(200).json("User has been Registered")
            }).catch(err => {
                res.status(500).json(err)
            })
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
                id: user.id,
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