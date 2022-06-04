
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
  
const firebaseConfig = {
    apiKey: "AIzaSyCPidDZteOAHFspm264ROxS7hnEi-xkZz4",
    authDomain: "my-health-care-2cee1.firebaseapp.com",
    projectId: "my-health-care-2cee1",
    storageBucket: "my-health-care-2cee1.appspot.com",
    messagingSenderId: "661169598449",
    appId: "1:661169598449:web:a3a806ee9fc05fe4ce5e50",
    measurementId: "G-Y9NCG85XQM"
};
  
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export {auth , firebase};