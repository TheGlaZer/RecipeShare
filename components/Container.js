// components/Container.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCheckLogin } from '../hooks/useCheckLogin';
import { useNavigation } from '@react-navigation/native';
import Navbar from './Navbar';

const Container = ({ children }) => {
    return (
        <>
            <Navbar />
            <View style={styles.container}>
                {children}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        // flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E3F2FD', // Very light blue background
        // padding: 20,
        height: 900,
    },
    backButton: {
        justifyContent: 'center',
    },
    navbar: {
        height: 50,
        backgroundColor: "white",
        width: "100%",
        gap: 100,
        padding: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
    }
});

export default Container;
