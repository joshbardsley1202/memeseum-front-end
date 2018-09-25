import Rebase from 're-base'
import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyAVOKD78kM1eRt8PZsHA8ydJzY99CG1248",
    authDomain: "capstone-memeseum.firebaseapp.com",
    databaseURL: "https://capstone-memeseum.firebaseio.com",
    projectId: "capstone-memeseum",
    storageBucket: "capstone-memeseum.appspot.com",
    messagingSenderId: "966454085421"
}
const app = firebase.initializeApp(firebaseConfig)
const base = Rebase.createClass(app.database())
export { firebase, base }