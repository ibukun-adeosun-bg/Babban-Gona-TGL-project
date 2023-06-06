const express = require("express")
const multer = require("multer")
const bodyParser = require("body-parser")
const { verifyUser, verifyAdmin, verifyOperator, verifyToken } = require("../middleware/verifyToken")
const { createOperator, getOperator, getAllOperators, updateOperator, deleteOperator, operatorFieldOfficers } = require("../controllers/operatorController")
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
router.get("/:userId/:operatorId", verifyUser, getOperator)

//GET ALL OPERATORS
router.get("/", verifyAdmin, getAllOperators)

//GET ALL FIELD OFFICERS RECRUITED BY AN OPERATOR
router.get("/:userId/:operatorId/fieldOfficers", verifyUser, verifyAdmin, operatorFieldOfficers)

//UPDATE OPERATOR INFORMATION
router.put("/:userId/:operatorId", upload.single("profilePic"), bodyParser.urlencoded({ extended: true }), verifyUser, updateOperator)

//DELETE OPERATOR INFORMATION
router.delete("/:userId/:operatorId", verifyUser || verifyAdmin, deleteOperator)



module.exports = router