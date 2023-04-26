const db = require("../config/dbConfig")
const bcrypt = require("bcryptjs")

//GET A USER
const getUser = async (req, res, next) => {
    try {
        const username = req.params.username
        const user = await db.user.findOne({ where: { username: username }})
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

//GET ALL USERS
const getAllUsers = async (req, res, next) => {
    try {
        const users = await db.user.findAll({})
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

//UPDATE USER INFORMATION
const updateUser = async (req, res, next) => {
    if(req.body.password) {
        const salt = bcrypt.genSaltSync(10)
        req.body.password = bcrypt.hashSync(req.body.password, salt)
    }
    try {
        const username = req.params.username
        await db.user.update(req.body, { where: { username: username }})
            .then(() => {
                res.status(200).json("User Information has been Updated")
            }).catch(err => {
                res.status(500).json(err)
            })
    } catch (err) {
        next(err)
    }
}

//DELETE USER INFORMATION
const deleteUser = async (req, res, next) => {
    try {
        const username = req.params.username
        await db.user.destroy({ where: { username: username }})
            .then(() => {
                res.status(200).json("User Information has been deleted")
            }).catch(err => {
                res.status(500).json(err)
            })
    } catch (err) {
        next(err)
    }
}


module.exports = { getUser, getAllUsers, updateUser, deleteUser }