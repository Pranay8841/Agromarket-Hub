import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { getUserOrders } from "../../../services/operations/ProfileAPI";

export default function FarmerOrders() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [orders, setOrders] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await getUserOrders(token);
      console.log("Order Responce", res)
      setOrders(res);
    } catch (error) {
      console.log("Could not fetch User orders.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <div className="text-3xl text-white text-center font-bold">Farmer Orders</div>
      {!orders ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !orders.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-white">
          You have no orders yet.
        </p>
      ) : (
        <div className="my-8 text-white">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblue-400 border-[1px] border-richblue-300">
            <p className="w-[45%] px-5 py-3">Product</p>
            <p className="w-1/4 px-2 py-3">Order ID</p>
            <p className="flex-1 px-2 py-3">Status</p>
          </div>
          {/* Order Details */}
          {orders.map((order, i, arr) => (
            <div
              className={`flex items-center bg-richblue-400 border-[1px] border-richblue-300 ${i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                }`}
              key={order._id}
            >
              <div
                className="flex w-[38%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  // Handle click to view order details if needed
                }}
              >
                <img
                  src={order.thumbnail}
                  alt="product_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />

                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold text-white">{order.productName}</p>
                  <p className="text-xs text-richblack-200">
                    {order.productDescription.length > 50
                      ? `${order.productDescription.slice(0, 50)}...`
                      : order.productDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/3 px-1 py-3 text-richblack-200">${order._id}</div>
              <div className="flex w-[30%] flex-col gap-2 px-1 py-3">
                <p>Status: {order.orderStatus}</p>
                {/* You can add more detailed status if required */}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
