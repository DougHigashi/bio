import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { db, auth } from "../../config/firebase";
import { collection, documentId, getDoc } from '@firebase/firestore';

export default function Info({ navigation }) {

    const id = auth?.currentUser?.uid;

    async function getList(datab) {
        const col = collection(datab, 'levelUsers', id);
        const snapshot = await getDoc(col);
        const list = snapshot.data();
        return list;
      }

     const verifyPermition = () => {
        console.log(getList(db));
    }

    return (
        <View style={styles.container}>
            <Text style = {styles.texto}>Informações:</Text>
            <TouchableOpacity onPress={() => {verifyPermition()}}style={styles.button}>
                <Text style={styles.texto}>Produção Agrícola</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {verifyPermition()}}style={styles.button}>
                <Text style={styles.texto}>Informações Fiscais</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {verifyPermition()}}style={styles.button}>
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