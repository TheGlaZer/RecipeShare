// hooks/useCheckLogin.js
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'user';

export const useSetLogin = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const storedUser = await AsyncStorage.setItem(USER_KEY);
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

        checkUser();
    }, []);

    return { loggedIn, loading };
};
