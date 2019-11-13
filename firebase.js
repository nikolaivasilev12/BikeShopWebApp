import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyAz4IxRW3HCT7BPKsXd-nD0X-k-EZocSKA",
    authDomain: "bagel-d0271.firebaseapp.com",
    databaseURL: "https://bagel-d0271.firebaseio.com",
    projectId: "bagel-d0271",
    storageBucket: "bagel-d0271.appspot.com",
    messagingSenderId: "425617251720",
    appId: "1:425617251720:web:93571de774b309572f6e3d"
  };
  // Initialize Firebase
 

export const fb = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()
export const dbMenuAdd = db.collection('menuItems');
export const dbOrders = db.collection('orderItems');