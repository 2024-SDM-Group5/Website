'use client';

import React from 'react';

import Image from 'next/image';

import { SearchOutlined } from '@ant-design/icons';
import * as Select from '@radix-ui/react-select';
import { Input } from 'antd';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const data = [
	{
		id: 0,
		name: '地圖名稱',
		iconUrl: '',
		author: 'Amy',
		viewCount: 375,
		favCount: 375,
	},
	{
		id: 0,
		name: '地圖名稱',
		iconUrl: '',
		author: 'Amy',
		viewCount: 375,
		favCount: 375,
	},
	{
		id: 0,
		name: '地圖名稱',
		iconUrl: '',
		author: 'Amy',
		viewCount: 375,
		favCount: 375,
	},
	{
		id: 0,
		name: '地圖名稱',
		iconUrl: '',
		author: 'Amy',
		viewCount: 375,
		favCount: 375,
	},
	{
		id: 0,
		name: '地圖名稱',
		iconUrl: '',
		author: 'Amy',
		viewCount: 375,
		favCount: 375,
	},
	{
		id: 0,
		name: '地圖名稱',
		iconUrl: '',
		author: 'Amy',
		viewCount: 375,
		favCount: 375,
	},
	{
		id: 0,
		name: '地圖名稱',
		iconUrl: '',
		author: 'Amy',
		viewCount: 375,
		favCount: 375,
	},
	{
		id: 0,
		name: '地圖名稱',
		iconUrl: '',
		author: 'Amy',
		viewCount: 375,
		favCount: 375,
	},
	{
		id: 0,
		name: '地圖名稱',
		iconUrl: '',
		author: 'Amy',
		viewCount: 375,
		favCount: 375,
	},
	{
		id: 0,
		name: '地圖名稱',
		iconUrl: '',
		author: 'Amy',
		viewCount: 375,
		favCount: 375,
	},
	{
		id: 0,
		name: '地圖名稱',
		iconUrl: '',
		author: 'Amy',
		viewCount: 375,
		favCount: 375,
	},
];
function HomePage() {
	return (
		<div
			style={{
				width: '100vw',
				height: 'calc(100vh - 148px)',
				marginTop: '4px',
				marginBottom: '4px',
			}}
		>
			<div style={{ flexDirection: 'row', justifyContent: 'start' }}>
				<div
					style={{
						flexDirection: 'column',
						width: '25%',
						display: 'inline-block',
						paddingLeft: '10px',
					}}
				>
					<Select.Root>
						<Select.Trigger className="SelectTrigger">
							<Select.Value placeholder="收藏排行" />
						</Select.Trigger>
					</Select.Root>
				</div>
				<div style={{ flexDirection: 'column', width: '70%', display: 'inline-block' }}>
					<Input prefix={<SearchOutlined />} />
				</div>
			</div>
			<div style={{ overflow: 'scroll', height: 'calc(100vh - 183px)' }}>
				{data.map((x, i) => {
					return (
						<Card
							key={i}
							style={{
								marginBottom: '25px',
								marginLeft: '10px',
								marginRight: '10px',
								height: '100px',
							}}
						>
							<CardContent
								style={{
									height: '100%',
									alignItems: 'center',
									display: 'flex',
									paddingBottom: 0,
								}}
							>
								<div style={{ width: '17%' }}>
									<Image
										src={x.iconUrl}
										alt={x.name + '_icon'}
										height={50}
										width={50}
									/>
								</div>
								<div style={{ width: '50%' }}>
									<div style={{ display: 'inline-block', width: '100%' }}>
										{x.name}
									</div>
									<div style={{ display: 'inline', color: '#aaaaaa' }}>
										{'@' + x.author}
									</div>
								</div>
								<div style={{ width: '20%' }}>
									<div style={{ display: 'inline', color: '#888888' }}>
										{x.favCount + '收藏'}
									</div>
									<div style={{ display: 'inline', color: '#888888' }}>
										{x.viewCount + '瀏覽'}
									</div>
								</div>
								<div>
									<Button>收藏</Button>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}

export default HomePage;
