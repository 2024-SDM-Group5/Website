import { useState, useEffect } from 'react';

import axios from '@/lib/axios';

interface LoginResponse {
	userId: number;
	isNew: boolean;
}

export const useUser = (idToken: string) => {
	const [userId, setUserId] = useState<number | null>(null);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.post<LoginResponse>('/api/v1/users/login', {
					idToken,
				});
				setUserId(response.data.userId);
			} catch (error) {
				console.error('Failed to login:', error);
			}
		};
		fetchData();
	}, [idToken]);

	return userId;
};
