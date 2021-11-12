import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, app } from "../../../config/firebase";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function InfoNivel3({ navigation }) {

    const database = getFirestore(app)

    async function getList() {
        const col = doc(database, 'levelUsers/Nivel3')
        const snapshot = await getDoc(col);
        const list = snapshot.data();
    }
    
    return (
        <View style={styles.container}>
            <Text style = {styles.texto}>Agrotóxicos</Text>
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