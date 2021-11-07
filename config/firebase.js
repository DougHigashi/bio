import { initializeApp } from 'firebase/app';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBnMjfjFeoNdGawZ9oS-kNNL0JZsS1WxJA",
    authDomain: "my-bio-33030.firebaseapp.com",
    projectId: "my-bio-33030",
    storageBucket: "my-bio-33030.appspot.com",
    messagingSenderId: "248201065619",
    appId: "1:248201065619:web:886913d74b6f927d0b4966",
    measurementId: "G-D7PQCX92Z9"
  };

const config = {
  name: "Authentication"
}

initializeApp(firebaseConfig);
