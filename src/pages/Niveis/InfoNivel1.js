import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { getFirestore, collection, query, onSnapshot, limit} from 'firebase/firestore';

export default function InfoNivel1({ navigation }) {

    const [documents, setDocuments] = useState([]);
    const database = getFirestore()

     useEffect(() => {
      const queryForDocuments = query(collection(database, 'Nivel1'), limit(200))
      onSnapshot(queryForDocuments, (queryS) => 
      {
        const list =[];
        queryS.forEach((doc) => 
        {
          list.push({ ...doc.data(), id: doc.id });
        })  
        setDocuments(list)
      });
       console.log(documents)
    },[]);

    function getItem(itemList) {
      console.log(itemList)
      return (
        <FlatList
            data = {itemList}
            renderItem={({ item }) => 
              <Text style={styles.item}>{item.produto}</Text>}
        />
      );
    }

    return (
        <View style={styles.container}>
            <Text style = {styles.texto}>Produção Agrícola</Text>
            <FlatList
                data={documents}
                renderItem={({ item }) => 
                <TouchableOpacity onPress={() => {getItem(item)}}>
                  <Text style={styles.item}>{item.nome}</Text>
                </TouchableOpacity>
                }
            />
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
    }, item: {
        backgroundColor: '#f9c2ff',
        height: 150,
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
      },
      title: {
        fontSize: 32,
      }
});
