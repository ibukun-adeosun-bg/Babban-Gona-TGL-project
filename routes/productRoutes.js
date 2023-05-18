const express = require("express")
const { verifyToken, verifyAdmin } = require("../middleware/verifyToken")
const { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct } = require("../controllers/productController")
const router = express.Router()

//CREATE A PRODUCT
router.post("/", verifyAdmin, createProduct)

//GET A PRODUCT
router.get("/:productName", verifyToken, getProduct)

//GET ALL PRODUCTS
router.get("/", verifyToken, getAllProducts)

//UPDATE A PRODUCT
router.put("/:productId", verifyAdmin, updateProduct)

//DELETE A PRODUCT
router.delete("/:productId", verifyAdmin, deleteProduct)


module.exports = router