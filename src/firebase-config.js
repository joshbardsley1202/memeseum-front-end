import Rebase from 're-base'
import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCZSQTQT_k_EGTyJqcZUjp2W1aS3NXR1MI",
    authDomain: "memeseum-backend.firebaseapp.com",
    databaseURL: "https://memeseum-backend.firebaseio.com",
    projectId: "memeseum-backend",
    storageBucket: "memeseum-backend.appspot.com",
    messagingSenderId: "484898951241"
};
const app = firebase.initializeApp(firebaseConfig)
const base = Rebase.createClass(app.database())
export { firebase, base }