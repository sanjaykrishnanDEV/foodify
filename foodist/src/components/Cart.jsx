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
    // const mapper = Object.values(cartData?.cartItems);
  }
  function handleDelete(id) {
    dispatch(cartActions.deleteItem(id));
  }
  function handleminus(id){
    //alert('love'+item.id)
    dispatch(cartActions.minusItem(id))
  }
  function plusItem(id){
    //alert('love'+item.id)
    dispatch(cartActions.plusItem(id))
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
              <td scope="col" className="text-center">Quantity</td>
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
                    <td>
                      {" "}
                      <div className="flex justify-around items-center">
                        <button
                          onClick={() => handleminus(item.id)}
                          className="rounded-full border px-3 cursor-pointer bg-red-400 hover:bg-red-700"
                        >
                          -
                        </button>
                        {item.quantity}
                        <button
                          onClick={() => plusItem(item.id)}
                          className="rounded-full border px-3 cursor-pointer bg-green-400 hover:bg-green-700"
                        >
                          +
                        </button>
                      </div>
                    </td>
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
              <td>
                <Link to="/checkout">
                  <button className="bg-green-700 rounded-md p-1 text-white">
                    checkout
                  </button>
                </Link>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Cart;
