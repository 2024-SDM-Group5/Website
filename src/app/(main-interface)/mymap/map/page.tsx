'use client';

import React from 'react';

import Image from 'next/image';

import { SearchOutlined } from '@ant-design/icons';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Input, Drawer, Button, Table } from 'antd';

interface Coordinate {
	lat: number | undefined;
	lng: number | undefined;
}
const RestaurantDrawer = ({
	show,
	setShow,
}: {
	show: string | null;
	setShow: React.Dispatch<string | null>;
}) => {
	return (
		<Drawer
			mask={false}
			placement="bottom"
			open={show !== null}
			height="35%"
			rootStyle={{
				marginBottom: '40px',
			}}
			styles={{
				header: { boxShadow: '0', border: '0', backgroundColor: '#D9D9D9' },
				content: {
					borderTopLeftRadius: '30px',
					borderTopRightRadius: '30px',
				},
				body: { backgroundColor: '#D9D9D9' },
				footer: { height: '25%' },
			}}
			footer={
				<Table
					dataSource={[
						{
							key: '1',
							image: '',
							date: '2024/2/29',
							items: '漢寶寶一個',
							content: '漢寶寶裡沒有寶寶，真的很令人失望 ...',
						},
					]}
					columns={[
						{
							title: '',
							dataIndex: 'image',
							key: 'image',
							render: (text) => (
								<Image src={text} alt={text} width={39} height={39} />
							),
						},
						{
							title: '日期',
							dataIndex: 'date',
							key: 'date',
						},
						{
							title: '購買品項',
							dataIndex: 'items',
							key: 'items',
						},
						{
							title: '內容',
							dataIndex: 'content',
							key: 'content',
						},
					]}
				/>
			}
			onClose={() => setShow(null)}
		>
			<div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
				<div style={{ width: '174px', paddingLeft: '20px' }}>
					<Image src={''} alt={show + ''} width={105} height={105} />
				</div>
				<div style={{ width: 'calc(100% - 174px)', fontWeight: 500, lineHeight: 2 }}>
					<div style={{ display: 'inline' }}>某間餐廳</div>
					<br />
					<div style={{ display: 'inline' }}>大安區天堂路 999 巷 87 號</div>
					<br />
					<div style={{ display: 'inline' }}>0988888888</div>
					<br />
					<div style={{ display: 'inline' }}>
						<Button
							size="large"
							style={{ color: '#ffffff', backgroundColor: '#000000' }}
						>
							已收藏
						</Button>
					</div>
				</div>
			</div>
		</Drawer>
	);
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
	const [drawer, setDrawer] = React.useState<null | string>(null);
	return (
		<div
			style={{
				width: '100vw',
				height: 'calc(100vh - 148px)',
				marginTop: '4px',
				marginBottom: '4px',
			}}
		>
			<div className="absolute left-1/2 top-[104px] z-10 h-20 w-full max-w-xl -translate-x-1/2 transform p-5">
				<Input prefix={<SearchOutlined />} className="h-full w-full" />
			</div>
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
					<RestaurantDrawer show={drawer} setShow={setDrawer} />
				</APIProvider>
			}
		</div>
	);
}

export default HomePage;
