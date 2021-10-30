import { useState } from "react";
import { useAuth } from "@hooks/useAuth";

export default function Signin() {
  const { signinWithGoogle, signinWithEmailLink } = useAuth();
  const [email, setEmail] = useState("");
  const [isEmailLinkLogin, setIsEmailLinkLogin] = useState(false);

  const handleSigninWithEmailLink = async () => {
    const success = await signinWithEmailLink(email);
    if (success) {
      setIsEmailLinkLogin(true);
    }
  };

  if (isEmailLinkLogin)
    return (
      <div>We sent you an email with the login link, check your inbox!</div>
    );

  return (
    <div>
      <button onClick={() => signinWithGoogle("/")} className="border-2">
        sign in with google
      </button>
      <div className="border-2 w-max">
        <input onChange={(e) => setEmail(e.target.value)} />
        <button onClick={() => handleSigninWithEmailLink()}>
          sign in with email link
        </button>
      </div>
    </div>
  );
}
