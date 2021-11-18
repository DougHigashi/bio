import React from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { auth } from "../../config/firebase"

export default function User({ navigation }) {

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

    return (
        <View style={styles.container}>
            <AntDesign style={styles.logo} name="user" size={124} color="white" />
            <Text style={styles.text}>{auth.currentUser.email}</Text>
            <TouchableOpacity onPress={() => { deletar() }} style={styles.button}>
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
    },
    button: {
        backgroundColor: 'red',
        maxWidth: '90%',
        padding: 8,
        borderRadius: 50,
        alignSelf: 'center'
    }
});