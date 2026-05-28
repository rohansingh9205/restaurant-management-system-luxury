const User = require("../models/User");

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

      /* REQUIRED FIELDS */

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

      /* PHONE VALIDATION */

      const phoneRegex = /^[0-9]{10}$/;

      if (!phoneRegex.test(phone)) {

         return res.status(400).json({
            message: "Phone must contain only 10 numbers"
         });

      }

      /* EMAIL VALIDATION */

      const emailRegex =
         /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {

         return res.status(400).json({
            message: "Invalid email format"
         });

      }

      /* CHECK EXISTING EMAIL */

      const existingEmail = await User.findOne({
         email
      });

      if (existingEmail) {

         return res.status(400).json({
            message: "Email already exists"
         });

      }

      /* CHECK EXISTING PHONE */

      const existingPhone = await User.findOne({
         phone
      });

      if (existingPhone) {

         return res.status(400).json({
            message: "Phone already exists"
         });

      }

      /* HASH PASSWORD */

      const hashedPassword = await bcrypt.hash(
         password,
         10
      );

      /* CREATE USER */

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

      /* REQUIRED FIELDS */

      if (!email || !password) {

         return res.status(400).json({
            message: "All fields required"
         });

      }

      /* FIND USER */

      const user = await User.findOne({ email });

      if (!user) {

         return res.status(404).json({
            message: "User not found"
         });

      }

      /* ROLE CHECK */

      if (user.role !== role) {

         return res.status(403).json({
            message: "Invalid Role Access"
         });

      }

      /* PASSWORD CHECK */

      const isMatch = await bcrypt.compare(
         password,
         user.password
      );

      if (!isMatch) {

         return res.status(400).json({
            message: "Invalid Password"
         });

      }

      /* GENERATE TOKEN */

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

      /* RESPONSE */

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