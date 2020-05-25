import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

const Login = ({ navigation }) => {
    return (
        <React.Fragment>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={values => checkData(values.username, values.password, navigation)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <Text>Username</Text>
                        <TextInput
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                        />
                        <Text>Password</Text>
                        <TextInput
                            type="password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        <Button onPress={handleSubmit} title="Submit" />
                    </View>
                )}
            </Formik>
        </React.Fragment>
        )
}

const checkData = (un, pw, nav) => {
    db.transaction(tx => {
        tx.executeSql(
            "SELECT COUNT(id) FROM users WHERE username=? AND password=?;",
            [un, pw],
            (_, { rows }) => {
                const result = JSON.stringify(rows)
                if (result.includes('"COUNT(id)":1')) {
                    nav.navigate('Search')
                } else {
                    alert("Incorrect login details")
                }
            }
        )
    })
    return;
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Login;
