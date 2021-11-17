import React from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { auth, app } from "../../../config/firebase";
import { getFirestore, collection, query, onSnapshot, limit} from 'firebase/firestore';

export default function InfoNivel2({ navigation }) {

    const [documents, setDocuments] = useState([]);
    const database = getFirestore()

     useEffect(() => {
      const queryForDocuments = query(collection(database, 'Nivel2'), limit(200))
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
            <Text style = {styles.texto}>Informações Fiscais</Text>
            <FlatList
                data={documents}
                renderItem={({ item }) => 
                <View>
                  <Text style={styles.item}>{"Nome: " + item.nome}</Text>
                  <Text style={styles.item}>{"Incentivos Fiscais Recebidos: " + item.incentivos}</Text>
                  <Text style={styles.item}>{"Impostos Municipais Pagos: " + item.impostosMunicipais}</Text>
                  <Text style={styles.item}>{"Impostos Estaduais Recolhidos: " + item.impostosEstaduais}</Text>
                  <Text style={styles.item}>{"Impostos Federais Pagos: " + item.impostosFederais}</Text>
                  <Text style={styles.item}>{"Taxas Federais Pagas: " + item.taxasFedeais}</Text>
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
