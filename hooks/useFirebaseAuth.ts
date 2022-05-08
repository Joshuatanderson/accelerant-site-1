import {useState, useEffect} from "react";
import firebase from "../config/firebase";

import {User} from "../types/User";



const formatAuthUser = (user: firebase.User) => ({
    uid: user.uid,
    email: user.email,
})

export default function useFirebaseAuth(){
    const [authUser, setAuthUser] = useState<User|null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
        return () => unsubscribe();
    }, []);

    const clear = () => {
        setAuthUser(null);
        setLoading(true);
    };

    const createUserWithEmailAndPassword = async (email: string, password: string) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    const signInWithEmailAndPassword = async (email: string, password: string) => {
        await firebase.auth().signInWithEmailAndPassword(email, password);
    }

    const signOut = async () => {
        await firebase.auth().signOut();
        await clear();
    }



    const authStateChanged = async (authState) => {
        if(!authState){
            setAuthUser(null);
            setLoading(false);
            return;
        }
        setLoading(true);
        let formattedUser = formatAuthUser(authState);
        setAuthUser(formattedUser);
        setLoading(false);
    }

    return {
        authUser,
        loading,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        signOut,
    }
}