importScripts(
    "https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js"
);
importScripts(
    "https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
    apiKey: "AIzaSyBp3onncK8Ofb95b6LepY0aYHhSQYIrsTM",
    authDomain: "medtech-2f8cf.firebaseapp.com",
    projectId: "medtech-2f8cf",
    storageBucket: "medtech-2f8cf.appspot.com",
    messagingSenderId: "481287204307",
    appId: "1:481287204307:web:7a4847ac707ad633d61326",
    measurementId: "G-4L42LTZHRV"
})

const initMessaging = firebase.messaging()