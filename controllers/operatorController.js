const { states, stateLGAs } = require("../config/data")
const db = require("../config/dbConfig")
const { createError } = require("../middleware/error")
const { numberPattern } = require("../middleware/validation")

//CREATE AN OPERATOR
const createOperator = async (req, res, next) => {
    try {
        const state = await db.state.findOne({
            where: { state: req.body.state },
        });
        const isUserOperator = await db.operator.findOne({ where: { userId: req.body.userId }})
        if (isUserOperator) {
            next(createError(409, "This User has already been registered as an operator"))
        } else if (!numberPattern.test(req.body.phoneNumber)) {
            next(createError(403, "Invalid Phone number, you can only input numbers"))
        } else if (!numberPattern.test(req.body.nin)) {
            next(createError(403, "Invalid National Identification Number"))
        } else if (state.isdisabled) {
            next(createError(401, "This state has been deactivated, You are not allowed to Enter it"))
        } else if (!states.includes(req.body.state)) {
            next(createError(403, "Invalid State"))
        } else if (!stateLGAs[req.body.state].includes(req.body.localGovernmentArea)) {
            next(createError(403, "Invalid Local Government Area"))
        } else {
            if (req.file) {
                req.body.profilePic = req.file.filename
            }
            const [lga, createdLga] = await db.lga.findOrCreate({
                where: { localGovernmentArea: req.body.localGovernmentArea },
                defaults: { state: req.body.state }
            });

            function padNumber(num, size) {
                let str = num.toString();
                while (str.length < size) {
                    str = "0" + str;
                }
                return str;
            }
            
            const maxOperator = await db.operator.max('operatorId');
            console.log(maxOperator);
            let newId = (maxOperator ? parseInt(maxOperator.split('-')[2]) + 1 : 1);
            let operatorId = `BG-OP-${padNumber(newId, 4)}`;
            while (await db.operator.findOne({ where: { operatorId } })) {
                newId++;
                operatorId = `BG-OP-${padNumber(newId, 4)}`;
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
                nin: req.body.nin,
                profilePic: req.body.profilePic,
                productName: req.body.productName,
                seedType: req.body.seedType,
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
        const operators = await db.operator.findAll({
            include: { model: db.fieldOfficer }
        })
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

//GET ALL FIELD OFFICERS RECRUITED BY AN OPERATOR
const operatorFieldOfficers = async (req, res, next) => {
    try {
        const id = req.params.operatorId
        const operatorAndOfficers = await db.operator.findOne({
            where: { operatorId: id },
            include: [{ model: db.fieldOfficer }]
        });
        res.status(200).json(operatorAndOfficers)
    } catch (err) {
        next(err)
    }
}



module.exports = { createOperator, getOperator, getAllOperators, updateOperator, deleteOperator, operatorFieldOfficers }