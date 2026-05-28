import { Link } from "react-router-dom";

function Navbar() {

   return (

      <div className="navbar">

         <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

            <h1 className="text-4xl font-bold text-[#D4A373]">

               ÉLITE DINING

            </h1>

            <div className="flex gap-10 text-lg">

               <Link
                  to="/"
                  className="nav-link"
               >
                  Home
               </Link>

               <Link
                  to="/orders"
                  className="nav-link"
               >
                  Orders
               </Link>

               <Link
                  to="/login"
                  className="nav-link"
               >
                  Login
               </Link>
               <button
               onClick={() => {

               localStorage.removeItem("token");

               localStorage.removeItem("user");

               window.location.href = "/login";

                }}
                className="nav-link"
               >

                Logout

               </button>

            </div>

         </div>

      </div>

   );

}

export default Navbar;