import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ToastAndroid, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as LocalAuthentication from 'expo-local-authentication';
import { auth } from "../../config/firebase"

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const authenticate = () => {
        LocalAuthentication.authenticateAsync().then(result => {
            if (result.success) {
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        console.log(userCredential);
                        navigation.navigate("User");
                    }).catch((error) => {
                        console.log(error.code)
                        console.log(error.message)
                    });
            }
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textTop}>Login</Text>

            <TextInput style={styles.input} placeholder="Email" onChangeText={email => setEmail(email)} value={email} />
            <TextInput style={styles.input} secureTextEntry={true} placeholder="Senha" onChangeText={password => setPassword(password)} value={password} />

            <TouchableOpacity style={styles.logo} onPress={() => { authenticate(); console.log(email) }}>
                <Ionicons name="finger-print" size={128} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.navigate("Cadastro")}}>
                <Text style={styles.textTop}>Cadastre-se</Text>
            </TouchableOpacity>
            <StatusBar style="inverted" />
        </View>


    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center'
    },
    textTop: {
        textAlign: "center",
        color: "#fff",
        marginTop: 90,
        marginBottom: 50,
        fontSize: 30,
        fontFamily: "sans-serif-thin"
    },
    logo: {
        alignItems: "center",
        marginTop: 10
    },
    subText: {
        textAlign: "center",
        color: "#fff",
        marginBottom: 50,
        fontSize: 30,
        fontFamily: "sans-serif-thin"
    },
    input: {
        width: '70%',
        marginBottom: 20,
        padding: 10,
        height: 50,
        backgroundColor: '#F7F7F7',
        borderRadius: 25,
        justifyContent: 'center',
        alignContent: 'center'
    },
});