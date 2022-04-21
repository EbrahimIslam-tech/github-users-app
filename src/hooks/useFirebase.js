import { useEffect, useState } from "react";
import { auth, db } from "../Firebase/Firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

const useFirebase = () => {
  const [user, setUser] = useState({});
  console.log(user);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [admin, setAdmin] = useState(false);

  const googleProvider = new GoogleAuthProvider();

  const usersCollectionRef = collection(db, "users");

  // const createUser = async () => {
  //   await addDoc(usersCollectionRef, {
  //     name: user.name,
  //     email: user.email,
  //     githubname: user.githubname,
  //     phoneNumber: user.phoneNumber,
  //   });
  // };

  const registerUser = (
    email,
    password,
    name,
    githubname,
    phoneNumber,
    navigate
  ) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setAuthError("");
        const newUser = {
          email,
          displayName: name,
          githubname: githubname,
          phoneNumber: phoneNumber,
        };
        setUser(newUser);
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {});
        navigate("/");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const loginUser = (email, password, location, navigate) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const destination = location?.state?.from || "/";
        navigate(destination);
        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const signInWithGoogle = (location, navigate) => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        createUsergoogle(user.email, user.displayName);
        setAuthError("");
        const destination = location?.state?.from || "/";
        navigate(destination);
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  //observer User state
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        // User is signed out
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unSubscribe;
  }, [auth]);

  //save data to my database \
  const createUsergoogle = async (displayName, email) => {
    await addDoc(usersCollectionRef, {
      name: displayName,
      email: email,
    });
  };
  // const saveUser = (email, displayName, method) => {
  //   const user = { email, displayName };

  //   fetch("https://salty-river-79195.herokuapp.com/users", {
  //     method: method,
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   }).then();
  // };

  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => setIsLoading(false));
  };

  return {
    user,
    admin,
    isLoading,
    registerUser,
    loginUser,
    signInWithGoogle,
    logOut,
    authError,
  };
};
export default useFirebase;
