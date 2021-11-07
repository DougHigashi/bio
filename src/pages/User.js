import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function User({ navigation }) {
    const [isMounted, setMounted] = useState(false);

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
                    onPress: () => { setMounted(false); navigation.dispatch(e.data.action); navigation.navigate('Login') }
                    //Depois de clicar em Ok ele libera a ação de voltar
                    //e realiza o logout
                }
            ]);
        })
    }, []);


    return (
        <View style={styles.container}>
            <AntDesign style={styles.logo} name="user" size={124} color="white" />
            <Text style={styles.text}>User</Text>
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