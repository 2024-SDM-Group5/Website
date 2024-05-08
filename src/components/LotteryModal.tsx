import React, { useEffect, useState } from 'react';

import { Button, Modal, Input, message } from 'antd';
import axios from 'axios';

function LotteryModal({ open, onCancel }: { open: boolean; onCancel: Function }) {
	const [suggestion, setSuggestion] = useState<string | null>(null);
	const [foodType, setFoodType] = useState<string>('');
	const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

	useEffect(() => {
		if (!open) {
			setSuggestion(null);
			setPosition(null);
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

	const handleRecommendation = async () => {
		if (position) {
			console.log(position);
			console.log(foodType);
			try {
				const response = await axios.post(
					'https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/bots/question',
					{
						req: foodType,
						position,
					},
				);
				console.log(response.data);
				setSuggestion(response.data.res);
			} catch (error) {
				message.error('推薦請求失敗');
				console.error('Error posting the food type:', error);
			}
		} else {
			message.error('正在獲取位置信息，請稍後再試');
		}
	};

	return (
		<Modal
			open={open}
			onCancel={onCancel as (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void}
			footer={null}
			centered={true}
			width="80vw"
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
				<p style={{ padding: '20px', fontSize: '20px' }}>{suggestion}</p>
			)}
		</Modal>
	);
}
export default LotteryModal;
