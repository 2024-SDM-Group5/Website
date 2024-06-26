'use client';

import React, { useEffect } from 'react';

import { Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';

import LotteryFloatButton from '@/components/FloatButton';
import LotteryModal from '@/components/LotteryModal';
import MapInfoHoverCard from '@/components/MapInfoHoverCard';
import MapSearchBar from '@/components/MapSearchBar';
import RestaurantDrawer from '@/components/RestaurantDrawer';
import axios from '@/lib/axios';

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

const MapContent = ({ id, center }: { id: string; center: { lat: number; lng: number } }) => {
	const [bounds, setBounds] = React.useState<Array<google.maps.LatLng | undefined> | null>(null);
	const [drawer, setDrawer] = React.useState<null | string>(null);
	const [modal, setModal] = React.useState<boolean>(false);
	const map = useMap();
	const [restaurants, setRestaurants] = React.useState<Array<Restaurant>>([]);
	useEffect(() => {
		const FetchRestaurant = async () => {
			if (bounds) {
				let url = `/api/v1/maps/${id}/restaurants?sw=${bounds[0]?.lat()},${bounds[0]?.lng()}&ne=${bounds[1]?.lat()},${bounds[1]?.lng()}&limit=50`;
				if (id === '0') {
					url = `/api/v1/restaurants?sw=${bounds[0]?.lat()},${bounds[0]?.lng()}&ne=${bounds[1]?.lat()},${bounds[1]?.lng()}&limit=50`;
				}
				const res = await axios.get(url);
				setRestaurants(res?.data.restaurants);
			}
		};
		FetchRestaurant();
	}, [bounds, id]);
	return (
		<div className="h-full w-full">
			<div className="absolute z-10 flex w-full items-center justify-around p-4">
				<MapSearchBar map_id={id} map={map as google.maps.Map} setDrawer={setDrawer} />
				{id !== '0' && <MapInfoHoverCard mapId={id} />}
			</div>

			<Map
				onClick={() => setDrawer(null)}
				disableDefaultUI={true}
				mapId="1234"
				defaultZoom={15}
				defaultCenter={center}
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
				{restaurants.map((x, i) => {
					return (
						<>
							<AdvancedMarker
								key={i}
								position={x.location}
								onClick={() => setDrawer(x.placeId)}
							>
								<Pin />
							</AdvancedMarker>
							<div data-testid={'marker' + i} />
						</>
					);
				})}
			</Map>
			<RestaurantDrawer newDiary={true} show={drawer} setShow={setDrawer} />
			<LotteryFloatButton onClick={() => setModal(true)} />
			<LotteryModal open={modal} onCancel={() => setModal(false)} />
		</div>
	);
};
export default MapContent;
