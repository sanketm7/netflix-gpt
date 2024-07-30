import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidate } from "../utils/checkValidate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const [errorMessage, setErrorMessgae] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    setisSignInForm(!isSignInForm);
  };

  const handleValidate = async () => {
    const message = checkValidate(email.current.value, password.current.value);

    setErrorMessgae(message);

    if (message) return;

    if (!isSignInForm) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        // Signed up
        const user = userCredential.user;

        // Update profile firebase

        updateProfile(user, {
          displayName: name.current.value,
          photoURL:
            "https://images.unsplash.com/photo-1661051830189-54dfcfcf3a0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW9kZWwlMjBtYW58ZW58MHx8MHx8fDA%3D",
        })
          .then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
              })
            );
            navigate("/browser");
          })
          .catch((error) => {
            setErrorMessgae(error.message);
          });
        console.log(user);
        // Optionally set the user's display name
        await user.updateProfile({ displayName: name.current.value });
      } catch (error) {
        setErrorMessgae(error.code + " " + error.message);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/browser");
      } catch (error) {
        setErrorMessgae(error.code + " " + error.message);
      }
    }
  };

  return (
    <div>
      <Header />

      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/21a8ba09-4a61-44f8-8e2e-70e949c00c6f/6678e2ea-85e8-4db2-b440-c36547313109/IN-en-20240722-POP_SIGNUP_TWO_WEEKS-perspective_WEB_3457a8b1-284d-4bb5-979e-2a2e9bb342b3_small.jpg"
          alt="Background"
        />
      </div>

      <div className="absolute w-3/12 p-10 bg-black my-36 mx-auto right-0 left-0 opacity-85 rounded-md">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-white font-extrabold text-[30px] mb-3">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="w-full p-2 mt-3 mb-2 bg-gray-700 border-white rounded-sm text-white"
            />
          )}

          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="w-full p-2 mt-3 mb-2 bg-gray-700 border-white rounded-sm text-white"
          />
          <input
            type="password"
            ref={password}
            placeholder="Password"
            className="w-full p-2 mt-3 mb-2 bg-gray-700 rounded-sm text-white"
          />
          <p className="text-red-600 font-semibold">{errorMessage}</p>
          <button
            className="w-full bg-red-600 text-white p-2 mt-3 mb-2 rounded-sm font-semibold"
            onClick={handleValidate}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p
            className="text-gray-300 text-[15px] mt-2 cursor-pointer"
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? "New to Netflix? Sign Up Now"
              : "Already registered? Sign In Now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
