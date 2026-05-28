const jwt = require("jsonwebtoken");

// PROTECT ROUTE
exports.protect = async (req, res, next) => {

   try {

      let token;

      if (
         req.headers.authorization &&
         req.headers.authorization.startsWith("Bearer")
      ) {

         token = req.headers.authorization.split(" ")[1];

      }

      if (!token) {

         return res.status(401).json({
            message: "Not authorized"
         });

      }

      const decoded = jwt.verify(
         token,
         process.env.JWT_SECRET
      );

      req.user = decoded;

      next();

   } catch (error) {

      res.status(401).json({
         message: "Invalid Token"
      });

   }

};

// ADMIN ONLY
exports.adminOnly = (req, res, next) => {

   if (req.user.role !== "admin") {

      return res.status(403).json({
         message: "Admin access only"
      });

   }

   next();

};