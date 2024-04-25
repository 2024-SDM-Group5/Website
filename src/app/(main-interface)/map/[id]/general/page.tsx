'use client';

import { useState, useEffect } from 'react';

import { useParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import { APIProvider } from '@vis.gl/react-google-maps';

import MapContent from '@/components/MapContent';

function MapPage() {
	const params = useParams<{ id: string; center: string }>();
	const search = useSearchParams();
	const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);
	useEffect(() => {
		const tmp = search.get('center');
		if (!tmp) {
			navigator.geolocation.getCurrentPosition((position) => {
				setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
			});
		} else
			setCenter({ lat: parseFloat(tmp.split(',')[0]), lng: parseFloat(tmp.split(',')[1]) });
	}, [search]);
	return (
		<APIProvider
			apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY as string}
			libraries={['geometry']}
		>
			{center && <MapContent id={params.id} center={center} />}
		</APIProvider>
	);
}

export default MapPage;
