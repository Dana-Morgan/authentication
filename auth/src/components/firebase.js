import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYpq65jkSneRF1KHXJZCtO-Rs7bFvDNTs",
  authDomain: "authentication-dd2a9.firebaseapp.com",
  projectId: "authentication-dd2a9",
  storageBucket: "authentication-dd2a9.appspot.com",
  messagingSenderId: "410253983419",
  appId: "1:410253983419:web:970ceda1c13041b62c339e",
  measurementId: "G-CHMJMHD9HW"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)