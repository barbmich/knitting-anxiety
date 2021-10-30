import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";
import cookie from "js-cookie";
import { clientAuth } from "@lib/initFirebase";
import {
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
  signOut,
  User,
} from "@firebase/auth";

type AuthProvider = {
  children: JSX.Element | JSX.Element[];
};

type FormattedUserType = {
  uid: string;
  email: string | null;
  name: string | null;
  provider: string;
  photoUrl: string | null;
  token: string;
};

type AuthContextType = {
  user: FormattedUserType | null;
  loading: boolean;
  error: string;
  signinWithEmailLink: (email: string) => Promise<boolean>;
  confirmSigninWithEmailLink: (
    email: string,
    href: string,
    redirect?: string
  ) => Promise<void>;
  signinWithGoogle: (redirect?: string) => Promise<void>;
  signout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
AuthContext.displayName = "AuthContext";

export function AuthProvider({ children }: AuthProvider) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error(`useAuth needs to be used within a AuthProvider`);
  return context;
};

function useProvideAuth(): AuthContextType {
  const [user, setUser] = useState<FormattedUserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleUser = async (rawUser: any) => {
    if (rawUser) {
      console.log(rawUser);
      const user = await formatUser(rawUser);
      setUser(user);

      cookie.set("Authorization", user.token, {
        expires: 7,
      });

      setLoading(false);
      return user;
    } else {
      setUser(null);
      cookie.remove("Authorization");

      setLoading(false);
      return null;
    }
  };

  const signinWithEmailLink = async (email: string) => {
    try {
      setLoading(true);
      setError("");
      await sendSignInLinkToEmail(clientAuth, email, {
        url: "http://localhost:3000/auth/callback/email_link",
        handleCodeInApp: true,
      });
      window.localStorage.setItem("emailForSignIn", email);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      return false;
    }
  };

  const confirmSigninWithEmailLink = async (
    email: string,
    href: string,
    redirect: string | undefined
  ) => {
    try {
      setLoading(true);
      setError("");
      const { user } = await signInWithEmailLink(clientAuth, email, href);
      handleUser(user);
      window.localStorage.removeItem("emailForSignIn");
      if (redirect) {
        Router.push(redirect);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const signinWithGoogle = async (redirect: string | undefined) => {
    try {
      setLoading(true);
      setError("");
      const { user } = await signInWithPopup(
        clientAuth,
        new GoogleAuthProvider()
      );
      handleUser(user);
      if (redirect) {
        Router.push(redirect);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const signout = async () => {
    signOut(clientAuth);
    handleUser(null);
    Router.push("/");
  };

  useEffect(() => {
    const unsubscribe = clientAuth.onIdTokenChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    error,
    signinWithEmailLink,
    confirmSigninWithEmailLink,
    signinWithGoogle,
    signout,
  };
}

// const getStripeRole = async () => {
//   await firebase.auth().currentUser.getIdToken(true);
//   const decodedToken = await firebase.auth().currentUser.getIdTokenResult();

//   return decodedToken.claims.stripeRole || "free";
// };

const formatUser = async (user: User): Promise<FormattedUserType> => {
  const token = await user.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    // stripeRole: await getStripeRole(),
    token,
  };
};
