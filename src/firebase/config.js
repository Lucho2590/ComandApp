// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyDXG6fhefYiZVgi__XiLvpNrc1jGzwJOwE",
    authDomain: "comandapp-6751a.firebaseapp.com",
    projectId: "comandapp-6751a",
    storageBucket: "comandapp-6751a.appspot.com",
    messagingSenderId: "760292813704",
    appId: "1:760292813704:web:83cc3f3aabfaf34374283d",
    measurementId: "G-LPB283RNL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);