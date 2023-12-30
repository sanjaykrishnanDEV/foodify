import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link,Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {toast, Toaster} from "react-hot-toast";
const Checkout = () => {
  const [discount, setDiscount] = useState(15);
  const totalItems = useSelector((store) => store.cart.totalQty);
  const totalAmount = useSelector((store) => store.cart.totalAmount);
     const navigate = useNavigate();
  useEffect(() => {
    if (totalAmount > 100) {
      setDiscount(0);
    }
  }, [totalAmount]);
  function handleSubmit(){
    if(totalAmount>0){
    toast.success("order placed, Thank you 🙏");
     navigate("/");
    }
    else{
      toast.error("No items in cart, What about a briyani🛐")
    }
  }
  return (
    <div className="flex flex-row p-10 flex-wrap justify-evenly items-center ">
      <Toaster/>
      <div className=" w-1/2 h-fit">
        <form className="flex flex-col py-3 p-2 text-xl">
          <p>Billing Information</p>
          <input
            type="text"
            placeholder="Enter name"
            className="mb-3 p-1 rounded-md border border-black"
          />
          <input
            type="text"
            placeholder="Enter address"
            className="mb-3 p-1 rounded-md border border-black"
          />
          <input
            type="text"
            placeholder="Enter email"
            className="mb-3 p-1 rounded-md border border-black"
          />
          <input
            type="text"
            placeholder="Enter pincode"
            className="mb-3 p-1 rounded-md border border-black"
          />
          <input
            type="text"
            placeholder="Enter personal note"
            className="p-1 rounded-md border border-black"
          />
        </form>
      </div>
      <div className="w-fit   p-10 text-white bg-blue-950 h-fit rounded-md">
        <p className="m-2">Total Quantity: {totalItems}</p>
        <p className="m-2">SubTotal: {totalAmount}</p>
        <p className="m-2">Shipping: {discount}</p>
        <hr />

        <h1 className="text-xl font-light">
          Total:{totalItems > 0 ? totalAmount + discount : 0}
        </h1>
        <hr />
        <button
          onClick={handleSubmit}
          className="bg-red-500 rounded-md p-1 text-lime-50 mt-2 w-full">
          Place Order
        </button>
        <Link to={"/"}>
          <button className="bg-green-500 rounded-md p-1 text-lime-50 mt-2 w-full">
            continue shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
