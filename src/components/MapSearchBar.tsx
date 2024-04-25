import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Input, AutoComplete } from 'antd';
import axios from 'axios';

interface Restaurant {
	placeId: string;
	name: string;
	location: {
		lat: number;
		lng: number;
	};
	address: string;
	telephone: string;
	rating: number;
	viewCount: number;
	collectCount: number;
	likeCount: number;
	dislikeCount: number;
	hasCollected: boolean;
}
interface Option {
	label: string;
	value: string;
	restaurant: Restaurant;
}
function MapSearchBar({
	map,
	map_id,
	setDrawer,
}: {
	map: google.maps.Map;
	map_id: string;
	setDrawer: Dispatch<SetStateAction<string | null>>;
}) {
	const [search, setSearch] = useState('');
	const [options, setOptions] = useState<Array<Option>>([]);
	useEffect(() => {
		const FetchData = async () => {
			let suffix = '';
			if (search) suffix = `&q=${search}`;
			const res = await axios.get(
				`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/maps/${map_id}/restaurants?limit=10` +
					suffix,
			);
			let tmp = [];
			for (let i = 0; i < res?.data.restaurants.length; i++) {
				tmp.push({
					label: res?.data.restaurants[i].name,
					value: res?.data.restaurants[i].name,
					restaurant: res?.data.restaurants[i],
				} as Option);
			}
			setOptions(tmp);
		};
		FetchData();
	}, [search]);
	return (
		<AutoComplete
			className="h-full w-[80%]"
			options={options}
			onSelect={(value, option) => {
				if (map) {
					map.panTo(
						new google.maps.LatLng(
							option.restaurant.location.lat,
							option.restaurant.location.lng,
						),
					);
				}
				setDrawer(option.restaurant.placeId);
			}}
		>
			<Input
				prefix={<SearchOutlined className="text-lg" />}
				className="h-12"
				onChange={(e) => {
					setSearch(e.target.value);
				}}
			/>
		</AutoComplete>
	);
}
export default MapSearchBar;
