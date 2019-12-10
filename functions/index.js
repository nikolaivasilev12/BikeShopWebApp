const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

exports.AddUserRole = functions.auth.user().onCreate(async (authUser) => {

  if (authUser.email) {
    const customClaims = {
      customer: true,
    };
    try {
      var _ = await admin.auth().setCustomUserClaims(authUser.uid, customClaims)

      return db.collection("roles").doc(authUser.uid).set({
        email: authUser.email,
        role: customClaims
      })

    } catch (error) {
      console.log(error)
    }


  }

});
// const functions = require('firebase-functions');
// const db = firebase.firestore()
// import firebase from 'firebase'


// exports.AddUserRole = functions.auth.user().onCreate(async (authUser) => {
//     if (authUser.email) {
//       const customClaims = {
//         admin: true,
//       };
//       try {
//         var _ = await admin.auth().setCustomUserClaims(authUser.uid, customClaims)
//         return db.collection("roles").doc(authUser.uid).set({
//           email: authUser.email,
//           role: customClaims
//         })
//       } catch (error) {
//         console.log(error)
//       }
//     }
//   });



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
