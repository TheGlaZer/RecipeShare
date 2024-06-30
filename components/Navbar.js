import React from 'react'
import { Button, TouchableOpacity, View, StyleSheet, Text } from 'react-native-web'
import { useCheckLogin } from '../hooks/useCheckLogin';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Navbar() {
    const { loggedIn } = useCheckLogin()
    const navigation = useNavigation();

    const handleLogOut = () => {
        AsyncStorage.removeItem('User')
        navigation.navigate('Login')
    }

    return (
        <View style={styles.navbar}>
            <View style={{ display: "flex", alignItems: "center", flexDirection: "row", gap: 10 }}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Recipe Share</Text>
            </View>
            {loggedIn ?
                <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: 'center' }}>
                    <Button
                        title='My Recipes'
                        onPress={() => navigation.navigate('MyRecipes')} />
                    <Button
                        title='Add Recipe'
                        onPress={() => navigation.navigate('AddMenu')} />
                    <Button
                        title='Profile'
                        onPress={() => navigation.navigate('Profile')} />
                    <Button
                        title='Log Out'
                        onPress={handleLogOut} />
                </View>
                :
                <>
                    <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: 'center' }}>
                        <Button
                            title='Login'
                            onPress={() => navigation.navigate('Login')} />
                        <Button
                            title='Sign Up'
                            onPress={() => navigation.navigate('Signup')} />
                    </View>

                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
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

export default Navbar
