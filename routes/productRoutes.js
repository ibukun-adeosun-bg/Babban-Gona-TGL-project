const express = require("express")
const { verifyToken } = require("../middleware/verifyToken")
const { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct } = require("../controllers/productController")
const router = express.Router()

//CREATE A PRODUCT
router.post("/", verifyToken, createProduct)

//GET A PRODUCT
router.get("/:productId", verifyToken, getProduct)

//GET ALL PRODUCTS
router.get("/", verifyToken, getAllProducts)

//UPDATE A PRODUCT
router.put("/:productId", verifyToken, updateProduct)

//DELETE A PRODUCT
router.delete("/:productId", verifyToken, deleteProduct)


module.exports = router