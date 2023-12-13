import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Body from "../components/Body";
import Error from "../components/Error";
import Cart from "../components/Cart";
import RestaurantMenu from "../components/RestaurantMenu";
import Checkout from "../components/Checkout";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../components/Profile";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Body />} />
      {/* <Route path="/checkout" element={<Checkout />} /> */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/error" element={<Error />} />
      <Route path="/restaurant/:resId" element={<RestaurantMenu />} />
      <Route path="/*" element={<ProtectedRoute />}>
        <Route path="checkout" element={<Checkout />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default Routers;
