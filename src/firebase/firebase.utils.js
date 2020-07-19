import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDO2u-982GGW8abHuFvx5XNNDrRtC2K7Tw",
  authDomain: "voodoo-db.firebaseapp.com",
  databaseURL: "https://voodoo-db.firebaseio.com",
  projectId: "voodoo-db",
  storageBucket: "voodoo-db.appspot.com",
  messagingSenderId: "395560883040",
  appId: "1:395560883040:web:0869a48da1bd5450f50405",
  measurementId: "G-DS80D4QT06",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
