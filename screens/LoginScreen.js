import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Container from '../components/Container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormValidationError } from '../hooks/useFormValidationError';


const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { errors, validateForm } = useFormValidationError(email, password)

    const signIn = async () => {

        if (!validateForm()) return

        try {
            await auth.signInWithEmailAndPassword(email, password);
            await AsyncStorage.setItem("User", email);
            navigation.navigate('Home');
        } catch (error) {
            alert(error.message)
            // Handle specific errors if needed
        }
    };



    return (
        <Container key={'LoginScreen'}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <View style={{ flexDirection: "row", gap: 10 }}>
                <Button title="Login" onPress={signIn} />
                <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
            </View>

            {errors.map(error => <>
                <Text style={{ color: "red" }}>{error}</Text>
            </>)}
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        gap: 15,
        width: "70%"
    },
    title: {
        fontSize: 45,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        width: 300,
        paddingHorizontal: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default LoginScreen;
