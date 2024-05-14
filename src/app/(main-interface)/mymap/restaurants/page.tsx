'use client';

import { useState, useEffect } from 'react';

import { useSession } from 'next-auth/react';

import { APIProvider } from '@vis.gl/react-google-maps';

import RestaurantList from '@/components/RestaurantList';
import axios from '@/lib/axios';

function MyRestaurantPage() {
	const [id, setId] = useState<number | null>(null);
	const session = useSession();
	useEffect(() => {
		let FetchId = async () => {
			let res = await axios.get(
				'/api/v1/users/me',
				{
					headers: { Authorization: `Bearer ${session.data?.idToken}` },
				},
			);
			setId(res.data.mapId);
		};
		FetchId();
	}, []);
	return (
		<APIProvider
			apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY as string}
			libraries={['geometry']}
		>
			{id && <RestaurantList id={`${id}`} type="me" />}
		</APIProvider>
	);
}

export default MyRestaurantPage;
