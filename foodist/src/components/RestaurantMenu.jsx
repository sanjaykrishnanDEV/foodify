import React, { useEffect, useState } from "react";
import Error from "./Error";
import { Toaster, toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import useResMenuData from "../Hooks/useResMenuData";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/cartSlice";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  IMG_CDN_URL,
  ITEM_IMG_CDN_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
  swiggy_menu_api_URL,
} from "../constants/constants";
import Shimmer from "./Shimmer";
const RestaurantMenu = () => {
  const dispatch = useDispatch();
  const { resId } = useParams();
  const db = getDatabase();
  const [restaurant, menuItems] = useResMenuData(
    swiggy_menu_api_URL,
    resId,
    RESTAURANT_TYPE_KEY,
    MENU_ITEM_TYPE_KEY
  );
  console.log(restaurant)
  const [tempData, settempData] = useState("");
    const[menuChar,setMenuChar] = useState({})
  const [prices, setprices] = useState(restaurant?.price);

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(Number(restaurant?.price) / 100);
  function handleAddItems(id, name, price, image) {
    dispatch(
      cartActions.addItem({
        id: id,
        name: name,
        price: Number(price / 100),
        quantity: 1,
        image: image,
      })
    );

    toast.success("successfully added");
  }
  useEffect(() => {
   const menuItems = ref(db,'foods/'+resId);
   onValue(menuItems,(snapshot)=>{
    const data = snapshot.val();
    console.log(data)
    setMenuChar(()=>data.menu.tempData)
   })
    setprices(restaurant?.price);
    // writeData();
  }, [menuItems, restaurant]);
  // async function writeData() {
  //   const db = getDatabase();
  //   set(ref(db, "foods/" + resId + "/menu"), {
  //     tempData: tempData,
  //   });
  // }
  if (menuChar.length === 0) {
    return (
      <div className="text-center mt-28">
        <Shimmer />
        <p className="text-xl ">Cooking....</p>
      </div>
    );
  }
  return (
    <div>
      <Toaster />
      <div className="banner h-36 flex flex-wrap justify-evenly items-center bg-slate-900">
        <div>
          <img
            className="h-28 rounded-xl"
            src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
            alt={restaurant?.name}
          />
        </div>
        <div className="flex flex-col text-white font-semibold text-2xl">
          <span>{restaurant?.name}</span>
          <span className="text-base font-thin">{restaurant?.areaName}</span>
          <div className="flex items-center">
            <span
              className={
                restaurant?.avgRating > 4
                  ? "bg-green-500 px-2 rounded-md text-base me-3"
                  : "bg-red-500 px-2 rounded-md text-base me-3"
              }
            >
              {restaurant?.avgRating}
            </span>
            <span>|</span>
            <span className="text-base mx-3">{restaurant?.sla?.slaString}</span>
            <span>|</span>
            <span className="text-base mx-3">
              {restaurant?.costForTwoMessage}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[80vw]">
          <p className="text-2xl ">Recommended</p>

          {Object.values(menuChar).map((item) => {
            return (
              <div
                className="flex mt-2  border rounded-md justify-between items-center bg-white mb-2 shadow-xl p-5"
                key={item?.id}
              >
                <div className="flex flex-col w-2/3">
                  <span className="text-xl">{item?.name}</span>
                  <span className="text-xs">{item?.description}</span>
                  <p className="item-cost">
                    {item?.price > 0
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item?.price / 100)
                      : " "}
                  </p>
                  <p>
                    {item?.isVeg ? (
                      <div className="bg-green-800 w-fit p-1 rounded-2xl text-white">
                        <span>Veg</span>
                      </div>
                    ) : (
                      <div className="bg-green-800 w-fit p-1 rounded-2xl text-white">
                        <span>Non Veg</span>
                      </div>
                    )}
                  </p>
                </div>
                <div className="flex flex-col w-1/3 h-full">
                  <img
                    className="rounded-md object-none"
                    src={ITEM_IMG_CDN_URL + item?.imageId}
                    alt={item?.name}
                  />
                  <button
                    onClick={() =>
                      handleAddItems(
                        item?.id,
                        item?.name,
                        item?.price,
                        item?.imageId
                      )
                    }
                    className="cursor-pointer bg-green-500 rounded-md mt-1"
                  >
                    Add+
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
