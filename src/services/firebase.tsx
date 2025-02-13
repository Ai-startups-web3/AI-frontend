// src/firebaseAuth.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseConfig } from "../config";

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
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
