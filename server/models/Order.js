const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(

{
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
   },

   orderItems: [

      {
         product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
         },

         name: String,

         quantity: Number,

         price: Number
      }

   ],

   totalPrice: {
      type: Number,
      required: true
   },

   paymentMethod: {
      type: String,
      default: "Cash"
   },

   paymentStatus: {
      type: String,
      default: "Pending"
   },

   orderStatus: {
      type: String,
      default: "Preparing"
   }

},
{ timestamps: true }

);

module.exports = mongoose.model(
   "Order",
   orderSchema
);