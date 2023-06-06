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

        function padNumber(num, size) {
            let str = num.toString();
            while (str.length < size) {
                str = "0" + str;
            }
            return str;
        }

        const maxSession = await db.assessment.max('sessionId');
        console.log(maxSession);
        let newId = (maxSession ? parseInt(maxSession.split('-')[1]) + 1 : 1);
        let sessionId = `SESSION-${padNumber(newId, 3)}`;
        while (await db.assessment.findOne({ where: { sessionId } })) {
            newId++;
            sessionId = `SESSION-${padNumber(newId, 3)}`;
        }
        //Save the assessment to the assessment database
        const isOfficerPresent = await db.assessment.findOne({
            where: { fieldOfficerId: fieldOfficerId }
        })
        if (isOfficerPresent.submitted) {
            next(createError(409, "This Field Officer has already submitted his/her response to an assessment"))
        } else {
            const session = await db.assessment.create({
                sessionId,
                fieldOfficerId,
                questions: selectedQuestions
            });
            selectedQuestions.push({ sessionId: session.sessionId })
            res.status(200).json(selectedQuestions)
        }
    } catch (err) {
        next(err)
    }
}

const submitTestResponses = async (req, res, next) => {
    try {
        const id = req.params.sessionId
        const responses = req.body.responses
        //Get the assessment for the field officer from the database
        const assessment = await db.assessment.findOne(
            { where: { sessionId: id }}
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
        if (assessment) {
            next(createError(409, "An assessment has already been generated for this field officer"))
        } else {
            let submitted = true
            await db.assessment.update(
                { score, responses, submitted },
                { where: { sessionId: id }}
            ).then(() => {
                res.status(200).json({
                    success: true,
                    status: "OK",
                    message: "Response is accepted and the score has been graded",
                    score: score
                })
            }).catch(err => {
                res.status(500).json(err)
            })
        }
    } catch (err) {
        next(err)
    }
}


module.exports = { generateTestQuestions, submitTestResponses }