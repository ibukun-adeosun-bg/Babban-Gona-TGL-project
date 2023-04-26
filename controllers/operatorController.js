const db = require("../config/dbConfig")

//CREATE AN OPERATOR
const createOperator = async (req, res, next) => {
    try {
        const info = {
            operatorId: req.body.operatorId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            nationality: req.body.nationality,
            state: req.body.state,
            localGovernmentArea: req.body.localGovernmentArea,
            sex: req.body.sex,
            dateOfBirth: req.body.dateOfBirth,
            identificationNumber: req.body.identificationNumber,
            profilePic: req.body.profilePic,
            userId: req.body.userId
        }
        const newOperator = new db.operator(info)
        await newOperator.save()
            .then(() => {
                res.status(200).json("You are now an Operator on the Trust Group Leader Platform")
            }).catch(err => {
                res.status(500).json(err)
            })
    } catch (err) {
        next(err)
    }
}

//GET AN OPERATOR
const getOperator = async (req, res, next) => {
    try {
        const id = req.params.operatorId
        const operator = await db.operator.findOne({ where: { id: id }})
        res.status(200).json(operator)
    } catch (err) {
        next(err)
    }
}

//GET ALL OPERATORS
const getAllOperators = async (req, res, next) => {
    try {
        const operators = await db.operator.findAll({})
        res.status(200).json(operators)
    } catch (err) {
        next(err)
    }
}

//UPDATE AN OPERATOR
const updateOperator = async (req, res, next) => {
    try {
        const id = req.params.operatorId
        await db.operator.update(
            req.body,
            { where: { id: id }}
        ).then(() => {
            res.status(200).json("Operator Information has been Updated")
        }).catch(err => {
            res.status(500).json(err)
        })
    } catch (err) {
        next(err)
    }
}

//DELETE AN OPERATOR
const deleteOperator = async (req, res, next) => {
    try {
        const id = req.params.id
        await db.operator.destroy({ where: { id: id }})
            .then(() => {
                res.status(200).json("Operator Information has been deleted")
            }).catch(err => {
                res.status(500).json(err)
            })
    } catch (err) {
        next(err)
    }
}



module.exports = { createOperator, getOperator, getAllOperators, updateOperator, deleteOperator }