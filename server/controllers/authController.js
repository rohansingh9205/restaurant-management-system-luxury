const User = require("../models/user");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

/* =========================
   REGISTER USER
========================= */

exports.registerUser = async (req, res) => {

   try {

      const {
         name,
         email,
         phone,
         password,
         role
      } = req.body || {};

      if (
         !name ||
         !email ||
         !phone ||
         !password
      ) {

         return res.status(400).json({
            message: "All fields required"
         });

      }

      const existingUser = await User.findOne({
         $or: [{ email }, { phone }]
      });

      if (existingUser) {

         return res.status(400).json({
            message: "User already exists"
         });

      }

      const hashedPassword = await bcrypt.hash(
         password,
         10
      );

      const user = await User.create({

         name,
         email,
         phone,

         password: hashedPassword,

         role: role || "user"

      });

      res.status(201).json({

         message: "User Registered Successfully",

         user

      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: error.message
      });

   }

};

/* =========================
   LOGIN USER
========================= */

exports.loginUser = async (req, res) => {

   try {

      const {
         email,
         password,
         role
      } = req.body || {};

      if (!email || !password) {

         return res.status(400).json({
            message: "All fields required"
         });

      }

      const user = await User.findOne({ email });

      if (!user) {

         return res.status(404).json({
            message: "User not found"
         });

      }

      if (user.role !== role) {

         return res.status(403).json({
            message: "Invalid Role Access"
         });

      }

      const isMatch = await bcrypt.compare(
         password,
         user.password
      );

      if (!isMatch) {

         return res.status(400).json({
            message: "Invalid Password"
         });

      }

      const token = jwt.sign(

         {
            id: user._id,
            role: user.role
         },

         process.env.JWT_SECRET,

         {
            expiresIn: "7d"
         }

      );

      res.status(200).json({

         message: "Login Successful",

         token,

         user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
         }

      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: error.message
      });

   }

};