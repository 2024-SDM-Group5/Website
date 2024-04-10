'use client';

import React from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import GoogleMapReact from 'google-map-react';

interface Coordinate {
	lat: number | undefined;
	lng: number | undefined;
}
const Marker = ({ lat, lng }: { lat: Number; lng: Number }) => {
	return <div className="marker" />;
};
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
	return (
		<div
			style={{
				width: '100vw',
				height: 'calc(100vh - 148px)',
				marginTop: '4px',
				marginBottom: '4px',
			}}
		>
			<div
				className="w-full"
				style={{
					padding: '5px',
					paddingTop: '9px',
					position: 'absolute',
					top: '104px',
					zIndex: 10,
				}}
			>
				<Input prefix={<SearchOutlined />} />
			</div>

			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyCZR4VCUOau8mVfA7CmTg9rMM6BpJF8f9o' }}
				defaultCenter={{
					lat: 10.99835602,
					lng: 77.01502627,
				}}
				defaultZoom={9}
				yesIWantToUseGoogleMapApiInternals
				onDragEnd={(map: google.maps.Map) => {
					let ne = map.getBounds()?.getNorthEast();
					let sw = map.getBounds()?.getSouthWest();
					setBound([
						{ lat: ne?.lat(), lng: ne?.lng() },
						{ lat: sw?.lat(), lng: sw?.lng() },
					]);
				}}
			>
				<>
					<Marker lat={10.99835602} lng={70.01502627} />
				</>
			</GoogleMapReact>
		</div>
	);
}

export default HomePage;
