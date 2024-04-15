'use client';

import React from 'react';


import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

import MapSearchBar from '@/components/MapSearchBar';
import RestaurantDrawer from '@/components/RestaurantDrawer';
import LotteryFloatButton from '@/components/FloatButton';
import LotteryModal from '@/components/LotteryModal';
interface Coordinate {
	lat: number | undefined;
	lng: number | undefined;
}
function HomePage() {
	const [bound, setBound] = React.useState<Array<Coordinate>>([
		{
			lat: 10.99835602,
			lng: 77.01502627,
		},
		{
			lat: 10.99835602,
			lng: 77.01502627,
		},
	]);
	const [drawer, setDrawer] = React.useState<null | string>(null);
	const [modal, setModal] = React.useState<boolean>(false);
	return (
		<div
			style={{
				width: '100vw',
				height: 'calc(100vh - 148px)',
				marginTop: '4px',
				marginBottom: '4px',
			}}
		>
			<MapSearchBar />
			{
				<APIProvider apiKey="AIzaSyCZR4VCUOau8mVfA7CmTg9rMM6BpJF8f9o">
					<Map
						onClick={() => setDrawer(null)}
						disableDefaultUI={true}
						mapId="1234"
						defaultZoom={9}
						defaultCenter={{
							lat: 10.99835602,
							lng: 77.01502627,
						}}
					>
						<AdvancedMarker
							position={{
								lat: 10.99835602,
								lng: 77.01502627,
							}}
							onClick={() => setDrawer('1234')}
						>
							<Pin />
						</AdvancedMarker>
					</Map>
					<RestaurantDrawer newDiary={false} show={drawer} setShow={setDrawer} />
					<LotteryFloatButton onClick={() => setModal(true)} />
					<LotteryModal open={modal} onCancel={() => setModal(false)} />
				</APIProvider>
			}
		</div>
	);
}

export default HomePage;
