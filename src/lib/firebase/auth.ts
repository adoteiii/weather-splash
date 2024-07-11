import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
  User,
  sendPasswordResetEmail as _sendPasswordResetEmail,
} from "firebase/auth";
import { Credentials } from "../authtype";
// Get the firebase auth jwt
import { firebaseAuth as auth } from "./firebase";

export async function onAuthStateChanged(cb: any) {
  return _onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
    return true;
  } catch (error:any){
    console.log("Error signing in with google")
    return {
        error: error?.message
    }
  }
}

export async function signInWithEmailAndPassword(credentials: Credentials) {
  try {
    // console.log("Signing in with ", credentials);
    await _signInWithEmailAndPassword(
      auth,
      credentials.email || "",
      credentials.password || ""
    );
    return true;
  } catch (error:any){
    console.log("error signing in with email and password")
    return {
        error: error?.message
    }
  }
}

export async function signOut() {
  try {
    auth.signOut();
    return true;
  } catch (error:any){
    console.log('Error signing out')
    return {
        error: error?.message
    }
  }
}

export async function createUserWithEmailAndPassword(credentials: Credentials) {
  try {
    const userCred = await _createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    await sendEmailVerification(userCred.user, {url:"https://bloomballot.com/signin"});
  } catch (error:any){
    return {
        error: error?.message
    }
  }
}

export async function sendPasswordResetEmail(email: string) {
  try {
    await _sendPasswordResetEmail(auth, email, {url:"http://localhost:3000/login"});
  } catch (error:any){
    return {
        error: error?.message
    }
  }
}


export async function deleteAccount(currentUser:User) {
    try {
        await deleteUser(currentUser)
    } catch (error:any){
        return {
            error: error?.message
        }
    }
}

export async function sendEmailVerificationLink(user: User){
  await sendEmailVerification(user, {url:"https://bloomballot.com/signin"});
}

