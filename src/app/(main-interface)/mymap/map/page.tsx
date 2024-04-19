'use client';

import React from 'react';

import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

import LotteryFloatButton from '@/components/FloatButton';
import LotteryModal from '@/components/LotteryModal';
import MapSearchBar from '@/components/MapSearchBar';
import RestaurantDrawer from '@/components/RestaurantDrawer';

interface Coordinate {
	lat: number | undefined;
	lng: number | undefined;
}
function HomePage() {
	const [bound, setBound] = React.useState<Array<Coordinate>>([
		{
			lat: 25.016375,
			lng: 121.536792,
		},
		{
			lat: 25.016375,
			lng: 121.536792,
		},
	]);
	const [drawer, setDrawer] = React.useState<null | string>(null);
	const [modal, setModal] = React.useState<boolean>(false);
	return (
		<div className="mb-1 h-[calc(100vh-148px)] w-screen">
			<MapSearchBar />
			{
				<APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY as string}>
					<Map
						onClick={() => setDrawer(null)}
						disableDefaultUI={true}
						mapId="1234"
						defaultZoom={15}
						defaultCenter={{
							lat: 25.016375,
							lng: 121.536792,
						}}
					>
						<AdvancedMarker
							position={{
								lat: 25.016375,
								lng: 121.536792,
							}}
							onClick={() => setDrawer('1234')}
						>
							<Pin />
						</AdvancedMarker>
					</Map>
					<RestaurantDrawer newDiary={true} show={drawer} setShow={setDrawer} />
					<LotteryFloatButton onClick={() => setModal(true)} />
					<LotteryModal open={modal} onCancel={() => setModal(false)} />
				</APIProvider>
			}
		</div>
	);
}

export default HomePage;
