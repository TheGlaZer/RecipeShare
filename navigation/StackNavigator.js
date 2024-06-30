// navigation/StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MenuScreen from '../screens/MenuScreen'
import AddMenuScreen from '../screens/AddRecipeScreen'
import MyRecipes from '../screens/MyRecipes'

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="AddMenu" component={AddMenuScreen} />
            <Stack.Screen name="Menu" component={MenuScreen} />
            <Stack.Screen name="MyRecipes" component={MyRecipes} />
        </Stack.Navigator>
    );
};

export default StackNavigator;
