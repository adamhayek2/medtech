import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyBp3onncK8Ofb95b6LepY0aYHhSQYIrsTM",
  authDomain: "medtech-2f8cf.firebaseapp.com",
  projectId: "medtech-2f8cf",
  storageBucket: "medtech-2f8cf.appspot.com",
  messagingSenderId: "481287204307",
  appId: "1:481287204307:web:7a4847ac707ad633d61326",
  measurementId: "G-4L42LTZHRV"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

const fetchToken = () => {
  return getToken(messaging, {vapidKey: 'BGO-2IZw57eOyCnb3roLzQlayrdy_26BUuEOqH4fCuVL6gh0rtAQp-Hgyb7k8plGhWnlwpsqW0mGhVUFjSLGy3s'})
  .then((currentToken) => {
    localStorage.setItem('fcm_token', currentToken);
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });
}
export default fetchToken
