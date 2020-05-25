import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './Components/Register';
import Home from './Components/Home';
import Login from './Components/Login';
import SearchForm from './Components/SearchForm';
import * as SQLite from 'expo-sqlite';

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Flight Search Engine Home"
        component={Home} 
      />
      <Stack.Screen
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="Register"
        component={Register}
      />
      <Stack.Screen
        name="Search"
        component={SearchForm}
      />
    </Stack.Navigator>
  )
}

const db = SQLite.openDatabase("db.db");

const App = () => {

  useEffect(() => {
    // Create the users table
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, username TEXT, password TEXT);"
      );
    });

    // Insert a user for testing purposes
    db.transaction(tx => {
      tx.executeSql(
        "REPLACE INTO users (id, username, password) VALUES (0, 'test', 'pass');"
      );
    })
  });

  return (
    <NavigationContainer>
      <StackNav/>
    </NavigationContainer>
  );
}

export default App;
