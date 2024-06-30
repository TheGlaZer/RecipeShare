// hooks/useCheckLogin.js
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCheckLogin = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const storedUser = await AsyncStorage.getItem("User");
            if (storedUser) {
                setLoggedIn(true);
            }
        } catch (error) {
            console.error('Failed to load user.', error);
            setLoggedIn(false);
        } finally {
            setLoading(false);
        }
    };

    return { loggedIn, loading };
};
