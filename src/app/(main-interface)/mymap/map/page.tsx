'use client';

import { useState, useEffect } from 'react';

import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

import { APIProvider } from '@vis.gl/react-google-maps';
import axios from 'axios';

import MyMapContent from '@/components/MyMapContent';

function MyMapPage() {
	const [id, setId] = useState<number | null>(null);
	const session = useSession();
	const search = useSearchParams();
	const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);
	useEffect(() => {
		let FetchId = async () => {
			let res = await axios.get(
				'https://mainserver-service:8080/api/v1/users/me',
				{
					headers: { Authorization: `Bearer ${session.data?.idToken}` },
				},
			);
			setId(res.data.mapId);
		};
		FetchId();
		const tmp = search.get('center');
		if (!tmp) {
			navigator.geolocation.getCurrentPosition((position) => {
				setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
			});
		} else {
			setCenter({ lat: parseFloat(tmp.split(',')[0]), lng: parseFloat(tmp.split(',')[1]) });
		}
	}, [search, session]);
	return (
		<APIProvider
			apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY as string}
			libraries={['geometry']}
		>
			{id && center && <MyMapContent id={`${id}`} center={center} />}
		</APIProvider>
	);
}

export default MyMapPage;
