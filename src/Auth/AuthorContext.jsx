import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

export const AuthContext = createContext(null);

const AuthorContext = (props) => {
  const { children } = props || {};

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // USER SIGNUP
  const userRegister = async (email, password, name, photoURL) => {
    try {
      setIsLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // ----Update Profile
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });

      setUser({
        ...result.user,
        displayName: name,
        photoURL: photoURL,
      });
      return result.user;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  //--------------GOOGLE SIGNIN
  const googleSignIn = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Update profile to ensure all information is properlu ser

      await updateProfile(auth.currentUser, {
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      });
      setUser(result.user);
      return result.user;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  //----------------USER LOGIN------------------
  const userLogin = async (email, password) => {
    try {
      setIsLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);

      if (!result.user) {
        throw new Error("User login failed!");
      }

      await result.user.reload();

      const updatedUser = auth.currentUser;

      setUser(updatedUser);
      setIsLoading(false);
      return updatedUser;
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  //-------------- UPDATE USER
  const updateUser = async (updateData) => {
    if (!auth.currentUser) {
      return console.error("User is not authenticated!");
    }
    try {
      await updateProfile(auth.currentUser, {
        displayName: updateData?.name || auth.currentUser.displayName,
        photoURL: updateData?.photoURL || auth.currentUser.photoURL,
      });
      await auth.currentUser.reload();
      setUser({
        ...auth.currentUser,
        displayName: updateData?.name || auth.currentUser.displayName,
        photoURL: updateData?.photoURL || auth.currentUser.photoURL,
      });
      return auth.currentUser;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };
  //USER LOGOUT

  const logOutUser = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  const authInfo = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    userRegister,
    userLogin,
    googleSignIn,
    updateUser,
    logOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthorContext;
