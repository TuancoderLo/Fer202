// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKaIkEFJ2HYUtlJSK-sUNOpT1voVdeMAw",
  authDomain: "orchid-caefa.firebaseapp.com",
  projectId: "orchid-caefa",
  storageBucket: "orchid-caefa.firebasestorage.app",
  messagingSenderId: "727707357456",
  appId: "1:727707357456:web:db7f234ff5ce766ff59595",
  measurementId: "G-CE5N6V4ETN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Khởi tạo các dịch vụ Firebase
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);

export default app;
