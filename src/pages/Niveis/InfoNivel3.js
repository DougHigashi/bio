import React from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { auth, app } from "../../../config/firebase";
import { getFirestore, collection, query, onSnapshot, limit} from 'firebase/firestore';

export default function InfoNivel3({ navigation }) {

    const [documents, setDocuments] = useState([]);
    const database = getFirestore()

     useEffect(() => {
      const queryForDocuments = query(collection(database, 'Nivel3'), limit(200))
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
    
    return (
        <View style={styles.container}>
            <Text style = {styles.texto}>Agrotóxicos</Text>
            <FlatList
                data={documents}
                renderItem={({ item }) => 
                <View>
                  <Text style={styles.item}>{"Nome: " + item.nome}</Text>
                  <Text style={styles.item}>{"Agrotóxicos Empregados nas Produções Agrícolas: " + item.agrotoxicos}</Text>
                  <Text style={styles.item}>-----------------------------------------------------------</Text>
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
      },
      title: {
        fontSize: 32,
      }
});
