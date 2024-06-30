// hooks/useAuth.js
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'user';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem(USER_KEY);
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Failed to load user.', error);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);

    const saveUser = async (userData) => {
        try {
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
            setUser(userData);
        } catch (error) {
            console.error('Failed to save user.', error);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem(USER_KEY);
            setUser(null);
        } catch (error) {
            console.error('Failed to logout user.', error);
        }
    };

    return { user, loading, saveUser, logout };
};
