const express = require("express")
const { verifyUser, verifyAdmin } = require("../middleware/verifyToken")
const { getUser, getAllUsers, updateUser, deleteUser } = require("../controllers/userController")
const router = express.Router()

//GET A USER INFORMATION
router.get("/:userId", verifyUser || verifyAdmin, getUser)

//GET ALL USERS
router.get("/", verifyAdmin, getAllUsers)

//UPDATE USER INFORMATION
router.put("/:userId", verifyUser || verifyAdmin, updateUser)

//DELETE USER INFORMATION
router.delete("/:userId", verifyUser || verifyAdmin, deleteUser)


module.exports = router