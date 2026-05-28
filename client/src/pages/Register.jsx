import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Register() {

   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [phone, setPhone] = useState("");
   const [password, setPassword] = useState("");

   const handleRegister = async (e) => {

      e.preventDefault();

      try {

         await axios.post(

   "https://restaurant-management-system-luxury.onrender.com/api/auth/register",

   {
      name,
      email,
      phone,
      password,
      role: "user"
   },

   {
      headers: {
         "Content-Type": "application/json"
      }
   }

);

         toast.success("Account Created");

         window.location.href = "/login";

      } catch (error) {

         toast.error(
            error.response?.data?.message || "Registration Failed"
         );

      }

   };

   return (

      <div className="min-h-screen flex justify-center items-center px-6">

         <div className="glass p-12 w-full max-w-md fade-up">

            <h1 className="section-title mb-10">
               Create Account
            </h1>

            <form
               onSubmit={handleRegister}
               className="space-y-6"
            >

               <input
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-[#1A1A1A] border border-gray-700 outline-none text-white"
               />

               <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-[#1A1A1A] border border-gray-700 outline-none text-white"
               />

               <input
                  type="text"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-[#1A1A1A] border border-gray-700 outline-none text-white"
               />

               <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-[#1A1A1A] border border-gray-700 outline-none text-white"
               />

               <button
                  type="submit"
                  className="btn-luxury w-full"
               >

                  Register

               </button>

            </form>

         </div>

      </div>

   );

}

export default Register;