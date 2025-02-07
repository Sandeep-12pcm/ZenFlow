import React, { useState } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../firebase";

const PhoneAuth = ({ onSuccess }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const sendOtp = async () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });

      const confirmationResult = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmation(confirmationResult);
    } catch (error) {
      console.error("OTP Send Error:", error);
    }
  };

  const verifyOtp = async () => {
    try {
      const result = await confirmation.confirm(otp);
      onSuccess(result.user);
    } catch (error) {
      console.error("OTP Verification Error:", error);
    }
  };

  return (
    <div className="p-4">
      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="border p-2 w-full" />
      <button onClick={sendOtp} className="bg-blue-500 text-white p-2 mt-2">Send OTP</button>

      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" className="border p-2 w-full mt-2" />
      <button onClick={verifyOtp} className="bg-green-500 text-white p-2 mt-2">Verify OTP</button>

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneAuth;
