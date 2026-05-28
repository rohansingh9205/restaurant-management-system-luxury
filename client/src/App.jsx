import { useState } from "react";

import {

   BrowserRouter,

   Routes,

   Route,

   Navigate

} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";

import Orders from "./pages/Orders";

import Login from "./pages/Login";

import Register from "./pages/Register";

function App() {

   const [cart, setCart] = useState([]);

   const token = localStorage.getItem("token");

   return (

      <BrowserRouter>

         <Toaster />

         {

            token && <Navbar />

         }

         <Routes>

            <Route

               path="/login"

               element={<Login />}

            />

            <Route

               path="/register"

               element={<Register />}

            />

            <Route

               path="/"

               element={

                  token ? (

                     <Home
                        cart={cart}
                        setCart={setCart}
                     />

                  ) : (

                     <Navigate to="/login" />

                  )

               }

            />

            <Route

               path="/orders"

               element={

                  token ? (

                     <Orders />

                  ) : (

                     <Navigate to="/login" />

                  )

               }

            />

         </Routes>

      </BrowserRouter>

   );

}

export default App;