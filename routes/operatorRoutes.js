const express = require("express")
const multer = require("multer")
const bodyParser = require("body-parser")
const { verifyUser, verifyAdmin, verifyToken } = require("../middleware/verifyToken")
const { createOperator, getOperator, getAllOperators, updateOperator, deleteOperator } = require("../controllers/operatorController")
const router = express.Router()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, 'tgtemplate' + '-' + Date.now() + '.png');
    },
});
const upload = multer({ storage: storage})

//CREATE AN OPERATOR
router.post("/", upload.single("profilePic"), bodyParser.urlencoded({ extended: true }), verifyToken, createOperator)

//GET AN OPERATOR
router.get("/:operatorId", verifyUser, getOperator)

//GET ALL OPERATORS
router.get("/", verifyAdmin, getAllOperators)

//UPDATE OPERATOR INFORMATION
router.put("/:operatorId", upload.single("profilePic"), bodyParser.urlencoded({ extended: true }), verifyUser, updateOperator)

//DELETE OPERATOR INFORMATION
router.delete("/:operatorId", verifyUser || verifyAdmin, deleteOperator)



module.exports = router