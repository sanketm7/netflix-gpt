import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidate } from "../utils/checkValidate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, getauth } from "../utils/firebase";

const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const [errorMessage, setErrorMessgae] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    setisSignInForm(!isSignInForm);
  };

  const handlerValidate = () => {
    const message = checkValidate(email.current.value, password.current.value);

    setErrorMessgae(message);

    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        name.current.value,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessgae(errorCode + " " + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessgae(errorCode + " " + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />

      <div className="absolute ">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/21a8ba09-4a61-44f8-8e2e-70e949c00c6f/6678e2ea-85e8-4db2-b440-c36547313109/IN-en-20240722-POP_SIGNUP_TWO_WEEKS-perspective_WEB_3457a8b1-284d-4bb5-979e-2a2e9bb342b3_small.jpg"
          alt="Background"
        />
      </div>

      <div className="absolute w-3/12 p-10  bg-black my-36 mx-auto right-0 left-0 opacity-85 rounded-md">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-white font-extrabold text-[30px] mb-3">
            {isSignInForm ? "Sign In" : "Sign Up "}
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
          <p className="text-red-600 font-semibold ">{errorMessage}</p>
          <button
            className="w-full bg-red-600 text-white p-2 mt-3 mb-2  rounded-sm font-semibold"
            onClick={handlerValidate}
          >
            {isSignInForm ? "Sign In" : "Sign Up "}
          </button>

          <p
            className="text-gray-300 text-[15px] mt-2 cursor-pointer "
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? "New to Netflix ? Sign Up Now "
              : "Already registered Sign In Now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
