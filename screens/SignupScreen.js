// screens/SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Container from '../components/Container';
import { useFormValidationError } from '../hooks/useFormValidationError';

const SignupScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { errors, validateForm } = useFormValidationError(email, password)

    const handleSignup = () => {

        if (!validateForm()) return
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                console.log('Signed up:', user);
            })
            .catch((error) => {
                setError(error.message);
            });
    };
    return (
        <Container>
            <Text style={styles.title}>Signup</Text>
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
                <Button title="Signup" onPress={handleSignup} />
                <Button title="Login" onPress={() => navigation.navigate('Login')} />
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
        paddingHorizontal: 10,
    },
});

export default SignupScreen;
