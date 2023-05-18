const express = require("express")
const multer = require("multer")
const bodyParser = require("body-parser");
const { verifyToken, verifyUser, verifyAdmin } = require("../middleware/verifyToken");
const { createFieldOfficer, getFieldOfficer, getAllFieldOfficers, updateFieldOfficer, deleteFieldOfficer } = require("../controllers/fieldOfficerController");
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

//CREATE A FIELD OFFICER
router.post("/", upload.single("governmentIdentificationImage"), bodyParser.urlencoded({ extended: true }), verifyToken, createFieldOfficer)

//GET A FIELD OFFICER
router.get("/:username/:fieldOfficerId", verifyUser, getFieldOfficer)

//GET ALL FIELD OFFICERS
router.get("/", verifyAdmin, getAllFieldOfficers)

//UPDATE FIELD OFFICER INFORMATION
router.put("/:username/:fieldOfficerId", upload.single("governmentIdentificationImage"), bodyParser.urlencoded({ extended: true }),  verifyUser, updateFieldOfficer)

//DELETE FIELD OFFICER INFORMATION
router.delete("/:username/:fieldOfficerId", verifyUser, deleteFieldOfficer)


module.exports = router