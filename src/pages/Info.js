import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { db, auth, app } from "../../config/firebase";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function Info({ navigation }) {

    const id = auth.currentUser.uid;

    const database = getFirestore(app)

    async function getList(database) {
        const col = doc(database, 'levelUsers/' + id)
        const snapshot = await getDoc(col);
        const list = snapshot.data();
        console.log(list)
    }

    return (
        <View style={styles.container}>
            <Text style = {styles.texto}>Informações:</Text>
            <TouchableOpacity onPress={() => {getList(database)}}style={styles.button}>
                <Text style={styles.texto}>Produção Agrícola</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {getList()}}style={styles.button}>
                <Text style={styles.texto}>Informações Fiscais</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {getList()}}style={styles.button}>
                <Text style={styles.texto}>Agrotóxicos</Text>
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