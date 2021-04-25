import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD59M4t_mZVUevhOhWQAh21tgySl8_jgtw",
  authDomain: "desfogues-ee039.firebaseapp.com",
  databaseURL: "https://desfogues-ee039-default-rtdb.firebaseio.com",
  projectId: "desfogues-ee039",
  storageBucket: "desfogues-ee039.appspot.com",
  messagingSenderId: "411376492029",
  appId: "1:411376492029:web:beef8bb39ec59a78438d94",
  measurementId: "G-65Y4LNN95L",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();

export { firebase };
