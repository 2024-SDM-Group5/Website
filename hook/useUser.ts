import { useState } from 'react';
import axios from 'axios';

interface LoginResponse {
    userId: number;
    isNew: boolean;
}

export const useUser = () => {
    const [data, setData] = useState<LoginResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const login = async (idToken: string) => {
        setLoading(true);
        try {
            const response = await axios.post<LoginResponse>('/api/v1/users/login', {
                idToken: idToken
            });
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to login:', error);
            setError(new Error('Login failed'));
            setLoading(false);
        }
    };

    return { data, loading, error, login };
};

