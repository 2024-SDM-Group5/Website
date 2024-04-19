'use client';

import React, { useEffect } from 'react';

import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import axios from 'axios';

import LotteryFloatButton from '@/components/FloatButton';
import LotteryModal from '@/components/LotteryModal';
import MapSearchBar from '@/components/MapSearchBar';
import RestaurantDrawer from '@/components/RestaurantDrawer';

function HomePage() {
	const [center, setCenter] = React.useState<google.maps.LatLng | null>(null);
	const [radius, setRadius] = React.useState<number>(0);
	const [drawer, setDrawer] = React.useState<null | string>(null);
	const [modal, setModal] = React.useState<boolean>(false);
	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
		});
	}, []);
	return (
		<div className="h-full w-full">
			<MapSearchBar />
			<APIProvider
				apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY as string}
				libraries={['geometry']}
			>
				{center && (
					<>
						<Map
							onClick={() => setDrawer(null)}
							disableDefaultUI={true}
							mapId="1234"
							defaultZoom={15}
							defaultCenter={{
								lat: center?.lat(),
								lng: center?.lng(),
							}}
							onZoomChanged={(e) => {
								const SW = e.map.getBounds()?.getSouthWest();
								const NE = e.map.getBounds()?.getNorthEast();
								const neRadius =
									google.maps.geometry.spherical.computeDistanceBetween(
										e.map?.getCenter() as google.maps.LatLng,
										NE as google.maps.LatLng,
									);
								const swRadius =
									google.maps.geometry.spherical.computeDistanceBetween(
										e.map?.getCenter() as google.maps.LatLng,
										SW as google.maps.LatLng,
									);
								setRadius(neRadius <= swRadius ? swRadius : neRadius);
								setCenter(e.map.getCenter() as google.maps.LatLng);
							}}
							onDragend={(e) => {
								const SW = e.map.getBounds()?.getSouthWest();
								const NE = e.map.getBounds()?.getNorthEast();
								const neRadius =
									google.maps.geometry.spherical.computeDistanceBetween(
										e.map?.getCenter() as google.maps.LatLng,
										NE as google.maps.LatLng,
									);
								const swRadius =
									google.maps.geometry.spherical.computeDistanceBetween(
										e.map?.getCenter() as google.maps.LatLng,
										SW as google.maps.LatLng,
									);
								setRadius(neRadius <= swRadius ? swRadius : neRadius);
								setCenter(e.map.getCenter() as google.maps.LatLng);
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
					</>
				)}
			</APIProvider>
		</div>
	);
}

export default HomePage;
