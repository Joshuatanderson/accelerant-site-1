import firebase from "firebase/compat/app"
import "firebase/compat/auth";

const FIREBASE_CREDENTIALS = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
    projectID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
}

if(!firebase.apps.length){
    console.log(FIREBASE_CREDENTIALS)
    firebase.initializeApp(FIREBASE_CREDENTIALS)
}

export default firebase;