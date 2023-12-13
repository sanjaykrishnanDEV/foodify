import React, { useEffect, useState } from "react";
import Card from "./Card";
import Error from "../components/Error";
import { Link } from "react-router-dom";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { db } from "../constants/firebase";
import Shimmer from "./Shimmer";

const Body = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] =
    useState(allRestaurants);

  useEffect(() => {
    const restaurantList = ref(db, "foods/");
    onValue(restaurantList, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setAllRestaurants(data);
      setFilteredRestaurants(data);
    });
  }, []);
  function handleSearch() {
    const filtered = Object.values(allRestaurants).filter((res) => {
      return res.name?.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredRestaurants(filtered);
  }

  return (
    <div>
      <div className="m-4  flex justify-center">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          className="border w-1/3 rounded-s-lg p-1 "
          placeholder="search "
        />
        <button
          onClick={handleSearch}
          className="bg-red-500 rounded-e-md px-2 text-white"
        >
          search
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        {Object.values(filteredRestaurants).length === 0 ? (
          <div className="h-[60vh]"><Shimmer/></div>
        ) : (
          Object.values(filteredRestaurants).map((restaurant) => (
            <Link to={"/restaurant/" + restaurant?.id} key={restaurant?.id}>
              <Card info={restaurant} key={restaurant?.id} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Body;

//fetched data and write in fb db
