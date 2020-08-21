import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyBkcnxA8ab9Zg1Jvm_zfEzPpt5qA5xgdLw',
  authDomain: 'gqlreactnode-66.firebaseapp.com',
  // databaseURL: "https://gqlreactnode-66.firebaseio.com",
  projectId: 'gqlreactnode-66',
  storageBucket: 'gqlreactnode-66.appspot.com',
  // messagingSenderId: '291193937172',
  appId: '1:291193937172:web:a70cd4a2b16fe20b58b601',
  measurementId: 'G-XXCS38FTGM',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
