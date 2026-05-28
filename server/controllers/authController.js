exports.registerUser = async (req, res) => {

   try {

      console.log("BODY => ", req.body);

      const {
         name,
         email,
         phone,
         password,
         role
      } = req.body;

      console.log(name, email, phone);

      const existingUser = await User.findOne({
         $or: [{ email }, { phone }]
      });

      console.log("EXISTING USER => ", existingUser);

      if (existingUser) {

         return res.status(400).json({
            message: "User already exists"
         });

      }

      const hashedPassword = await bcrypt.hash(
         password,
         10
      );

      console.log("HASH DONE");

      const user = await User.create({

         name,
         email,
         phone,
         password: hashedPassword,
         role

      });

      console.log("USER CREATED");

      res.status(201).json({

         message: "User Registered Successfully",

         user

      });

   } catch (error) {

      console.log("FULL REGISTER ERROR => ");

      console.log(error);

      res.status(500).json({
         message: error.message
      });

   }

};