const Product = require("../models/Product");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {

   try {

      const product = await Product.create(req.body);

      res.status(201).json({
         message: "Product Created",
         product
      });

   } catch (error) {

      res.status(500).json({
         message: error.message
      });

   }

};

// GET PRODUCTS
exports.getProducts = async (req, res) => {

   try {

      const products = await Product.find();

      res.status(200).json(products);

   } catch (error) {

      res.status(500).json({
         message: error.message
      });

   }

};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {

   try {

      const product = await Product.findByIdAndUpdate(

         req.params.id,

         req.body,

         {
            new: true
         }

      );

      if (!product) {

         return res.status(404).json({
            message: "Product not found"
         });

      }

      res.status(200).json({

         message: "Product Updated",

         product

      });

   } catch (error) {

      res.status(500).json({
         message: error.message
      });

   }

};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {

   try {

      const product = await Product.findByIdAndDelete(
         req.params.id
      );

      if (!product) {

         return res.status(404).json({
            message: "Product not found"
         });

      }

      res.status(200).json({
         message: "Product Deleted"
      });

   } catch (error) {

      res.status(500).json({
         message: error.message
      });

   }

};