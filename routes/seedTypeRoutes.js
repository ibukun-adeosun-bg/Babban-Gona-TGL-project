const express = require("express")
const { verifyAdmin, verifyToken, } = require("../middleware/verifyToken")
const { createSeedType, getSeedType, getAllSeedTypes, updateSeedType, deleteSeedtype } = require("../controllers/seedTypeControllers")
const router = express.Router()

//CREATE A SEED TYPE
router.post("/", verifyAdmin, createSeedType)

//GET A SEED TYPE
router.get("/:seedType", verifyToken, getSeedType)

//GET ALL SEED TYPES
router.get("/", verifyToken, getAllSeedTypes)

//UPDATE A SEED TYOE
router.put("/:seedType", verifyAdmin, updateSeedType)

//DELETE A SEED TYPE
router.delete("/:seedType", verifyAdmin, deleteSeedtype)


module.exports = router