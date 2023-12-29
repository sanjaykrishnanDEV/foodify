import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiFoodTruck } from "react-icons/gi";
import { useSelector } from "react-redux";
import useAuth from "../Hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../constants/firebase";
import { Toaster, toast } from "react-hot-toast";

const Header = () => {
  const totalItems = useSelector((store) => store.cart.totalQty);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  async function handleSignout() {
    try {
      await signOut(auth);
      toast.success("Sign-out successful");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="flex w-screen  justify-between shadow-xl bg-slate-100 h-10 items-center">
      <Toaster />
      <Link to={"/"}>
        <div className="flex items-center">
          <GiFoodTruck color="orange" size={38} className="ms-3" />
          <span className="font-bold font-serif  md:mt-2 mt-1 ms-3 text-xl text-emerald-900">
            Foodify
          </span>
        </div>
      </Link>

      <div className="border w-1/3 flex justify-around items-center h-10">
        <Link to={"cart"}>
          <button>
            <div className="h-10 flex justify-center items-center">
              <div className="relative py-2">
                <div className="t-0 absolute left-3">
                  <p className="flex h-2 w-2 items-center justify-center rounded-full  bg-red-400  text-white p-3 text-xs ">
                    {totalItems}
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="file: mt-0 h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
            </div>
          </button>
        </Link>

        {currentUser?.email ? (
          <>
            <Link to={"/profile"}>
              <button>My profile</button>
            </Link>
            <Link>
              <button onClick={handleSignout}>Sign out</button>
            </Link>
            {/* <Link to={"profile"}>
              <button >My profile</button>
            </Link> */}
          </>
        ) : (
          <>
            <Link to={"login"}>
              <button>Login</button>
            </Link>
            <Link to={"signup"}>
              <button>Sign up</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
