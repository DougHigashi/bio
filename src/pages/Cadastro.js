import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ToastAndroid, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase"

export default function Cadastro({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const authenticate = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigation.navigate("Info");
                ToastAndroid.show("Cadastrado com sucesso", ToastAndroid.LONG)
            }).catch((error) => {
                switch (error.code) {
                    case "auth/weak-password":
                        Alert.alert("Senha fraca", "Utilize uma senha com 6 caracteres ou mais")
                        break;
                    case "auth/email-already-in-use":
                        Alert.alert("Email em uso", "Este email já está em uso, utilize outro")
                        break;
                    case "auth/invalid-email":
                        Alert.alert("Email inválido", "Informe um email válido")
                        break;
                    default:
                        break;
                }
            });


    }

    return (
        <View style={styles.container}>
            <Text style={styles.textTop}>Cadastro</Text>

            <TextInput style={styles.input} placeholder="Email" onChangeText={email => setEmail(email)} value={email} />
            <TextInput style={styles.input} secureTextEntry={true} placeholder="Senha" onChangeText={password => setPassword(password)} value={password} />

            <TouchableOpacity style={styles.button} onPress={() => { authenticate()}}>
                <AntDesign name="login" size={24} color="black" />
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
        
    },
    logo: {
        alignItems: "center",
        marginTop: 10
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        borderRadius: 50
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