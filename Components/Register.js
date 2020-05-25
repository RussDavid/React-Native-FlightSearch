import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Formik } from 'formik';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

const Register = ({ navigation }) => {

    return (
        <React.Fragment>
            <RegisterForm />
            <Button title="Go To Login" onPress={() => navigation.navigate('Login')} />
            <Button title="COUNT" onPress={test} />
        </React.Fragment>
    )

}

const RegisterForm = () => (
    <Formik
        initialValues={{ username: '', password: '', password2: '' }}
        onSubmit={values => insertData(values.username, values.password, values.password2)}
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
                <Text>Re-Enter Password</Text>
                <TextInput
                    type="password"
                    onChangeText={handleChange('password2')}
                    onBlur={handleBlur('password2')}
                    value={values.password2}
                />
                <Button onPress={handleSubmit} title="Submit" />
            </View>
        )}
    </Formik>
)

const insertData = (un, pw1, pw2) => {
    if (un == '' || pw1 == '' || pw2 == '') {
        alert("Fill in all the fields");
        return;
    } else if (pw1 != pw2) {
        alert("Passwords do not match");
        return;
    } else {
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO users (username, password) VALUES (?, ?);",
                [un, pw1]
            )
        });
        alert("Account Created Successfully, redirecting to Login");
        return;
    }
}

const redirect = ({ navigation }) => {
    navigation.navigate('Login');
}

const test = () => {
    db.transaction(tx => {
        tx.executeSql(
            "SELECT COUNT(id) FROM users WHERE username='abc' AND password='123';", [], (_, { rows }) =>
            alert(JSON.stringify(rows))
        )
    })
}

const deleteAll = () => {
    db.transaction(tx => {
        tx.executeSql(
            "DELETE FROM users;"
        )
    })
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Register;
