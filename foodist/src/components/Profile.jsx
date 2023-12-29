import React, { useEffect, useState } from "react";
import { ref, onValue, getDatabase } from "firebase/database";
import useAuth from "../Hooks/useAuth";
import { set } from "firebase/database";

const Profile = () => {
  const [users, setusers] = useState({});
  const db = getDatabase();
  const { currentUser } = useAuth();
  const [username, setusername] = useState("");
  const [city, setcity] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [pincode, setpincode] = useState("");
  async function getUserList() {
    const data = await ref(db, "users/" + currentUser.uid);
    onValue(data, (snapshot) => {
      const users = snapshot.val();
      setusers(()=>users);
     
    });
  }
  useEffect(() => {
    getUserList();
  }, []);
  function handleUpdate(e) {
    e.preventDefault();
    const db = getDatabase();
    set(ref(db, "users/" + currentUser.uid), {
      username: username,
      email: users?.email,
      city: city,
      mobileNumber: mobileNumber,
      pincode: pincode,
    })
      .then(() => {
        // Data saved successfully!
      })
      .catch((error) => {
        // The write failed...
      });
    
  }
  return (
    <div className=" h-[60vh] flex justify-center overflow-hidden items-center">
      <div className=" bg-slate-500 h-[50vh] w-1/2 rounded-md">
        <form className="flex flex-col px-2 flex-wrap">
          <label>userName</label>
          <input
            type="text"
            placeholder={users?.username ? users?.username : "enter username"}
            className="p-1 rounded-md"
            contentEditable
            onChange={(e) => setusername(e.target.value)}
          />
          <label>Email</label>
          <input
            // value={users?.email}
            type="text"
            placeholder={users?.email}
            disabled
            className="p-1 rounded-md placeholder:text-white"
          />
          <label>city</label>
          <input
            type="text"
            placeholder={users?.city?users?.city:"city" }
            className="p-1 rounded-md"
            onChange={(e) => setcity(e.target.value)}
          />
          <label>Mobile</label>
          <input
            type="tel"
            placeholder={users?.mobileNumber ? users?.mobileNumber:"Mobilenumber"}
            className="p-1 rounded-md"
            onChange={(e) => setmobileNumber(e.target.value)}
          />
          <label>pincode</label>
          <input
            type="tel"
            placeholder={users?.pincode ? users?.pincode:"pincode"}
            className="p-1 rounded-md"
            onChange={(e) => setpincode(e.target.value)}
          />
          <div className="flex mt-2 justify-between px-7 ">
            <button
              onClick={(e) => handleUpdate(e)}
              className="bg-red-400 rounded-md text-black p-2"
            >
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
