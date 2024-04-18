'use client';

import { useEffect } from 'react';

import Image from 'next/image';

import { Drawer, Button, Table } from 'antd';

import { NewDiaryDialog } from '@/components/NewDiaryDialog';

const RestaurantDrawer = ({
	show,
	setShow,
	newDiary,
}: {
	show: string | null;
	setShow: React.Dispatch<string | null>;
	newDiary: boolean;
}) => {
	return (
		<Drawer
			mask={false}
			placement="bottom"
			open={show !== null}
			height="35%"
			rootStyle={{
				marginBottom: '52px',
			}}
			closeIcon={null}
			style={{
				boxShadow: 'none',
			}}
			styles={{
				header: { backgroundColor: '#ffcc84' },
				content: {
					borderTopLeftRadius: '30px',
					borderTopRightRadius: '30px',
				},
				body: { backgroundColor: '#FBF7E9', paddingTop: '40px' },
				footer: { height: '40%' },
			}}
			footer={
				<Table
					dataSource={[
						{
							key: '1',
							image: '/website/images/food2.jpg',
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
			<div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
				<div style={{ width: '174px', paddingLeft: '20px' }}>
					<Image
						src={'/website/images/food3.jpg'}
						alt={show + ''}
						width={105}
						height={105}
					/>
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
							style={{ color: '#000000', backgroundColor: '#EDDEA4', marginRight: 4 }}
						>
							已收藏
						</Button>
						{newDiary && <NewDiaryDialog idToken="" close={() => setShow(null)} />}
					</div>
				</div>
			</div>
		</Drawer>
	);
};
export default RestaurantDrawer;
