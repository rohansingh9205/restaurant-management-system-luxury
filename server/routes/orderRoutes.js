const express = require("express");

const router = express.Router();

const {
   createOrder,
   getMyOrders,
   getAllOrders,
   updateOrderStatus
} = require("../controllers/orderController");

const {
   protect,
   adminOnly
} = require("../middleware/authMiddleware");

// CREATE ORDER
router.post(
   "/",
   protect,
   createOrder
);

// USER ORDERS
router.get(
   "/my-orders",
   protect,
   getMyOrders
);

// ADMIN ALL ORDERS
router.get(
   "/all",
   protect,
   adminOnly,
   getAllOrders
);

// UPDATE ORDER STATUS
router.put(
   "/:id/status",
   protect,
   adminOnly,
   updateOrderStatus
);

module.exports = router;