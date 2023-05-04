const { states, stateLGAs } = require("../config/data")
const db = require("../config/dbConfig")
const { createError } = require("../middleware/error")

//CREATE AN OPERATOR
const createOperator = async (req, res, next) => {
    try {
        if (!states.includes(req.body.state)) {
            next(createError(403, "Invalid State"))
        } else if (!stateLGAs[req.body.state].includes(req.body.localGovernmentArea)) {
            next(createError(403, "Invalid Local Government Area"))
        } else {
            if (req.file) {
                req.body.profilePic = req.file.filename
            }
            const maxOperator = await db.operator.max('operatorId');
            let newId = (maxOperator ? parseInt(maxOperator.substr(3), 10) + 1 : 1);
            let operatorId = `BG-OP-${newId.toString().padStart(6, '0')}`;
            while (await db.operator.findOne({ where: { operatorId } })) {
                newId++;
                operatorId = `BG-OP-${newId.toString().padStart(6, '0')}`;
            }
            const info = {
                operatorId: operatorId,
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
        }
    } catch (err) {
        next(err)
    }
}

//GET AN OPERATOR
const getOperator = async (req, res, next) => {
    try {
        const id = req.params.operatorId
        const operator = await db.operator.findOne({ where: { operatorId: id }})
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
            { where: { operatorId: id }}
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
        const id = req.params.operatorId
        await db.operator.destroy({ where: { operatorId: id }})
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