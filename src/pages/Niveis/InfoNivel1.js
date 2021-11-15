import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { auth, app } from "../../../config/firebase";
import { getFirestore, doc, getDoc} from 'firebase/firestore';

export default function InfoNivel1({ navigation }) {

    const database = getFirestore(app)

    const id = auth.currentUser.uid;

    async function getList() {
        const col = doc(database, 'Nivel1/' + id)
        const snapshot = await getDoc(col);
        const list = snapshot.data();
        console.log(list)
    }

    return (
        <View style={styles.container}>
            <Text style = {styles.texto}>Produção Agrícola</Text>
            <TouchableOpacity onPress={() => {getList()}}style={styles.button}>
                <Text style={styles.texto}>print</Text>
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
    },  button: {
        
    }
});
