import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Home({ cart, setCart }) {

   const [products, setProducts] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState("All");
   const [showPayment, setShowPayment] = useState(false);
   const [paymentMethod, setPaymentMethod] = useState("UPI");

   useEffect(() => {

      fetchProducts();

   }, []);

   const fetchProducts = async () => {

      try {

         const response = await axios.get(
            "https://restaurant-management-system-luxury.onrender.com/api/products"
         );

         setProducts(response.data);

      } catch (error) {

         console.log(error);

      }

   };

   const addToCart = (product) => {

      setCart([...cart, product]);

      toast.success("Added To Cart");

   };

   const removeFromCart = (index) => {

      const updatedCart = [...cart];

      updatedCart.splice(index, 1);

      setCart(updatedCart);

      toast.success("Item Removed");

   };

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
               paymentMethod,
               paymentStatus: "Paid"

            },

            {

               headers: {

                  Authorization: `Bearer ${token}`

               }

            }

         );

         toast.success("Payment Successful");
         toast.success("Order Placed");

         setCart([]);
         setShowPayment(false);

      } catch (error) {

         console.log(error);

         toast.error("Order Failed");

      }

   };

   const filteredProducts =

      selectedCategory === "All"

         ? products

         : products.filter(

              (product) =>

                 product.category === selectedCategory

           );

   return (

      <div className="px-8 py-16">

         <div className="text-center mb-16 fade-up">

            <h1 className="section-title">
               Luxury Fine Dining
            </h1>

            <p className="section-subtitle">
               Premium Indian & Chinese Cuisine Experience
            </p>

         </div>

         {/* CATEGORY BUTTONS */}

         <div className="flex flex-wrap justify-center gap-4 mb-14">

            {

               [

                  "All",
                  "Indian",
                  "Chinese",
                  "Japanese",
                  "Thai",
                  "Drinks",
                  "Dessert"

               ].map((category) => (

                  <button
                     key={category}
                     onClick={() => setSelectedCategory(category)}
                     className={`px-6 py-3 rounded-full transition ${
                        selectedCategory === category
                           ? "bg-[#D4A373] text-black"
                           : "bg-[#1A1A1A] text-white"
                     }`}
                  >

                     {category}

                  </button>

               ))

            }

         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* MENU */}

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">

               {

                  filteredProducts.map((product) => (

                     <div
                        key={product._id}
                        className="menu-card"
                     >

                        <img
                           src={product.image}
                           alt={product.name}
                           className="w-full h-56 object-cover rounded-t-[20px]"
                        />

                        <div className="menu-card-content">

                           <h2 className="menu-card-title">
                              {product.name}
                           </h2>

                           <p className="text-gray-400">
                              {product.description}
                           </p>

                           <div className="flex justify-between items-center mt-6">

                              <h3 className="menu-card-price text-2xl">
                                 ₹ {product.price}
                              </h3>

                              <button
                                 onClick={() => addToCart(product)}
                                 className="btn-luxury"
                              >

                                 Add

                              </button>

                           </div>

                        </div>

                     </div>

                  ))

               }

            </div>

            {/* CART */}

            <div className="glass p-8 h-fit sticky top-24">

               <h2 className="text-4xl mb-8 text-center text-[#F5E6D3]">
                  Your Table
               </h2>

               {

                  cart.length === 0 ? (

                     <p className="text-center text-gray-500">
                        No dishes selected
                     </p>

                  ) : (

                     cart.map((item, index) => (

                        <div
                           key={index}
                           className="flex justify-between border-b border-gray-800 py-4 items-center"
                        >

                           <div>

                              <h3>
                                 {item.name}
                              </h3>

                              <p className="text-[#D4A373]">
                                 ₹ {item.price}
                              </p>

                           </div>

                           <button
                              onClick={() => removeFromCart(index)}
                              className="bg-red-600 px-4 py-2 rounded-full text-sm hover:bg-red-500 transition"
                           >

                              Delete

                           </button>

                        </div>

                     ))

                  )

               }

               <div className="mt-10">

                  <h3 className="text-3xl font-bold text-center mb-6">
                     ₹ {totalPrice}
                  </h3>

                  <button
                     onClick={() => setShowPayment(true)}
                     disabled={cart.length === 0}
                     className="btn-luxury w-full disabled:opacity-50"
                  >

                     Checkout

                  </button>

               </div>

            </div>

         </div>

         {/* PAYMENT MODAL */}

         {

            showPayment && (

               <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

                  <div className="glass p-10 w-[400px]">

                     <h2 className="text-4xl text-center mb-8 text-[#F5E6D3]">
                        Payment
                     </h2>

                     <div className="space-y-4">

                        {

                           ["UPI", "Card", "Cash"].map((method) => (

                              <button
                                 key={method}
                                 onClick={() => setPaymentMethod(method)}
                                 className={`w-full py-4 rounded-xl transition ${
                                    paymentMethod === method
                                       ? "bg-[#D4A373] text-black"
                                       : "bg-[#1A1A1A] text-white"
                                 }`}
                              >

                                 {method}

                              </button>

                           ))

                        }

                     </div>

                     <div className="mt-8">

                        <h3 className="text-2xl text-center mb-6">
                           Total: ₹ {totalPrice}
                        </h3>

                        <button
                           onClick={placeOrder}
                           className="btn-luxury w-full"
                        >

                           Pay Now

                        </button>

                        <button
                           onClick={() => setShowPayment(false)}
                           className="w-full mt-4 py-3 bg-red-600 rounded-xl"
                        >

                           Cancel

                        </button>

                     </div>

                  </div>

               </div>

            )

         }

      </div>

   );

}

export default Home;