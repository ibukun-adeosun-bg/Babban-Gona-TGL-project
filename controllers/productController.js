const db = require("../config/dbConfig")

//CREATE A PRODUCT
const createProduct = async (req, res, next) => {
    try {
        const info = {
            productName: req.body.productName
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
        const name = req.params.productName
        const product = await db.product.findOne({ where: { productName: name }})
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
        const name = req.params.productName
        await db.product.update(
            req.body,
            { where: { productName: name }}
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
        const name = req.params.productName
        await db.product.destroy({ where: { productName: name }})
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