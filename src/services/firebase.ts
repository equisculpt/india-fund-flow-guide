
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD4k1A2NxvF1a5xKsKkkH9vFwQ49cnz5PQ",
  authDomain: "sipbrewery-cdabd.firebaseapp.com",
  projectId: "sipbrewery-cdabd",
  storageBucket: "sipbrewery-cdabd.firebasestorage.app",
  messagingSenderId: "707057164856",
  appId: "1:707057164856:web:59b0b90cbb5ddb55a57ccd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithFacebook = () => signInWithPopup(auth, facebookProvider);
export const logout = () => signOut(auth);

export { onAuthStateChanged, type User };
