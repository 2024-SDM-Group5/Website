'use client';

import React from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Input } from 'antd';

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
			{
				<APIProvider apiKey="AIzaSyCZR4VCUOau8mVfA7CmTg9rMM6BpJF8f9o">
					<Map
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
						>
							<Pin/>
						</AdvancedMarker>
					</Map>
				</APIProvider>
			}
		</div>
	);
}

export default HomePage;
