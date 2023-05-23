const db = require("../config/dbConfig");
const { createError } = require("../middleware/error");
const Questions = require("../config/questions.json")

const getTestQuestions = async () => {
    try {
        //Fetch the questions from the excel spreadsheet using the node xlsx module
        const jsonData = Questions;
        return jsonData
    } catch (error) {
        throw error
    }
}

const getCategories = (questions) => {
    const categoriesSet = new Set();
    questions.forEach((question) => {
      categoriesSet.add(question.category);
    });
    return Array.from(categoriesSet);
};

const getRandomQuestions = (questions, count) => {
    const shuffled = questions.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
}

const generateTestQuestions = async (req, res, next) => {
    try {
        const fieldOfficerId = req.params.fieldOfficerId
        const operatorId = req.params.operatorId
        const fieldOfficer = await db.fieldOfficer.findOne(
            { where: { fieldOfficerId: fieldOfficerId }}
        )
        if (!fieldOfficer) return next(createError(404, "Field Officer Not Found"))
        //Get the questions
        const questions = await getTestQuestions()
        const categories = getCategories(questions);
        const selectedQuestions = [];

        for (const category of categories) {
            const categoryQuestions = questions.filter((question) => question.category === category);
            const randomQuestions = getRandomQuestions(categoryQuestions, 5);
            selectedQuestions.push(...randomQuestions);
        }
        //Save the assessment to the assessment database
        await db.assessment.create({
            fieldOfficerId,
            operatorId,
            questions: selectedQuestions
        });
        res.status(200).json(selectedQuestions)
    } catch (err) {
        next(err)
    }
}

const submitTestResponses = async (req, res, next) => {
    try {
        const id = req.params.fieldOfficerId
        const responses = req.body.responses
        //Get the assessment for the field officer from the database
        const assessment = await db.assessment.findOne(
            { where: { fieldOfficerId: id }}
        )
        if (!assessment) return next(createError(404, "An Assessment has not being assigned to this Field Officer"))
        //calculate the score based on the responses
        let score = 0
        for (const question of assessment.questions) {
            const questionId = question.id;
            const correctAnswer = question.answer;
          
            // Find the corresponding response for the question
            const response = responses.find((r) => r.id === questionId);
          
            if (response) {
              // Compare the answer in the response with the correct answer
              if (response.answer === correctAnswer) {
                // Increase the score if the answer is correct
                score++;
              }
            }
        }
        //Save the score and response into the database
        await db.assessment.update(
            { score, responses },
            { where: { fieldOfficerId: id }}
        ).then(() => {
            res.status(200).json({
                success: false,
                status: "OK",
                message: "Response is accepted and the score has been graded"
            })
        }).catch(err => {
            res.status(500).json(err)
        })
    } catch (err) {
        next(err)
    }
}


module.exports = { generateTestQuestions, submitTestResponses }