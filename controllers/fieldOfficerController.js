const db = require("../config/dbConfig");
const bcrypt = require("bcryptjs")
const { states, stateLGAs } = require("../config/data")
const { numberPattern, LengthPatternforBVN } = require("../middleware/validation")
const { createError } = require("../middleware/error");

const createFieldOfficer = async (req, res, next) => {
    try {
        const state = await db.state.findOne({
            where: { state: req.body.state },
        });

        if (!numberPattern.test(req.body.BVN)) {
            next(createError(403, "Invalid BVN, you can only input numbers"))
        } else if (!LengthPatternforBVN.test(req.body.BVN)) {
            next(createError(403, "Invalid Bank Verification Number, must only be 11 numbers"))
        } else if (!numberPattern.test(req.body.governmentIdentificationID)) {
            next(createError(403, "Invalid Identification ID"))
        } else if (state.isdisabled) {
            next(createError(401, "This state has been deactivated, You are not allowed to Enter it"))
        } else if (!states.includes(req.body.state)) {
            next(createError(403, "Invalid State"))
        } else if (!stateLGAs[req.body.state].includes(req.body.localGovernmentArea)) {
            next(createError(403, "Invalid Local Government Area"))
        } else {
            if (req.file) {
                req.body.governmentIdentificationImage = req.file.filename
            }
            const salt = bcrypt.genSaltSync(10)
            const hashedBVN = bcrypt.hashSync(req.body.BVN, salt)
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
            
            const maxFieldOfficer = await db.fieldOfficer.max('fieldOfficerId');
            console.log(maxFieldOfficer);
            let newId = (maxFieldOfficer ? parseInt(maxFieldOfficer.split('-')[2]) + 1 : 1);
            let fieldOfficerId = `BG-FO-${padNumber(newId, 4)}`;
            while (await db.fieldOfficer.findOne({ where: { fieldOfficerId } })) {
                newId++;
                fieldOfficerId = `BG-FO-${padNumber(newId, 4)}`;
            }
            
            const info = {
                fieldOfficerId: fieldOfficerId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                sex: req.body.sex,
                dateOfBirth: req.body.dateOfBirth,
                BVN: hashedBVN,
                state: req.body.state,
                localGovernmentArea: req.body.localGovernmentArea,
                Hub: req.body.Hub,
                governmentIdentificationID: req.body.governmentIdentificationID,
                governmentIdentificationType: req.body.governmentIdentificationType,
                governmentIdentificationImage: req.body.governmentIdentificationImage,
                username: req.body.username,
                operatorId: req.body.operatorId
            }
            const newFieldOfficer = new db.fieldOfficer(info)
            await newFieldOfficer.save()
                .then(() => {
                    res.status(200).json({
                        success: true,
                        status: "OK",
                        message: "You are now a Field Officer on the Trust Group Leader Platform"
                    })
                }).catch(err => {
                    res.status(500).json(err)
                })
        }
    } catch (err) {
        next(err)
    }
}

const getFieldOfficer = async (req, res, next) => {
    try {
        const id = req.params.fieldOfficerId
        const fieldOfficer = await db.fieldOfficer.findOne({ fieldOfficerId: id})
        res.status(200).json(fieldOfficer)
    } catch (err) {
        next(err)
    }
}

const getAllFieldOfficers = async (req, res, next) => {
    try {
        const fieldOfficers = await db.fieldOfficer.findAll({})
        res.status(200).json(fieldOfficers)
    } catch (err) {
        next(err)
    }
}

const updateFieldOfficer = async (req, res, next) => {
    try {
        const id = req.params.fieldOfficerId
        await db.fieldOfficer.update(
            req.body,
            { where: { fieldOfficerId: id }}
        ).then(() => {
            res.status(200).json("Field Officer Information has been Updated")
        }).catch(err => {
            res.status(500).json(err)
        })
    } catch (err) {
        next(err)
    }
}

const deleteFieldOfficer = async (req, res, next) => {
    try {
        const id = req.params.fieldOfficerId
        await db.fieldOfficer.destroy({ where: { fieldOfficerId: id }})
            .then(() => {
                res.status(200).json("Field Officer Information has been Deleted")
            }).catch(err => {
                res.status(500).json(err)
            })
    } catch (err) {
        next(err)
    }
}


module.exports = { createFieldOfficer, getFieldOfficer, getAllFieldOfficers, updateFieldOfficer, deleteFieldOfficer }