const express = require("express")
const { verifyUser, verifyAdmin } = require("../middleware/verifyToken")
const { createOperator, getOperator, getAllOperators, updateOperator, deleteOperator } = require("../controllers/operatorController")
const router = express.Router()

//CREATE AN OPERATOR
router.post("/:username/operators", verifyUser, createOperator)

//GET AN OPERATOR
router.get("/:username/operators/:operatorId", verifyUser || verifyAdmin, getOperator)

//GET ALL OPERATORS
router.get("/:username/operators", verifyAdmin, getAllOperators)

//UPDATE OPERATOR INFORMATION
router.put("/:username/operators/:operatorId", verifyUser || verifyAdmin, updateOperator)

//DELETE OPERATOR INFORMATION
router.delete("/:username/operators/:operatorId", verifyUser || verifyAdmin, deleteOperator)



module.exports = router