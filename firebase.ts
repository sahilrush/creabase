import { initializeApp,getApps,getApp } from "firebase/app";       
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
    apiKey: "AIzaSyD4JUkFADu4RTnDhr4bYRBYfLQIirQYCYo",
    authDomain: "creabase-fabe5.firebaseapp.com",
    projectId: "creabase-fabe5",
    storageBucket: "creabase-fabe5.appspot.com",
    messagingSenderId: "438250473833",
    appId: "1:438250473833:web:e33e3cf7ecf211d72255f8"
  };


  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

    const db = getFirestore(app); 
    
    export {db};