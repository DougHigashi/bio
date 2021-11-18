import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getFirestore, collection, query, onSnapshot, limit } from 'firebase/firestore';

export default function InfoNivel1({ navigation }) {

    const [documents, setDocuments] = useState([]);
    const database = getFirestore()

    useEffect(() => {
        const queryForDocuments = query(collection(database, 'Nivel1'), limit(200))
        onSnapshot(queryForDocuments, (queryS) => {
            const list = [];
            queryS.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id });
            })
            setDocuments(list)
        });
        console.log(documents)
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Produção Agrícola</Text>
            <FlatList
                data={documents}
                renderItem={({ item, index }) =>
                    <View>
                        <Text style={styles.itemTitle}> Empresa  {index + 1}</Text>
                        <Text style={styles.item}>{"Nome: " + item.nome}</Text>
                        <Text style={styles.item}>{"Produto: " + item.produto}</Text>
                        <Text style={styles.item}>{"Destino: " + item.destino}</Text>
                        <Text style={styles.item}>{"Produção anual: " + item.producaoAnual}</Text>
                        <Text style={styles.item}>{"Endereço: " + item.endereco}</Text>
                        <Text style={styles.item}>{"Nivel Automação: " + item.nivelAuto}</Text>
                        <Text style={styles.item}>{"Numero de Empregados: " + item.numeroEm}</Text>
                        <Text style={styles.item}>{"Quantidade de Maquinas: " + item.quantMaquinas}</Text>
                        <Text style={styles.item}>_____________________________________________________</Text>
                    </View>
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
        backgroundColor: '#000',
        color: '#fff',
        height: 50,
        justifyContent: 'center',
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 10,
        fontFamily: "sans-serif-thin"
    },
    itemTitle: {
        backgroundColor: '#000',
        marginVertical: 5,
        marginHorizontal: 10,
        color: '#fff',
        fontSize: 20,
        fontFamily: 'sans-serif-medium'
    }
});
