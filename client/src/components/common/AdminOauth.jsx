import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginFulfilledState,
  loginRejectedState,
} from "../../firebase/userSlice";
import { app } from "../../firebase";

export default function AdminOauth() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const GoogleAuth = async () => {
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
    <div className="mt-2">
      <button
        onClick={GoogleAuth}
        type="button"
        className="w-full flex items-center gap-2 justify-center py-1 shadow-lg hover:shadow-md transition-all duration-200 border-x-gray-400 border"
      >
        <img
          src="/icons8-google.svg"
          alt="..."
          className="h-5 w-5 object-cover rounded-full"
        />
        Continue with google
      </button>
    </div>
  );
}
