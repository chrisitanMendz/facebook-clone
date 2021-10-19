import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAx3AkDCKNLmnumJ_0SaBWrYrOjAuuUc-A",
  authDomain: "facebook-a28fe.firebaseapp.com",
  projectId: "facebook-a28fe",
  storageBucket: "facebook-a28fe.appspot.com",
  messagingSenderId: "794252458485",
  appId: "1:794252458485:web:d08c00708e2342c9a7c8bc",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, storage };
export default db;
