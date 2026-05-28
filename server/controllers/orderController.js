const Order = require("../models/Order");

// CREATE ORDER
exports.createOrder = async (req, res) => {

   try {

      const order = await Order.create({

         user: req.user.id,

         orderItems: req.body.orderItems,

         totalPrice: req.body.totalPrice,

         paymentMethod: req.body.paymentMethod

      });

      res.status(201).json({

         message: "Order Placed",

         order

      });

   } catch (error) {

      res.status(500).json({
         message: error.message
      });

   }

};

// GET MY ORDERS
exports.getMyOrders = async (req, res) => {

   try {

      const orders = await Order.find({
         user: req.user.id
      });

      res.status(200).json(orders);

   } catch (error) {

      res.status(500).json({
         message: error.message
      });

   }

};

// GET ALL ORDERS
exports.getAllOrders = async (req, res) => {

   try {

      const orders = await Order.find()
      .populate("user", "name email");

      res.status(200).json(orders);

   } catch (error) {

      res.status(500).json({
         message: error.message
      });

   }

};

// UPDATE ORDER STATUS
exports.updateOrderStatus = async (req, res) => {

   try {

      const order = await Order.findById(
         req.params.id
      );

      if (!order) {

         return res.status(404).json({
            message: "Order not found"
         });

      }

      order.orderStatus = req.body.orderStatus;

      await order.save();

      res.status(200).json({

         message: "Order Status Updated",

         order

      });

   } catch (error) {

      res.status(500).json({
         message: error.message
      });

   }

};