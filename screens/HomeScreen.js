// screens/HomeScreen.js
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { db } from './../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import MenuCard from '../components/MenuCard';
import Container from '../components/Container';
import { useAuth } from '../hooks/useAuth';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const [menus, setMenus] = useState([]);
    // const { user } = useAuth()

    const fetchMenus = async () => {
        debugger;
        const menuCollection = collection(db, 'receipes');
        const menuSnapshot = await getDocs(menuCollection);
        const menuList = menuSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMenus(menuList);
    };

    useEffect(() => {
        fetchMenus();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Menu', item)}
        >
            <MenuCard
                title={item.title}
                description={item.description}
                instructions={item.instructions}
                userId={item.userId}
                imageUrl={item.imageUrl}
            />
        </TouchableOpacity>
    );

    return (
        <Container key={'HomeScreen'}>
            <FlatList
                data={menus}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.flatList} // Additional style to control FlatList's layout
                contentContainerStyle={styles.flatListContent}
                showsVerticalScrollIndicator={false}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    flatList: {
        flex: 1, // Ensure FlatList takes available space
        marginBottom: 100
    },
    flatListContent: {
        paddingBottom: 20, // Add padding to bottom of list
        alignItems: 'center', // Center content horizontally
        flex: 1,
    },
    menuItem: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 10,
        width: '100%', // Ensure the menu item takes full width of FlatList
        maxWidth: 700, // Optional: Restrict maximum width
    },
    menuTitle: {
        fontSize: 18,
    },
    addButton: {
        backgroundColor: '#2196F3',
        borderRadius: 8,
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20, // Margin below the add button
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default HomeScreen;
