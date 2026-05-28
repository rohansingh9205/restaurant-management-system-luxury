import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

function Login() {

   const [email, setEmail] = useState("");

   const [password, setPassword] = useState("");

   const handleLogin = async (e) => {

      e.preventDefault();

      try {

         const response = await axios({

            method: "POST",

            url: "https://restaurant-management-system-luxury.onrender.com/api/auth/login",

            data: {
               email,
               password,
               role: "user"
            },

            headers: {
               "Content-Type": "application/json"
            }

         });

         localStorage.setItem(
            "token",
            response.data.token
         );

         localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
         );

         toast.success("Login Successful");

         window.location.href = "/";

      } catch (error) {

         console.log(error);

         toast.error(
            error.response?.data?.message || "Login Failed"
         );

      }

   };

   return (

      <div className="min-h-screen flex justify-center items-center px-6">

         <div className="glass p-12 w-full max-w-md fade-up">

            <h1 className="section-title mb-10">

               Welcome Back

            </h1>

            <form
               onSubmit={handleLogin}
               className="space-y-6"
            >

               <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

                  Login

               </button>

            </form>

            <p className="text-center text-gray-400 mt-6">

               New User?

               <span
                  onClick={() => window.location.href = "/register"}
                  className="text-[#D4A373] cursor-pointer ml-2"
               >

                  Create Account

               </span>

            </p>

         </div>

      </div>

   );

}

export default Login;