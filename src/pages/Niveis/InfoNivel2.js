import React from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { auth, app } from "../../../config/firebase";
import { getFirestore, collection, query, onSnapshot, limit} from 'firebase/firestore';

export default function InfoNivel2({ navigation }) {

    const database = getFirestore()

    async function getList() {
        const queryForDocuments = query(collection(database, 'Nivel2'), limit(200))
        onSnapshot(queryForDocuments, (queryS) => 
        {
          queryS.forEach((snap) => 
          {
              console.log(snap.data())
          })  
        })
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