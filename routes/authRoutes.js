const express = require("express")
const { register, login } = require("../controllers/authController")
const router = express.Router()

//REGISTER A USER
router.post("/register", register)

//LOGIN AN EXISTING USER
router.post("/login", login)


module.exports = router