'use client';

import { useParams } from 'next/navigation';

import { APIProvider } from '@vis.gl/react-google-maps';
import MapContent from '@/components/MapContent';

function MapPage() {
	const params = useParams<{ id: string }>();

	return (
		<APIProvider
			apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY as string}
			libraries={['geometry']}
		>
			<MapContent id={params.id} />
		</APIProvider>
	);
}

export default MapPage;
