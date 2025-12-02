import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD-ABq5cK1v56oDGThSZGAFP1TvZjFYZwI",
  authDomain: "yachu-86b5e.firebaseapp.com",
  projectId: "yachu-86b5e",
  storageBucket: "yachu-86b5e.appspot.com",
  messagingSenderId: "669237212372",
  appId: "1:669237212372:web:fd7f77e4af362919fcf741",
  measurementId: "G-00K1DCKBZ2"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth(app);

export { app, analytics };
