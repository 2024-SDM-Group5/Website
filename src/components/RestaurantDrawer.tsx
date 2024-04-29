'use client';

import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { Drawer, Button, Table, message } from 'antd';
import axios from 'axios';

import { NewDiaryDialog } from '@/components/NewDiaryDialog';

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
	favCount: number;
	diaries: Array<{ id: number; imageUrl: string }>;
	hasCollected: boolean;
	hasLiked: boolean;
	hasDisliked: boolean;
	collectCount: number;
	likeCount: number;
	dislikeCount: number;
	photos: Array<string>;
}
function RestaurantDrawer({
	show,
	setShow,
	newDiary,
}: {
	show: string | null;
	setShow: React.Dispatch<string | null>;
	newDiary: boolean;
}) {
	const session = useSession();
	const [messageApi, contextHolder] = message.useMessage();
	const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
	const [tableContent, setTableContent] = useState<
		Array<{ key: string; image: string; date: string; items: string; content: string }>
	>([]);
	useEffect(() => {
		const FetchRestaurant = async () => {
			let diaries = [];
			const res = await axios.get(
				`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/restaurants/${show}`,
				{
					headers: { Authorization: `Bearer ${session.data?.idToken}` },
				},
			);
			setRestaurant(res?.data);
			for (let i = 0; i < res.data.diaries.length; i++) {
				const tmp = await axios.get(
					`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/diaries/${res.data.diaries[i].id}`,
				);
				diaries.push({
					key: `${i}`,
					image: tmp.data.photos[0],
					date: tmp.data.createdAt,
					items: tmp.data.items,
					content: tmp.data.content,
				});
			}
			setTableContent(diaries);
		};
		if (show !== null) {
			FetchRestaurant();
		}
	}, [show]);
	return (
		<Drawer
			mask={false}
			placement="bottom"
			open={show !== null}
			rootStyle={{
				marginBottom: '52px',
			}}
			closeIcon={null}
			style={{
				boxShadow: 'none',
			}}
			height="35%"
			styles={{
				header: { backgroundColor: '#ffcc84' },
				content: {
					borderTopLeftRadius: '30px',
					borderTopRightRadius: '30px',
				},
				body: {
					backgroundColor: '#FBF7E9',
					paddingTop: '40px',
					minHeight: '85%',
					height: 'auto',
					overflow: 'hidden',
				},
			}}
			footer={
				<Table
					dataSource={tableContent}
					columns={[
						{
							title: '',
							dataIndex: 'image',
							key: 'image',
							render: (text) => (
								<Image src={text} alt={text} width={80} height={80} />
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
			{restaurant && (
				<div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
					{contextHolder}
					<div style={{ width: '174px', paddingLeft: '20px' }}>
						<img
							src={`https://maps.googleapis.com/maps/api/place/photo?photo_reference=${restaurant.photos[0]}&maxwidth=105&key=${process.env.NEXT_PUBLIC_MAP_API_KEY}`}
							alt={restaurant.name + '_icon'}
							width={105}
							height={105}
						/>
						<div className="flex w-[105px] flex-row justify-center pt-[15px]">
							{restaurant.hasLiked ? (
								<div
									className="mr-[30px] flex h-[35px] w-[35px] flex-row items-center justify-center rounded-full border-2 border-solid border-blue-500"
									onClick={async (e) => {
										const res = await axios.delete(
											`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/restaurants/${restaurant.placeId}/like`,
											{
												headers: {
													Authorization: `Bearer ${session.data?.idToken}`,
												},
											},
										);
										if (res?.data.success) {
											restaurant.hasLiked = false;
											setRestaurant(Object.assign({}, restaurant));
										}
									}}
								>
									<LikeOutlined
										className="mb-[3px] ml-[2px] text-blue-500"
										style={{ fontSize: '24px' }}
									/>
								</div>
							) : (
								<div
									onClick={async (e) => {
										const res = await axios.post(
											`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/restaurants/${restaurant.placeId}/like`,
											{},
											{
												headers: {
													Authorization: `Bearer ${session.data?.idToken}`,
												},
											},
										);
										if (res?.data.success) {
											restaurant.hasLiked = true;
											restaurant.hasDisliked = false;
											setRestaurant(Object.assign({}, restaurant));
										}
									}}
									className="mr-[30px] flex h-[35px] w-[35px] flex-row items-center justify-center rounded-full border-2 border-solid border-gray-300"
								>
									<LikeOutlined
										className="mb-[3px] ml-[2px] text-gray-300"
										style={{ fontSize: '24px' }}
									/>
								</div>
							)}
							{restaurant.hasDisliked ? (
								<div
									className="flex h-[35px] w-[35px] flex-row items-center justify-center rounded-full border-2 border-solid border-red-600"
									onClick={async (e) => {
										const res = await axios.delete(
											`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/restaurants/${restaurant.placeId}/dislike`,
											{
												headers: {
													Authorization: `Bearer ${session.data?.idToken}`,
												},
											},
										);
										if (res?.data.success) {
											restaurant.hasDisliked = false;
											setRestaurant(Object.assign({}, restaurant));
										}
									}}
								>
									<DislikeOutlined
										className="mt-[3px] text-red-600"
										style={{ fontSize: '24px' }}
									/>
								</div>
							) : (
								<div
									className="flex h-[35px] w-[35px] flex-row items-center justify-center rounded-full border-2 border-solid border-gray-300"
									onClick={async (e) => {
										const res = await axios.post(
											`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/restaurants/${restaurant.placeId}/dislike`,
											{},
											{
												headers: {
													Authorization: `Bearer ${session.data?.idToken}`,
												},
											},
										);
										if (res?.data.success) {
											restaurant.hasDisliked = true;
											restaurant.hasLiked = false;
											setRestaurant(Object.assign({}, restaurant));
										}
									}}
								>
									<DislikeOutlined
										className="mt-[3px] text-gray-300"
										style={{ fontSize: '24px' }}
									/>
								</div>
							)}
						</div>
					</div>
					<div style={{ width: 'calc(100% - 174px)', fontWeight: 500, lineHeight: 2 }}>
						<div style={{ display: 'inline' }}>{restaurant?.name}</div>
						<br />
						<div style={{ display: 'inline' }}>{restaurant?.address}</div>
						<br />
						<div style={{ display: 'inline' }}>{restaurant?.telephone}</div>
						<br />
						<div style={{ display: 'inline' }}>
							{restaurant?.hasCollected ? (
								<Button
									size="large"
									style={{
										color: '#000000',
										backgroundColor: '#EDDEA4',
										marginRight: 4,
									}}
									onClick={async (e) => {
										const res = await axios.delete(
											`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/restaurants/${restaurant.placeId}/collect`,
											{
												headers: {
													Authorization: `Bearer ${session.data?.idToken}`,
												},
											},
										);
										if (res?.data.success) {
											restaurant.hasCollected = false;
											setRestaurant(Object.assign({}, restaurant));
											messageApi.success('解除收藏成功');
										}
									}}
								>
									已收藏
								</Button>
							) : (
								<Button
									size="large"
									style={{
										color: '#000000',
										backgroundColor: '#EDDEA4',
										marginRight: 4,
									}}
									onClick={async (e) => {
										const res = await axios.post(
											`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/restaurants/${restaurant.placeId}/collect`,
											{},
											{
												headers: {
													Authorization: `Bearer ${session.data?.idToken}`,
												},
											},
										);
										if (res?.data.success) {
											restaurant.hasCollected = true;
											setRestaurant(Object.assign({}, restaurant));
											messageApi.success('收藏成功');
										}
									}}
								>
									收藏
								</Button>
							)}
							{newDiary && (
								<NewDiaryDialog
									idToken=""
									close={() => setShow(null)}
									restaurantId={restaurant.placeId}
									restaurantName={restaurant.name}
								/>
							)}
						</div>
					</div>
				</div>
			)}
		</Drawer>
	);
}
export default RestaurantDrawer;
