import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAnOpay12DIv1WNV4gBMuNq5OffvClV3Vo",
  authDomain: "yachu-5c9aa.firebaseapp.com",
  projectId: "yachu-5c9aa",
  storageBucket: "yachu-5c9aa.appspot.com", 
  messagingSenderId: "542278974365",
  appId: "1:542278974365:web:8bc9005da90bbd7c07cd74",
  measurementId: "G-BPPRDH8SKK"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth(app);

export { app, analytics };
