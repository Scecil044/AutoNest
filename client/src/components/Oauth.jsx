import { useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginFulfilledState,
  loginPendingState,
  loginRejectedState,
} from "../firebase/userSlice";

export default function Oauth() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const continueWithGoogle = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      setLoading(true);
      const res = await fetch("/api/auth/google/auth", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          displayName: response.user.displayName,
          image: response.user.photoURL,
          email: response.user.email,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(loginRejectedState(data.message));
        setLoading(false);
        return;
      }
      dispatch(loginFulfilledState(data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div>
      <button
        onClick={continueWithGoogle}
        to="/login"
        className="py-1 px-24 bg-popsicle"
      >
        Sign In
      </button>
    </div>
  );
}
