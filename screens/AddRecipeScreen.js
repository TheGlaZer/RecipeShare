// screens/AddMenuScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Platform } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Container from '../components/Container';
import UploadMediaFile from '../components/ImageAdd';
import * as FileSystem from 'expo-file-system';
import { firebase } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddMenuScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [errorText, setErrorText] = useState('');

    const getUser = async () => {
        const storedUser = await AsyncStorage.getItem("User");
        return storedUser
    }

    const handleAddMenu = async () => {
        if (!validateInputs()) return
        const user = await getUser()
        await uploadMedia()
        await addDoc(collection(db, 'receipes'), {
            title,
            description,
            instructions,
            imageUrl,
            userId: user, // Replace with the actual user ID
        });
        navigation.navigate('Home');
    };

    const validateInputs = () => {
        let errors = {};

        if (!title.trim()) {
            setErrorText('Title is required');
            return false
        }

        if (!description.trim()) {
            setErrorText('Description is required');
            return false
        }

        if (!instructions.trim()) {
            setErrorText('Instructions are required');
            return false
        }

        if (!imageUrl) {
            setErrorText('Image is required');
            return false;
        }
        return true
    };

    const uploadMedia = async () => {
        try {
            let blob;
            if (Platform.OS === 'web') {
                const response = await fetch(imageUrl);
                blob = await response.blob();
            } else {
                const { uri } = await FileSystem.getInfoAsync(imageUrl);
                blob = await new Promise((res, rej) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        res(xhr.response);
                    };
                    xhr.onerror = e => {
                        rej(new TypeError('Network request failed'));
                    };
                    xhr.responseType = 'blob';
                    xhr.open('GET', uri, true);
                    xhr.send(null);
                });
            }

            const filename = `${title}Image`
            const ref = firebase.storage().ref().child(filename);
            await ref.put(blob);
            alert('Photo Uploaded!!!');
            onImageUploaded(url);
        } catch (err) {
            console.log(err);
        } finally {

        }
    };

    return (
        <Container>
            <Text style={{ fontSize: 40, fontWeight: "bold", paddingBottom: 40 }}>Add Recipe</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Instructions"
                value={instructions}
                onChangeText={setInstructions}
                multiline
            />
            <UploadMediaFile image={imageUrl} setImage={setImageUrl} />
            {errorText && <Text style={styles.errorText}>{errorText}</Text>}
            <Button title="Add Recipe" onPress={handleAddMenu} />
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh"
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 10,
        borderRadius: 4,
        height: 60,
        width: 500
    },
    errorText: {
        color: 'red',
        marginBottom: 12,
    },
});

export default AddMenuScreen;
