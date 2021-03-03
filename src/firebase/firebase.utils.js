import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCFoEedmdYeo1yaAc4RdH4XASa4NPqk5J4",
    authDomain: "clothing-corner-810a4.firebaseapp.com",
    projectId: "clothing-corner-810a4",
    storageBucket: "clothing-corner-810a4.appspot.com",
    messagingSenderId: "763515372237",
    appId: "1:763515372237:web:b037c0e093feb160d35f84",
    measurementId: "G-HL6Z8TDMVY"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log('Error creating user', error.message);
      }
    }
    return userRef;
    //console.log(snapShot);
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;