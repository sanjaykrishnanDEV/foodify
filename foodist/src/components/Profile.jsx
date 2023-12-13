import React, { useEffect, useState } from "react";
import { ref, onValue, getDatabase } from "firebase/database";
import useAuth from "../Hooks/useAuth";
const Profile = () => {
  const [users, setusers] = useState({});
  const db = getDatabase();
  const { currentUser } = useAuth();
  async function getUserList() {
    const data = await ref(db, "users/" + currentUser.uid);
    onValue(data, (snapshot) => {
      const users = snapshot.val();
      setusers(users);
    });
  }
  useEffect(() => {
    getUserList();
  }, []);
  return (
    <div className=" h-[60vh] flex justify-center overflow-hidden items-center">
      <div className=" bg-slate-500 h-[50vh] w-1/2 rounded-md">
        <form className="flex flex-col px-2 flex-wrap">
          <label>userName</label>
          <input
            value={users?.username}
            type="text"
            placeholder={users?.username ? "" : "enter username"}
            className="p-1 rounded-md"
            contentEditable
          />
          <label>Email</label>
          <input
            // value={users?.email}
            type="text"
            placeholder={(users?.email) ? users?.email : "enter username"}
            className="p-1 rounded-md"
          />
          <label>city</label>
          <input type="text" placeholder="city" className="p-1 rounded-md" />
          <label>Mobile</label>
          <input
            type="tel"
            placeholder="Mobilenumber"
            className="p-1 rounded-md"
          />
          <label>pincode</label>
          <input type="tel" placeholder="pincode" className="p-1 rounded-md" />
          <div className="flex mt-2 justify-between px-7 ">
            <button className="bg-red-400 rounded-md text-black p-2">
              update details
            </button>
            <button className="bg-red-400 rounded-md text-black p-2">
              Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
