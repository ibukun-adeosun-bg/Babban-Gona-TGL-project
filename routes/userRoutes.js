const express = require("express")
const { verifyUser, verifyAdmin } = require("../middleware/verifyToken")
const router = express.Router()

//GET A USER INFORMATION
router.get("/:username", verifyUser || verifyAdmin, )

//GET ALL USERS
router.get("/", verifyAdmin, )

//UPDATE USER INFORMATION
router.get("/:username", verifyUser)

//DELETE USER INFORMATION
router.get("/:username", verifyUser || verifyAdmin, )


module.exports = router