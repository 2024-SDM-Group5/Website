'use client';

import React, { MouseEventHandler, useEffect } from 'react';

import Image from 'next/image';

import { SearchOutlined } from '@ant-design/icons';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Input, Drawer, Button, Table, Modal } from 'antd';

import lottery from './fluent_lottery-20-filled.png';

interface Coordinate {
	lat: number | undefined;
	lng: number | undefined;
}
const LotteryModal = ({ open, onCancel }: { open: boolean; onCancel: Function }) => {
	const [restaurantID, setID] = React.useState<string | null>(null);
	useEffect(() => {
		if (!open) setID(null);
	}, [open]);
	return (
		<Modal
			open={open}
			onCancel={onCancel as (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void}
			footer={null}
			centered={true}
			width="80vw"
			styles={{ body: { textAlign: 'center', justifyContent: 'center' } }}
		>
			{restaurantID === null ? (
				<>
					<p style={{ paddingTop: '80px', paddingBottom: '50px', fontSize: '20px' }}>
						想不到要吃什麼嗎？
					</p>
					<Button
						onClick={() => setID('1234')}
						style={{
							color: '#ffffff',
							backgroundColor: '#000000',
							width: '60vw',
							marginBottom: '15px',
						}}
					>
						隨機推薦
					</Button>
					<br />
					<Button
						onClick={() => setID('1234')}
						style={{
							color: '#ffffff',
							backgroundColor: '#000000',
							width: '60vw',
							marginBottom: '45px',
						}}
					>
						智慧推薦
					</Button>
				</>
			) : (
				<>
					<div
						style={{
							width: '100%',
							display: 'flex',
							flexDirection: 'row',
							paddingBottom: '50px',
							paddingTop: '30px',
						}}
					>
						<div style={{ width: '110px' }}>
							<Image src={''} alt={''} width={86} height={86} />
						</div>
						<div
							style={{
								width: 'calc(100% - 110px)',
								fontWeight: 500,
								lineHeight: 2,
								textAlign: 'start',
							}}
						>
							<div style={{ display: 'inline' }}>某間餐廳</div>
							<br />
							<div style={{ display: 'inline' }}>大安區天堂路 999 巷 87 號</div>
							<br />
							<div style={{ display: 'inline' }}>0988888888</div>
						</div>
					</div>
					<Button
						onClick={() => setID('1234')}
						style={{
							color: '#ffffff',
							backgroundColor: '#000000',
							width: '60vw',
							marginBottom: '15px',
						}}
					>
						詳細資訊
					</Button>
					<br />
					<Button
						onClick={() => setID('1234')}
						style={{
							color: '#ffffff',
							backgroundColor: '#000000',
							width: '60vw',
							marginBottom: '45px',
						}}
					>
						重新生成
					</Button>
				</>
			)}
		</Modal>
	);
};
const FloatButton = ({ onClick }: { onClick: Function }) => {
	return (
		<div
			onClick={onClick as MouseEventHandler}
			style={{
				width: '70px',
				height: '70px',
				position: 'absolute',
				right: 25,
				bottom: 76,
				backgroundColor: '#D9D9D9',
				paddingTop: '11px',
				paddingLeft: '11px',
				borderRadius: '35px',
			}}
		>
			<Image src={lottery} alt="lottery" />
		</div>
	);
};
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
			closeIcon={null}
			style={{
				boxShadow: 'none',
			}}
			styles={{
				header: { backgroundColor: '#D9D9D9' },
				content: {
					borderTopLeftRadius: '30px',
					borderTopRightRadius: '30px',
				},
				body: { backgroundColor: '#D9D9D9', paddingTop: '40px' },
				footer: { height: '40%' },
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
					<FloatButton onClick={() => setModal(true)} />
					<LotteryModal open={modal} onCancel={() => setModal(false)} />
				</APIProvider>
			}
		</div>
	);
}

export default HomePage;
