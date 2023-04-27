const db = require("../config/dbConfig")

//CREATE A PRODUCT
const createProduct = async (req, res, next) => {
    try {
        const info = {
            productId: req.body.productId,
            productType: req.body.productType,
            seedType: req.body.seedType,
            operatorId: req.body.operatorId
        }
        const newProduct = new db.product(info)
        await newProduct.save()
            .then(() => {
                res.status(200).json("Product has been Created")
            }).catch(err => {
                res.status(500).json(err)
            })
    } catch (err) {
        next(err)
    }
}

//GET A PRODUCT
const getProduct = async (req, res, next) => {
    try {
        const id = req.params.productId
        const product = await db.product.findOne({ where: { id: id }})
        res.status(200).json(product)
    } catch (err) {
        next(err)
    }
}

const getAllProducts = async (req, res, next) => {
    try {
        const products = await db.product.findAll({})
        res.status(200).json(products)
    } catch (err) {
        next(err)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.productId
        await db.product.update(
            req.body,
            { where: { id: id }}
        ).then(() => {
            res.status(200).json("Product Information has been Updated")
        }).catch(err => {
            res.status(500).json(err)
        })
    } catch (err) {
        next(err)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.productId
        await db.product.destroy({ where: { id: id }})
            .then(() => {
                res.status(200).json("Product has been Deleted")
            }).catch(err => {
                res.status(500).json(err)
            })
    } catch (err) {
        next(err)
    }
}


module.exports = { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct }