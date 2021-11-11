import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase"

export default function User({ navigation }) {
    const [isMounted, setMounted] = useState(false);


    const logoff = () => {
        signOut(auth).then(() => {
            console.log("Logged off")
          }).catch((error) => {
            // An error happened.
          });
          
    }

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

    const deletar = () => {
        Alert.alert(
            "Deletar",
            "Tem certeza que deseja deletar o usuario?",
            [
                {
                    text: "Não",
                },
                {
                    text: "Sim",
                    onPress: () => {
                        let user = auth?.currentUser;                    
                        user.delete()
                            .then(() => {
                                Alert.alert('Deletado com sucesso')
                                navigation.replace('Tabs')
                            })
                            .catch((error) => {
                                Alert.alert('Ops!', error)
                            });
                    },
                },
            ]
        )
    }

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
                        logoff();
                        navigation.navigate('Login');
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
            <TouchableOpacity onPress={() => { deletar() }} style={styles.botao}>
                <Text style={styles.textobotao}>Deletar Conta</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    textobotao: {
        color: 'white'
    },
    text: {
        textAlign: "center",
        color: "#fff",
        marginTop: 90,
        marginBottom: 50,
        fontSize: 20,
        fontFamily: "sans-serif-thin"
    },
    logo: {
        alignSelf: "center",
        marginTop: 100
    }
});