import 'react-native-gesture-handler';
import React from 'react';
import { LogBox, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/pages/Login.js';
import Cadastro from './src/pages/Cadastro.js';
import Info from './src/pages/Info.js';
import User from './src/pages/User.js';
import InfoNivel1 from './src/pages/Niveis/InfoNivel1.js'
import InfoNivel2 from './src/pages/Niveis/InfoNivel2.js'
import InfoNivel3 from './src/pages/Niveis/InfoNivel3.js'

LogBox.ignoreLogs(["Setting a timer", "AsyncStorage has been extracted from react-native core and will be removed in a future release."]);

export default function App() {


  const Stack = createNativeStackNavigator();

  return (
    <View style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
          <Stack.Screen name="Info" component={Info} options={{ headerShown: false }} />
          <Stack.Screen name="User" component={User} options={{ headerShown: false }} />
          <Stack.Screen name="InfoNivel1" component={InfoNivel1} options={{ headerShown: false }} />
          <Stack.Screen name="InfoNivel2" component={InfoNivel2} options={{ headerShown: false }} />
          <Stack.Screen name="InfoNivel3" component={InfoNivel3} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer >
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  }
});