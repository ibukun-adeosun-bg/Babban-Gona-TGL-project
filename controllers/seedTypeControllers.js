const db = require("../config/dbConfig");

//CREATE A SEED TYPE
const createSeedType = async (req, res, next) => {
    try {
        const info = {
            seedType: req.body.seedType
        }
        const newSeedtype = new db.seed(info)
        await newSeedtype.save()
            .then(() => {
                res.status(200).json("Seed Type has been Created")
            }).catch(err => {
                res.status(500).json(err)
            })
    } catch (err) {
        next(err)
    }
}

const getSeedType = async (req, res, next) => {
    try {
        const seedName = req.params.seedType
        const seed = await db.seed.findOne({ where: { seedType: seedName }})
        res.status(200).json(seed)
    } catch (err) {
        next(err)
    }
}

const getAllSeedTypes = async (req,res, next) => {
    try {
        const allSeedTypes = await db.seed.findAll({})
        res.status(200).json(allSeedTypes)
    } catch (err) {
        next(err)
    }
}

const updateSeedType = async (req, res, next) => {
    try {
        const seedName = req.params.seedType
        await db.seed.update(
            req.body,
            { where: { seedType: seedName }}
        ).then(() => {
            res.status(200).json("Seed Type has been Updated")
        }).catch(err => {
            res.status(500).json(err)
        })
    } catch (err) {
        next(err)
    }
}

const deleteSeedtype = async (req, res, next) => {
    try {
        const seedName = req.params.seedType
        await db.seed.destroy({ where: { seedType: seedName }})
            .then(() => {
                res.status(200).json("Seed Type has been Updated")
            }).catch(err => {
                res.status(500).json(err)
            })
    } catch (err) {
        next(err)
    }
}


module.exports = { createSeedType, getSeedType, getAllSeedTypes, updateSeedType, deleteSeedtype }