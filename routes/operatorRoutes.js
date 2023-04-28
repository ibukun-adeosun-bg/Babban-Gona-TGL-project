const express = require("express")
const multer = require("multer")
const upload = multer({ dest: 'uploads/' });
const bodyParser = require("body-parser")
const { verifyUser, verifyAdmin } = require("../middleware/verifyToken")
const { createOperator, getOperator, getAllOperators, updateOperator, deleteOperator } = require("../controllers/operatorController")
const router = express.Router()

//CREATE AN OPERATOR
router.post("/:username/operators", upload.single("profilePic"), bodyParser.urlencoded({ extended: true }), verifyUser, createOperator)

//GET AN OPERATOR
router.get("/:username/operators/:operatorId", verifyUser || verifyAdmin, getOperator)

//GET ALL OPERATORS
router.get("/:username/operators", verifyAdmin, getAllOperators)

//UPDATE OPERATOR INFORMATION
router.put("/:username/operators/:operatorId", upload.single("profilePic"), bodyParser.urlencoded({ extended: true }), verifyUser || verifyAdmin, updateOperator)

//DELETE OPERATOR INFORMATION
router.delete("/:username/operators/:operatorId", verifyUser || verifyAdmin, deleteOperator)



module.exports = router