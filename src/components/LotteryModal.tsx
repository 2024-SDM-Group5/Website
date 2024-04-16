import React, { useEffect } from 'react';

import Image from 'next/image';

import { Button, Modal } from 'antd';

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
			styles={{
				body: { textAlign: 'center', justifyContent: 'center' },
				content: { backgroundColor: '#FDFBF4', borderRadius: 20 },
			}}
		>
			{restaurantID === null ? (
				<>
					<p style={{ paddingTop: '80px', paddingBottom: '50px', fontSize: '20px' }}>
						想不到要吃什麼嗎？
					</p>
					<Button
						onClick={() => setID('1234')}
						style={{
							color: '#000000',
							backgroundColor: '#ffcc84',
							width: '60vw',
							height: '10vw',
							marginBottom: '15px',
						}}
					>
						隨機推薦
					</Button>
					<br />
					<Button
						onClick={() => setID('1234')}
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
							<Image src={'/images/food2.jpg'} alt={''} width={86} height={86} />
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
							color: '#000000',
							backgroundColor: '#ffcc84',
							width: '60vw',
							height: '10vw',

							marginBottom: '15px',
						}}
					>
						詳細資訊
					</Button>
					<br />
					<Button
						onClick={() => setID('1234')}
						style={{
							color: '#000000',
							backgroundColor: '#f7a072',
							width: '60vw',
							height: '10vw',
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
export default LotteryModal;
