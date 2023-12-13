import React, { useEffect, useState } from "react";
import { onAuthStateChanged,getAuth } from "firebase/auth";
import {auth} from "../constants/firebase"
const useAuth = () => {
 
  const [currentUser, setcurrentUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setcurrentUser(user);
      } else {
        setcurrentUser('');
      }
    });

    return () => {
      currentUser;
    };
  }, []);
  return { currentUser };

};

export default useAuth;