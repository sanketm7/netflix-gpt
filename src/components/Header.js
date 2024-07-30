import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handlerSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <div className="absolute w-screen px-32 py-2 bg-gradient-to-b from-black z-20 flex justify-between items-center">
      <img
        className="w-40 "
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
      />
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
