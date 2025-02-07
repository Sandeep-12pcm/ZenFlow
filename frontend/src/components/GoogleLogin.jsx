import React from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const GoogleLogin = ({ onSuccess }) => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onSuccess(result.user);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <button onClick={handleGoogleLogin} className="bg-red-500 text-white p-2 rounded-md">
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
