'use client';

import React, { useEffect } from 'react';

import { Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
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

const MapContent = ({ id }: { id: string }) => {
	const [bounds, setBounds] = React.useState<Array<google.maps.LatLng | undefined> | null>(null);
	const [drawer, setDrawer] = React.useState<null | string>(null);
	const [modal, setModal] = React.useState<boolean>(false);
	const map = useMap();
	const [restaurants, setRestaurants] = React.useState<Array<Restaurant>>([]);
	useEffect(() => {
		if (map) {
			navigator.geolocation.getCurrentPosition((position) => {
				map?.setCenter(
					new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
				);
			});
		}
	}, [map]);
	useEffect(() => {
		const FetchRestaurant = async () => {
			if (bounds) {
				const res = await axios.get(
					`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/maps/${id}/restaurants?sw=${bounds[0]?.lat()},${bounds[0]?.lng()}&ne=${bounds[1]?.lat()},${bounds[1]?.lng()}`,
				);
				setRestaurants(res?.data.restaurants);
			}
		};
		FetchRestaurant();
	}, [bounds]);
	return (
		<div className="h-full w-full">
			<div className="absolute z-10 flex w-full justify-around p-4">
				<MapSearchBar map_id={id} map={map as google.maps.Map} setDrawer={setDrawer} />
				<MapInfoHoverCard mapId={id} />
			</div>

			<Map
				onClick={() => setDrawer(null)}
				disableDefaultUI={true}
				mapId="1234"
				defaultZoom={15}
				defaultCenter={{ lat: 25, lng: 120 }}
				onTilesLoaded={(e) => {
					const SW = e.map.getBounds()?.getSouthWest();
					const NE = e.map.getBounds()?.getNorthEast();
					setBounds([SW, NE]);
				}}
				onZoomChanged={(e) => {
					const SW = e.map.getBounds()?.getSouthWest();
					const NE = e.map.getBounds()?.getNorthEast();
					setBounds([SW, NE]);
				}}
				onDragend={(e) => {
					const SW = e.map.getBounds()?.getSouthWest();
					const NE = e.map.getBounds()?.getNorthEast();
					setBounds([SW, NE]);
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
		</div>
	);
};
export default MapContent;