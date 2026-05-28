import axios from "axios";

function Cart({ cart }) {

   const totalPrice = cart.reduce(

      (total, item) => total + item.price,

      0

   );

   const placeOrder = async () => {

      try {

         const token = localStorage.getItem("token");

         const orderItems = cart.map((item) => ({

            product: item._id,

            name: item.name,

            quantity: 1,

            price: item.price

         }));

         await axios.post(

            "https://restaurant-management-system-luxury.onrender.com/api/orders",

            {

               orderItems,

               totalPrice,

               paymentMethod: "Cash"

            },

            {

               headers: {

                  Authorization: `Bearer ${token}`

               }

            }

         );

         alert("⚡ Order Placed Successfully");

      } catch (error) {

         alert("Order Failed");

      }

   };

   return (

      <div className="bg-black text-white p-8">

         <h1 className="text-5xl font-black mb-10 text-center bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent">

            ARC REACTOR CART

         </h1>

         <div className="space-y-6 max-w-3xl mx-auto">

            {

               cart.map((item, index) => (

                  <div
                     key={index}
                     className="bg-white/10 border border-orange-500 rounded-3xl p-6 backdrop-blur-lg shadow-[0_0_25px_rgba(255,100,0,0.2)]"
                  >

                     <h3 className="text-3xl font-bold text-yellow-300">

                        {item.name}

                     </h3>

                     <p className="text-orange-400 text-2xl mt-2">

                        ₹ {item.price}

                     </p>

                  </div>

               ))

            }

         </div>

         <div className="text-center mt-12">

            <h2 className="text-4xl font-black text-yellow-300 mb-8">

               Total: ₹ {totalPrice}

            </h2>

            <button
               onClick={placeOrder}
               className="px-10 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-black text-2xl font-black hover:scale-105 transition duration-300 shadow-[0_0_30px_rgba(255,120,0,0.4)]"
            >

               PLACE ORDER ⚡

            </button>

         </div>

      </div>

   );

}

export default Cart;