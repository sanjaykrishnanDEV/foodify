import React, { useEffect, useState } from "react";
import { ref, onValue, getDatabase, update } from "firebase/database";
import useAuth from "../Hooks/useAuth";
import { set, get } from "firebase/database";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

const LoadingComponent = () => {
  return <div>Loading...</div>;
};
const Profile = () => {
  const [users, setusers] = useState(null);
  const db = getDatabase();
  const { currentUser } = useAuth();
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const[imgurl,setimgurl] = useState("")
  const [toggle, settoggle] = useState(true);
  const userDetail = ref(db, "users/" + currentUser.uid);
  const [userData, setuserData] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    const userDetailRef = ref(db, "users/" + currentUser.uid);
    const fetchData = onValue(userDetailRef, (snapshot) => {
      const fetchedData = snapshot.val();
      setusers(fetchedData);
    });
    return () => {
      // Cleanup the listener when the component unmounts
      fetchData();
    };
  }, [db, currentUser.uid]);

  function handleToggle() {
    settoggle(!toggle);
  }
  function handleUpdate() {
    const reference = ref(db, "users/" + currentUser.uid);
    const userData = {
      city,
      username,
      mobileNumber,
      pincode,
      imgurl,
    };
    if (
      userData.city !== "" &&
      userData.username !== "" &&
      userData.mobilenumber !== "" &&
      userData.pincode !== ""
    ) {
      toast.success("successfully updated")
      update(reference, userData);
      navigate("/")
    } else {
      toast.error("please enter all valid details");
    }
  }
  //image
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
     // console.log(imageUrl)
      setimgurl(()=>imageUrl)
      // Do something with the imageUrl, such as storing it in state or sending it to a server
    };
  
    reader.readAsDataURL(file);
  };
  
  {
    return (
      <div className=" bg-slate-800 h-[100vh] flex justify-center items-center">
        <Toaster />
        <div className=" border bg-white rounded-lg h-auto w-1/2 p-2">
          <div className="flex flex-col items-center justify-center  w-full h-auto">
            <span className="underline underline-offset-2 text-xl">
              {toggle ? "My Details" : "Update Now"}
            </span>
            <hr />
            {toggle ? (
              <div className="flex mt-2 justify-evenly  w-[100%] p-1 flex-col">
                <div className=" flex justify-center h-auto  ">
                <img src={users?.imgurl} alt="profile" className="rounded-full border w-28 h-28 "/>
                </div>
                <p className=" border w-full text-center p-1">{users?.email}</p>
                <p className=" border w-full text-center p-1 mt-1">
                  {users?.username}
                </p>
                <p className=" border w-full text-center p-1 mt-1">
                  {users?.mobileNumber}
                </p>
                <p className=" border w-full text-center p-1 mt-1">
                  {users?.pincode}
                </p>
                <p className=" border w-full text-center p-1 mt-1">
                  {users?.city}
                </p>
              </div>
            ) : (
              <div>
                <form>
                  <input
                    disabled
                    type="text"
                    placeholder={users?.email}
                    value={users?.email}
                    className=" border w-full text-center p-1 mt-1"
                  />
                  <input type="file" onChange={handleFileUpload} />

                  <input
                    type="text"
                    placeholder="username"
                    className=" border w-full text-center p-1 mt-1"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="mobilenumber"
                    className=" border w-full text-center p-1 mt-1"
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="pincode"
                    className=" border w-full text-center p-1 mt-1"
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="city"
                    className=" border w-full text-center p-1 mt-1"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </form>
              </div>
            )}
          </div>
          {toggle ? (
            <div className="flex justify-center text-white">
              <button
                onClick={handleToggle}
                className=" bg-red-600 rounded-xl p-1"
              >
                Update details
              </button>
            </div>
          ) : (
            <div className="flex justify-around">
              <button
                onClick={handleUpdate}
                className=" bg-red-600 rounded-xl p-1 "
              >
                click to update
              </button>
              <button
                onClick={()=>navigate("/")}
                className=" bg-red-600 rounded-xl p-1 "
              >
                Go back 
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
};
export default Profile;
