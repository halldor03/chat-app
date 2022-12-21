import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9ZRipuR2-NGF-xHZYfsYnZnL-4QAE7Dk",
  authDomain: "chat-app-e1c53.firebaseapp.com",
  projectId: "chat-app-e1c53",
  storageBucket: "chat-app-e1c53.appspot.com",
  messagingSenderId: "804899334114",
  appId: "1:804899334114:web:67530baf04a3f61352fbbb",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
