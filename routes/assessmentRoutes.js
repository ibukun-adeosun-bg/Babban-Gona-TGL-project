const express = require("express")
const { verifyAdmin } = require("../middleware/verifyToken")
const { generateTestQuestions, submitTestResponses } = require("../controllers/assessmentController")
const router = express.Router()

//GENERATE TEST QUESTIONS FOR A FIELD OFFICER
router.get("/:operatorId/fieldOfficers/:fieldOfficerId/generate-test-questions", verifyAdmin, generateTestQuestions)

//SUBMIT TEST RESPONSES FOR A FIELD OFFICER
router.post("/:operatorId/fieldOfficers/:fieldOfficerId/submit-test-responses", verifyAdmin, submitTestResponses)


module.exports = router