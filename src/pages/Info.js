import React from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, app } from "../../config/firebase";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function Info({ navigation }) {

    const id = auth.currentUser.uid;

    const database = getFirestore(app)

    async function getList(infoNivel) {
        const col = doc(database, 'levelUsers/' + id)
        const snapshot = await getDoc(col);
        const list = snapshot.data();
        try{
        if(list.Nivel === '3'){
            console.log(infoNivel)
            switch (infoNivel){
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
        else if (list.Nivel === '2'){
            switch (infoNivel){
                 case 'N1':
                     navigation.navigate("InfoNivel1");
                     break;
                 case 'N2':
                     navigation.navigate("InfoNivel2");
                     break;
               default:
                 Alert.alert('OPS!','Usuario sem permisão!')
                 break;
            }
        } else if (list.Nivel === '1'){
            switch (infoNivel){
                case 'N1':
                    navigation.navigate("InfoNivel1");
                    break;
              default:
                Alert.alert('OPS!','Usuario sem permisão!')
                break;
           }
        }}catch(error){
            switch(error.code){
                case undefined:
                    switch (infoNivel){
                        case 'N1':
                            navigation.navigate("InfoNivel1");
                            break;
                      default:
                        Alert.alert('OPS!','Usuario sem permisão!')
                        break;
                   }
                default:
                    break;
            }
        }
    }
    

    return (
        <View style={styles.container}>
            <Text style = {styles.texto}>Informações:</Text>
            <TouchableOpacity onPress={() => {getList('N1')}}style={styles.button}>
                <Text style={styles.texto}>Produção Agrícola</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {getList('N2')}}style={styles.button}>
                <Text style={styles.texto}>Informações Fiscais</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {getList('N3')}}style={styles.button}>
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