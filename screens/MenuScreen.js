import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button } from 'react-native';
import Container from '../components/Container';
import pastaURI from '../assets/AlfredoPasta.jpg';
import { collection, db } from '../firebaseConfig';


const MenuScreen = ({ navigation, route, }) => {
    const { id, description, imageUrl, instructions, title, userId } = route.params;
    const [openToEdit, setOpenToEdit] = useState(false);
    const [save, setSave] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedInstructions, setEditedInstructions] = useState(instructions);

    useEffect(() => {
        setOpenToEdit(route.params.edit)
    }, [])

    const handleSave = async () => {
        debugger;
        try {
            await db.collection('receipes').doc(id).update({
                title: editedTitle,
                instructions: editedInstructions,
            });
            alert('Menu data updated successfully!');
        } catch (error) {
            alert('Error updating menu:', error);
        }
    };
    return (
        <Container navigation={navigation}>

            <Image source={imageUrl} style={styles.image} />
            {openToEdit ? (
                <>
                    <TextInput
                        style={styles.titleInput}
                        value={editedTitle}
                        onChangeText={text => setEditedTitle(text)}
                    />
                    <TextInput
                        style={styles.instructionsInput}
                        value={editedInstructions}
                        onChangeText={text => setEditedInstructions(text)}
                        multiline
                    />
                </>
            ) : (
                <>
                    <Text style={styles.title}>{editedTitle}</Text>
                    <Text style={styles.instructions}>{editedInstructions}</Text>
                </>
            )}
            {openToEdit && <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", padding: 10 }}>
                <Button title='Save' onPress={handleSave} />
            </View>}

        </Container>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 500,
        height: 500,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    instructions: {
        fontSize: 14,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    titleInput: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 3,
    },
    instructionsInput: {
        fontSize: 14,
        textAlign: 'center',
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 3,
        minHeight: 100, // Adjust height based on content
    },
});

export default MenuScreen;
