import React from "react";

function Navbar() {

   const user = JSON.parse(
      localStorage.getItem("user")
   );

   const handleLogout = () => {

      localStorage.removeItem("token");

      localStorage.removeItem("user");

      window.location.href = "/login";

   };

   return (

      <nav className="flex justify-between items-center px-10 py-6 bg-black text-white shadow-lg">

         <h1
            className="text-3xl font-black cursor-pointer"
            onClick={() => window.location.href = "/"}
         >

            Restaurant Luxury

         </h1>

         <div className="flex gap-4 items-center">

            <button
               onClick={() => window.location.href = "/"}
               className="px-5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
            >

               Home

            </button>

            <button
               onClick={() => window.location.href = "/orders"}
               className="px-5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
            >

               Orders

            </button>

            {

               user ? (

                  <>

                     <span className="text-yellow-400 font-bold">

                        {user.name}

                     </span>

                     <button
                        onClick={handleLogout}
                        className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition"
                     >

                        Logout

                     </button>

                  </>

               ) : (

                  <>

                     <button
                        onClick={() => window.location.href = "/login"}
                        className="px-5 py-2 rounded-xl bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition"
                     >

                        Login

                     </button>

                     <button
                        onClick={() => window.location.href = "/register"}
                        className="px-5 py-2 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition"
                     >

                        Register

                     </button>

                  </>

               )

            }

         </div>

      </nav>

   );

}

export default Navbar;