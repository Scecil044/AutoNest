import { useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

export default function Oauth() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const continueWithGoogle = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      console.log(res.user);
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
