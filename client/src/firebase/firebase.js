import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC-MztQ2V-Ty8gFnA6wJvLQ0Atp4PtqH88",
  authDomain: "uchit-traders-c7a4e.firebaseapp.com",
  projectId: "uchit-traders-c7a4e",
  storageBucket: "uchit-traders-c7a4e.firebasestorage.app",
  messagingSenderId: "621025684010",
  appId: "1:621025684010:web:c2adadb09beb2e94e67153",
  measurementId: "G-2ZMWVTMG4R"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth(app);

export { app, analytics };
