import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {

   const [orders, setOrders] = useState([]);
   const [selectedOrder, setSelectedOrder] = useState(null);

   useEffect(() => {

      fetchOrders();

   }, []);

   const fetchOrders = async () => {

      try {

         const token = localStorage.getItem("token");

         const response = await axios.get(

            "https://restaurant-management-system-luxury.onrender.com/api/orders/my-orders",

            {

               headers: {

                  Authorization: `Bearer ${token}`

               }

            }

         );

         setOrders(response.data);

      } catch (error) {

         console.log(error);

      }

   };

   return (

      <div className="px-8 py-16 min-h-screen">

         <div className="text-center mb-20 fade-up">

            <h1 className="section-title">
               Your Orders
            </h1>

            <p className="section-subtitle">
               View your premium dining history
            </p>

         </div>

         <div className="max-w-5xl mx-auto grid gap-8">

            {

               orders.map((order) => (

                  <div
                     key={order._id}
                     className="glass p-8"
                  >

                     <div className="flex justify-between items-center">

                        <div>

                           <h2 className="text-3xl text-[#F5E6D3] mb-3">
                              ₹ {order.totalPrice}
                           </h2>

                           <p className="text-gray-400">
                              Status: {order.orderStatus}
                           </p>

                           <p className="text-gray-500 mt-2">
                              Payment: {order.paymentStatus}
                           </p>

                        </div>

                        <button
                           className="btn-luxury"
                           onClick={() => setSelectedOrder(order)}
                        >

                           Details

                        </button>

                     </div>

                  </div>

               ))

            }

         </div>

         {/* POPUP MODAL */}

         {

            selectedOrder && (

               <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

                  <div className="glass p-10 w-[500px] relative">

                     <button
                        onClick={() => setSelectedOrder(null)}
                        className="absolute top-4 right-5 text-2xl"
                     >

                        ×

                     </button>

                     <h2 className="text-4xl mb-8 text-[#F5E6D3]">
                        Order Details
                     </h2>

                     <div className="space-y-4">

                        {

                           selectedOrder.orderItems.map((item) => (

                              <div
                                 key={item._id}
                                 className="flex justify-between border-b border-gray-700 pb-3"
                              >

                                 <div>

                                    <h3 className="text-xl">
                                       {item.name}
                                    </h3>

                                    <p className="text-gray-500">
                                       Qty: {item.quantity}
                                    </p>

                                 </div>

                                 <p className="text-[#D4A373]">
                                    ₹ {item.price}
                                 </p>

                              </div>

                           ))

                        }

                     </div>

                     <div className="mt-8">

                        <h3 className="text-2xl text-[#D4A373] mb-3">
                           Estimated Time: 25 - 35 mins
                        </h3>

                        <p className="text-gray-400">
                           Chef is preparing your order with premium ingredients.
                        </p>

                     </div>

                  </div>

               </div>

            )

         }

      </div>

   );

}

export default Orders;