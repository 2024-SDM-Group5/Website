import React, { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

import { Button, Modal, Input, message } from 'antd';

import axios from '@/lib/axios';

import type { Restaurant } from './RestaurantDrawer';

function LotteryModal({ open, onCancel }: { open: boolean; onCancel: Function }) {
	const [suggestion, setSuggestion] = useState<string | null>(null);
	const [foodType, setFoodType] = useState<string>('');
	const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
	const [restaurantId, setRestaurantId] = useState<string | null>(null);
	const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
	const session = useSession();

	const handleRecommendation = async () => {
		if (position) {
			console.log(position);
			console.log(foodType);
			try {
				const response = await axios.post(
					'/api/v1/bots/question',
					{
						req: foodType,
						position,
					},
					{
						headers: { Authorization: `Bearer ${session.data?.idToken}` },
					},
				);
				console.log(response.data);
				setSuggestion(response.data.res);
				setRestaurantId(response.data.placeId);
			} catch (error) {
				message.error('推薦請求失敗');
				console.error('Error posting the food type:', error);
			}
		} else {
			message.error('正在獲取位置信息，請稍後再試');
		}
	};
	useEffect(() => {
		if (!open) {
			setSuggestion(null);
			setPosition(null);
			setRestaurantId(null);
			setRestaurant(null);
		} else {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
				},
				() => {
					message.error('無法獲取位置信息');
				},
			);
		}
	}, [open]);
	useEffect(() => {
		const fetchRestaurant = async () => {
			const res = await axios.get(`/api/v1/restaurants/${restaurantId}`, {
				headers: { Authorization: `Bearer ${session.data?.idToken}` },
			});
			setRestaurant(res?.data);
		};
		if (restaurantId) {
			fetchRestaurant();
		}
	}, [restaurantId]);
	return (
		<Modal
			open={open}
			onCancel={onCancel as (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void}
			footer={null}
			centered={true}
			width="90vw"
			styles={{
				body: { textAlign: 'center', justifyContent: 'center' },
				content: { backgroundColor: '#FDFBF4', borderRadius: 20 },
			}}
		>
			{suggestion === null ? (
				<>
					<Input
						size="large"
						type="text"
						placeholder="想吃甚麼類型的食物？"
						onChange={(e) => setFoodType(e.target.value)}
						style={{ marginTop: '45px', marginBottom: '20px', width: '60vw' }}
					/>
					<Button
						onClick={handleRecommendation}
						style={{
							color: '#000000',
							backgroundColor: '#f7a072',
							width: '60vw',
							height: '10vw',
							marginBottom: '45px',
						}}
					>
						智慧推薦
					</Button>
				</>
			) : (
				<>
					<br />
					<div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
						{restaurant && (
							<Image
								src={
									`https://maps.googleapis.com/maps/api/place/photo?maxheight=105&photo_reference=${restaurant?.photoUrl}&key=${process.env.NEXT_PUBLIC_MAP_API_KEY}` ||
									'/images/1.jpg'
								}
								alt={restaurant?.name + '_icon'}
								height={105}
								width={105}
							/>
						)}
						<div
							style={{
								fontWeight: 500,
								lineHeight: 2,
								textAlign: 'left',
								marginLeft: '10px',
							}}
						>
							<div style={{ display: 'inline' }}>{restaurant?.name}</div>
							<br />
							<div style={{ display: 'inline' }}>{restaurant?.address}</div>
							<br />
							<div style={{ display: 'inline' }}>{restaurant?.telephone}</div>
							<br />
						</div>
					</div>
					<p
						style={{
							marginTop: '5px',
							padding: '10px',
							fontSize: '16px',
							textAlign: 'left',
						}}
					>
						{suggestion}
					</p>
					{restaurant && (
						<Link
							style={{
								color: '#000000',
								backgroundColor: '#ffcc84',
								width: '60vw',
								height: '10vw',

								marginBottom: '15px',
							}}
							href={`https://www.google.com/maps/search/?api=1&query=qqq&query_place_id=${restaurant?.placeId}`}
						>
							詳細資訊
						</Link>
					)}
				</>
			)}
		</Modal>
	);
}
export default LotteryModal;
