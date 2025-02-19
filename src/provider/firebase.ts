import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDClMTFgLYeHv60pNoMyk9tsaUG3qwuz8k",
    authDomain: "clonespotify-98166.firebaseapp.com",
    projectId: "clonespotify-98166",
    storageBucket: "clonespotify-98166.appspot.com",
    messagingSenderId: "950609807889",
    appId: "1:950609807889:web:01d8d65a78540206d4ffb0",
    measurementId: "G-52DFEMTQCQ"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export { signInWithPopup }; 