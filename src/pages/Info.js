import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { db, auth } from "../../config/firebase";
export default function Info({ navigation }) {


    const id = auth?.currentUser?.uid;

    const verifyPermition = () => {
     db.collection('levelUsers').doc(id).get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
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
        marginTop: 90,
        marginBottom: 50,
        fontSize: 30,
        fontFamily: "sans-serif-thin"
    },  button: {
        
    }
});