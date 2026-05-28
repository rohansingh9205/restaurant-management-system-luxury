const express = require("express");

const router = express.Router();

const {
   createProduct,
   getProducts,
   updateProduct,
   deleteProduct
} = require("../controllers/productController");

const {
   protect,
   adminOnly
} = require("../middleware/authMiddleware");

// GET PRODUCTS
router.get("/", getProducts);

// CREATE PRODUCT
router.post(
   "/",
   protect,
   adminOnly,
   createProduct
);

// UPDATE PRODUCT
router.put(
   "/:id",
   protect,
   adminOnly,
   updateProduct
);

// DELETE PRODUCT
router.delete(
   "/:id",
   protect,
   adminOnly,
   deleteProduct
);

module.exports = router;