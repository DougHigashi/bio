import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase"

export default function User({ navigation }) {
    const [isMounted, setMounted] = useState(false);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            // ...
        } else {
            // User is signed out
            // ...
        }
    });

    useEffect(() => {
        setMounted(true);

        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();

            Alert.alert('Logout', 'Deseja realizar logout da sua conta?', [
                {
                    text: 'Cancelar',
                },
                {
                    text: 'Ok',
                    onPress: () => {
                        setMounted(false);
                        navigation.dispatch(e.data.action);
                        navigation.navigate('Login');
                        signOut(auth).then(() => {
                            console.log("Logged off")
                          }).catch((error) => {
                            // An error happened.
                          });
                          
                    }
                    //Depois de clicar em Ok ele libera a ação de voltar
                    //e realiza o logout
                }
            ]);
        })
    }, []);


    return (
        <View style={styles.container}>
            <AntDesign style={styles.logo} name="user" size={124} color="white" />
            <Text style={styles.text}>{auth.currentUser.email}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    text: {
        textAlign: "center",
        color: "#fff",
        marginTop: 90,
        marginBottom: 50,
        fontSize: 30,
        fontFamily: "sans-serif-thin"
    },
    logo: {
        alignSelf: "center",
        marginTop: 100
    }
});