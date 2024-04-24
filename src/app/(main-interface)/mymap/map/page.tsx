'use client';

import { useState, useEffect } from 'react';

import { useSession } from 'next-auth/react';

import { APIProvider } from '@vis.gl/react-google-maps';
import axios from 'axios';

import MapContent from '@/components/MapContent';

function MyMapPage() {
	const [id, setId] = useState<number | null>(null);
	const session = useSession();
	useEffect(() => {
		let FetchId = async () => {
			let res = await axios.get(
				'https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/users/me',
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
			{id && <MapContent id={`${id}`} />}
		</APIProvider>
	);
}

export default MyMapPage;
