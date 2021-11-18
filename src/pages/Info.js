import React, { useEffect, useState } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, app } from "../../config/firebase";
import { AntDesign } from '@expo/vector-icons';
import { signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function Info({ navigation }) {
    const [isMounted, setMounted] = useState(false);

    const id = auth.currentUser.uid;

    const database = getFirestore(app)

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
                }
            ]);
        })
    }, []);

    const logoff = () => {
        signOut(auth).then(() => {
            console.log("Logged off")
        }).catch((error) => {
            // An error happened.
        });
    }

    async function getList(infoNivel) {
        const col = doc(database, 'levelUsers/' + id)
        const snapshot = await getDoc(col);
        const list = snapshot.data();
        console.log(list)
        try {
            if (list.Nível === 3) {
                console.log(infoNivel)
                switch (infoNivel) {
                    case 'N1':
                        navigation.navigate("InfoNivel1");
                        break;
                    case 'N2':
                        navigation.navigate("InfoNivel2");
                        break;
                    case 'N3':
                        navigation.navigate("InfoNivel3");
                        break;
                }
            }
            else if (list.Nível === 2) {
                switch (infoNivel) {
                    case 'N1':
                        navigation.navigate("InfoNivel1");
                        break;
                    case 'N2':
                        navigation.navigate("InfoNivel2");
                        break;
                    default:
                        Alert.alert('OPS!', 'Usuario sem permisão!')
                        break;
                }
            } else if (list.Nível === 1) {
                switch (infoNivel) {
                    case 'N1':
                        navigation.navigate("InfoNivel1");
                        break;
                    default:
                        Alert.alert('OPS!', 'Usuario sem permisão!')
                        break;
                }
            }
        } catch (error) {
            switch (error.code) {
                case undefined:
                    switch (infoNivel) {
                        case 'N1':
                            navigation.navigate("InfoNivel1");
                            break;
                        default:
                            Alert.alert('OPS!', 'Usuario sem permisão!')
                            break;
                    }
                default:
                    break;
            }
        }
    }
    const perfil = () => {
        navigation.navigate("User");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Informações:</Text>
            <TouchableOpacity onPress={() => { getList('N1') }}>
                <Text style={styles.texto}>Produção Agrícola</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { getList('N2') }}>
                <Text style={styles.texto}>Informações Fiscais</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { getList('N3') }}>
                <Text style={styles.texto}>Agrotóxicos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { perfil() }}>
                <AntDesign name="user" size={24} color="black" />
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    }, texto: {
        textAlign: "center",
        color: "#fff",
        marginTop: '25%',
        marginBottom: '5%',
        fontSize: 30,
        fontFamily: "sans-serif-thin"
    }, button: {
        alignSelf: 'center',
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        borderRadius: 30,
        marginTop: 40,
        width: '40%'
    }
});