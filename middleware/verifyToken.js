const jwt = require("jsonwebtoken")
const { createError } = require("./error")

const verifyToken = (req, res, next) => {
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
        res.status(401).json("You are not Authenticated Yet")
    }
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.role === "Admin") {
            next();
        } else {
            res.status(401).json("You are not an Admin, so you are not Authorized to do this")
        }
    })
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log(req.user.userId, req.params.userId);
        if(req.user.userId === req.params.userId) {
            next();
        } else {
            res.status(401).json("You are not Authorized to do this")
        }
    })
}

const verifyOperator = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.role === "Operator") {
            next();
        } else {
            res.status(401).json("You are not an Operator, so you are not authorized to do this")
        }
    })
}


module.exports = { verifyToken, verifyUser, verifyAdmin, verifyOperator }