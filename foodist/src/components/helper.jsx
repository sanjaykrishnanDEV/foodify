import React from "react";
import useResMenuData from "../Hooks/useResMenuData";
import {
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
  swiggy_api_URL,
} from "../constants/constants";

const Helper = () => {
  const [restaurant, menuItems] = useResMenuData(
    swiggy_api_URL,
    64770,
    RESTAURANT_TYPE_KEY,
    MENU_ITEM_TYPE_KEY
  );
  console.log(restaurant);
  return <div>helper</div>;
};

export default Helper;
