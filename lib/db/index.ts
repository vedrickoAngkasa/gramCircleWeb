// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase Promotions that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


export const initFirebase = () => {
  console.log('--------- firebase Init ----------------')
  if (getApps.length > 0) {
    return getApps();
  }
  

  // DocFlow google project
  // return initializeApp({ apiKey: 'AIzaSyCBf-TQGy3dRKkjRQp6Bhrd_i4aJb2ndzY',
  // authDomain: 'docflow-d2170.firebaseapp.com',
  // projectId: 'docflow-d2170',
  // storageBucket: 'docflow-d2170.appspot.com',
  // messagingSenderId: '317301037247',
  // appId: '1:317301037247:web:dd1cc179e637a2d20b0e0a',
  // measurementId: 'G-ZMSS5WX7ZZ'});

  // query bay google account
  const firebaseConfig = {
    // apiKey: process.env.FIREBASE_API_KEY,
    // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.FIREBASE_PROJECT_ID,
    // storageBucket: process.env.FIREBASE_STORAGE_BUCKER,
    // messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
    // appId: process.env.FIREBASE_APP_ID,
    // measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    
    // apiKey: 'AIzaSyCQOpKCdMXEgh2s2knShSFk9RMl3HNzcZo',
    // authDomain: 'query-bay.firebaseapp.com',
    // projectId: 'query-bay',
    // storageBucket: 'query-bay.appspot.com',
    // messagingSenderId: '48683710053',
    // appId: '1:48683710053:web:62139ed96effc88899b88c',
    // measurementId: 'G-TSKD21BFW5'
    apiKey: "AIzaSyCvB2wD-aGYyhGTXwxPZHXkzUJDsyXmFow",
    authDomain: "mymynd88.firebaseapp.com",
    projectId: "mymynd88",
    storageBucket: "mymynd88.appspot.com",
    messagingSenderId: "370960516623",
    appId: "1:370960516623:web:9fd25b357adf8b446a857a",
    measurementId: "G-Q35267GPT3"
  };

  // console.log('----------------------------------------------------------------')
  // console.log(firebaseConfig);
  // console.log('----------------------------------------------------------------')

  return initializeApp(firebaseConfig);
}


export const fireApp = initFirebase();
export const fireDb = getFirestore(fireApp as any);
export const fireStorage = getStorage(fireApp as any);
export const fireAuth = getAuth(fireApp as any);

// export { fieapp, db, storage, auth };
// console.log(firebaseConfig2);
// console.log(firebaseConfig);
