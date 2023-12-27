import React from "react";

const Card = (info) => {
  return (
    <div className=" hover:scale-110 cursor-pointer hover:bg-slate-400 flex flex-col  justify-evenly items-center shadow-lg text-black font-semibold w-64 p-4 rounded-xl m-1">
      <img
        className="h-28 w-full"
        src={
          "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/" +
          info.info?.cloudinaryImageId
        }
      />
      <h2>{info.info?.name}</h2>
      <div className="flex flex-col justify-evenly flex-wrap font-thin w-full overflow-hidden">
        <h4>{info.info?.cuisines}</h4>
        <h4>{info.info?.areaName}</h4>
      </div>
      <div className="flex font-mono font-thin justify-between w-full mt-2 shadow-xl ">
        <h4
          className={
            info.info?.avgRating >= 4
              ? "bg-green-400 rounded-lg px-2"
              : "bg-red-400 rounded-lg px-2"
          }
        >
          {info.info?.avgRating}
        </h4>

        <span className=" text-xs ">{info.info?.costForTwo}</span>
        <h4 className=" text-sm">{info.info?.sla?.slaString}</h4>
      </div>
    </div>
  );
};

export default Card;
