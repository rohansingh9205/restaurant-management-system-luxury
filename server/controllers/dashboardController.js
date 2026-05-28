const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/user");

exports.getDashboardStats = async (req, res) => {

   try {

      // TOTAL ORDERS
      const totalOrders = await Order.countDocuments();

      // TOTAL PRODUCTS
      const totalProducts = await Product.countDocuments();

      // TOTAL USERS
      const totalUsers = await User.countDocuments();

      // TOTAL REVENUE
      const orders = await Order.find();

      const totalRevenue = orders.reduce(

         (acc, item) => acc + item.totalPrice,

         0

      );

      res.status(200).json({

         totalOrders,

         totalProducts,

         totalUsers,

         totalRevenue

      });

   } catch (error) {

      res.status(500).json({
         message: error.message
      });

   }

};