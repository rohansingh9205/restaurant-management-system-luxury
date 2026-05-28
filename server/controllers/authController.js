const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER USER
exports.registerUser = async (req, res) => {

   try {

      const {
         name,
         email,
         phone,
         password,
         role,
         adminSecret
      } = req.body;

      // Check Existing User
      const existingUser = await User.findOne({
         $or: [{ email }, { phone }]
      });

      if (existingUser) {

         return res.status(400).json({
            message: "User already exists"
         });

      }

      // Admin Secret Validation
      if (role === "admin") {

         if (adminSecret !== process.env.ADMIN_SECRET) {

            return res.status(403).json({
               message: "Invalid Admin Secret"
            });

         }

      }

      // Hash Password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create User
      const user = await User.create({

         name,
         email,
         phone,

         password: hashedPassword,

         role

      });

      res.status(201).json({

         message: "User Registered Successfully",

         user

      });

   } catch (error) {

      res.status(500).json({
         message: error.message
      });

   }

};

// LOGIN USER
exports.loginUser = async (req, res) => {

   try {

      const {
         email,
         password,
         role
      } = req.body;

      // Check User
      const user = await User.findOne({ email });

      if (!user) {

         return res.status(404).json({
            message: "User not found"
         });

      }

      // Check Role
      if (user.role !== role) {

         return res.status(403).json({
            message: "Invalid Role Access"
         });

      }

      // Compare Password
      const isMatch = await bcrypt.compare(
         password,
         user.password
      );

      if (!isMatch) {

         return res.status(400).json({
            message: "Invalid Password"
         });

      }

      // Generate JWT Token
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

      res.status(500).json({
         message: error.message
      });

   }

};