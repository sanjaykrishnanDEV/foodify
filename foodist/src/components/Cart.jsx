import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import chef from "../../src/assets/chef.jpg";
import { cartActions } from "../redux/cartSlice";
const Cart = () => {
  const [cartData, setCartData] = useState({});
  const data = useSelector((store) => store.cart);
  const total = useSelector((store) => store.cart.totalAmount);
  const qty = useSelector((store) => store.cart.totalQty);
  const dispatch = useDispatch();
  useEffect(() => {
    setCartData(data);
  }, [data]);
  if (!cartData) {
    console.log(cartData);
    // const mapper = Object.values(cartData?.cartItems);
  }
  console.log(cartData);
  function handleDelete(id) {
    dispatch(cartActions.deleteItem(id));
  }
  return (
    <div className="min-h-[90vh]">
      <div className="flex justify-center">
        <img src={chef} className="  h-[70vh]  absolute opacity-10 top-4 " />
      </div>
      <div className="py-10 px-5">
        <span className="text-4xl font-serif ">Your Cart</span>
        <hr />
        <table className="border w-full">
          <thead>
            <tr>
              <td scope="col">Item</td>
              <td scope="col">Dish Name</td>
              <td scope="col">Dish price</td>
              <td scope="col">Quantity</td>
              <td scope="col">Actions</td>
            </tr>
          </thead>
          <tbody className="border w-full">
            {cartData?.cartItems?.length === 0 ? (
              <tr>
                <td className="bg-red-400 text-center" colSpan={5}>
                  <span className="text-center ">No items added</span>
                </td>
              </tr>
            ) : (
              cartData?.cartItems?.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item?.id}</td>
                    <td>{item?.name}</td>
                    <td>{item?.price}</td>
                    <td>{item?.quantity}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(item?.id)}
                        className="bg-red-400 rounded-md w-fit text-center p-1"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} className="text-end">
                <p>Total:</p>
              </td>
              <td>{total}</td>
              <td>{qty}</td>
              <Link to="/checkout">
                <td>
                  <button className="bg-green-700 rounded-md p-1 text-white">
                    checkout
                  </button>
                </td>
              </Link>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Cart;
