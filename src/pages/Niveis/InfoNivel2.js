import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { app } from "../../../config/firebase";
import { getFirestore, doc, getDoc} from 'firebase/firestore';

export default function InfoNivel2({ navigation }) {

    const database = getFirestore(app)

    async function getList() {
        const col = doc(database, 'levelUsers/Nivel2')
        const snapshot = await getDoc(col);
        const list = snapshot.data();
    }

    return (
        <View style={styles.container}>
            <Text style = {styles.texto}>Informações Fiscais</Text>
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
    },  button: {
        
    }
});