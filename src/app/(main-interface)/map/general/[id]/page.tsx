'use client';

import React, { useEffect } from 'react';

import { useParams } from 'next/navigation';

import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import axios from 'axios';

import LotteryFloatButton from '@/components/FloatButton';
import LotteryModal from '@/components/LotteryModal';
import MapInfoHoverCard from '@/components/MapInfoHoverCard';
import MapSearchBar from '@/components/MapSearchBar';
import RestaurantDrawer from '@/components/RestaurantDrawer';

interface Restaurant {
	name: string;
	address: string;
	location: {
		lat: number;
		lng: number;
	};
	telephone: string;
	rating: number;
	placeId: string;
	viewCount: number;
	favCount: number;
}
function HomePage() {
	const [center, setCenter] = React.useState<google.maps.LatLng | null>(null);
	const [bounds, setBounds] = React.useState<Array<google.maps.LatLng | undefined> | null>(null);
	const [drawer, setDrawer] = React.useState<null | string>(null);
	const [modal, setModal] = React.useState<boolean>(false);
	const [restaurants, setRestaurants] = React.useState<Array<Restaurant>>([]);
	const params = useParams<{ id: string }>();
	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
		});
	}, []);
	useEffect(() => {
		const FetchRestaurant = async () => {
			if (bounds) {
				const res = await axios.get(
					`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/maps/${params.id}/restaurants?sw=${bounds[0]?.lat()},${bounds[0]?.lng()}&ne=${bounds[1]?.lat()},${bounds[1]?.lng()}`,
				);
				setRestaurants(res?.data.restaurants);
			}
		};
		FetchRestaurant();
	}, [bounds]);
	return (
		<div className="h-full w-full">
			<div className="absolute z-10 flex w-full justify-around p-4">
				<MapSearchBar />
				<MapInfoHoverCard mapId={params.id} />
			</div>

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
							onTilesLoaded={(e) => {
								const SW = e.map.getBounds()?.getSouthWest();
								const NE = e.map.getBounds()?.getNorthEast();
								setBounds([SW, NE]);
							}}
							onZoomChanged={(e) => {
								const SW = e.map.getBounds()?.getSouthWest();
								const NE = e.map.getBounds()?.getNorthEast();
								setBounds([SW, NE]);
								setCenter(e.map.getCenter() as google.maps.LatLng);
							}}
							onDragend={(e) => {
								const SW = e.map.getBounds()?.getSouthWest();
								const NE = e.map.getBounds()?.getNorthEast();
								setBounds([SW, NE]);
								setCenter(e.map.getCenter() as google.maps.LatLng);
							}}
						>
							{restaurants.map((x, i) => (
								<AdvancedMarker
									key={i}
									position={x.location}
									onClick={() => setDrawer(x.placeId)}
								>
									<Pin />
								</AdvancedMarker>
							))}
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
