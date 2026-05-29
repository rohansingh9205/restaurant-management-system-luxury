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

      <nav className="bg-black text-white shadow-lg px-4 md:px-10 py-4">

         <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <h1
               className="text-2xl md:text-3xl font-black cursor-pointer text-center md:text-left"
               onClick={() => window.location.href = "/"}
            >

               Restaurant Luxury

            </h1>

            <div className="flex flex-wrap justify-center gap-2 md:gap-4">

               <button
                  onClick={() => window.location.href = "/"}
                  className="px-4 md:px-5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition text-sm md:text-base"
               >

                  Home

               </button>

               <button
                  onClick={() => window.location.href = "/orders"}
                  className="px-4 md:px-5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition text-sm md:text-base"
               >

                  Orders

               </button>

               {

                  user ? (

                     <button
                        onClick={handleLogout}
                        className="px-4 md:px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition text-sm md:text-base"
                     >

                        Logout

                     </button>

                  ) : (

                     <>

                        <button
                           onClick={() => window.location.href = "/login"}
                           className="px-4 md:px-5 py-2 rounded-xl bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition text-sm md:text-base"
                        >

                           Login

                        </button>

                        <button
                           onClick={() => window.location.href = "/register"}
                           className="px-4 md:px-5 py-2 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition text-sm md:text-base"
                        >

                           Register

                        </button>

                     </>

                  )

               }

            </div>

         </div>

      </nav>

   );

}

export default Navbar;