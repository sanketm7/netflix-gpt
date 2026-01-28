import React from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handlerSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browser");
      } else {
        dispatch(removeUser());
      }
    });
    navigate("/");

    return () => {
      // Unsubscribe when component unmount
      unSubscribe();
    };
  }, []);

  return (
    <div className="absolute w-screen px-32 py-2 bg-gradient-to-b from-black z-20 flex justify-between items-center">
      <img className="w-40 " src={LOGO} />
      {user && (
        <div className="flex p-6 gap-3 cursor-pointer items-center">
          <img
            className="w-10 h-10 rounded-full"
            alt="singOut Img"
            src="https://images.unsplash.com/photo-1661051830189-54dfcfcf3a0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW9kZWwlMjBtYW58ZW58MHx8MHx8fDA%3D"
          />

          <div>
            {" "}
            <button
              className="font-semibold text-white bg-red-600 px-7 w-28 p-1 rounded-md "
              onClick={handlerSignOut}
            >
              SignOut
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
