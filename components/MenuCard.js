// components/MenuCard.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput } from 'react-native';
import pastaURI from '../assets/AlfredoPasta.jpg'

const MenuCard = ({ title, description, instructions, userId, imageUrl, editable = false }) => {

    return (
        <View style={styles.card}>
            <Image source={imageUrl} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.instructions}>{instructions}</Text>
                <Text style={styles.userId}>User ID: {userId}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 300,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 20
    },
    image: {
        width: '100%',
        height: 150,
    },
    textContainer: {
        display: "flex",
        justifyContent: "space-around",
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    instructions: {
        fontSize: 14,
        color: '#888',
        marginBottom: 5,
    },
    userId: {
        fontSize: 12,
        color: '#aaa',
    },
});

export default MenuCard;
