// src/firebaseAuth.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { firebaseConfig } from "../config";

initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    console.log("sigiinin");

    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user
  } catch (error) {
    console.error(error);
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out from Firebase");
  } catch (error) {
    console.error("Firebase sign-out error:", error);
  }
};