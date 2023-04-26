const jwt = require("jsonwebtoken")
const { createError } = require("./error")

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(
            token,
            process.env.JWT_SEC,
            (err, payLoad) => {
                if(err) return next(createError(403, "Your Token is Invalid"))
                req.user = payLoad
                next();
            }
        )
    } else {
        res.status(401).json("You are not Authorized to do this")
    }
}

const verifyUser = async (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === parseInt(req.params.id)) {
            next();
        } else {
            res.status(401).json("You are not Authorized to do this")
        }
    })
}

const verifyAdmin = async (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin) {
            next();
        } else {
            res.status(401).json("You are not Authorized to do this")
        }
    })
}


module.exports = { verifyToken, verifyUser, verifyAdmin }