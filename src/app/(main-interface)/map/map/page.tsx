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
		iconUrl: '/images/food3.jpg',
		author: 'Amy',
		viewCount: 375,
		favCount: 375,
	},
	{
		id: 0,
		name: '地圖名稱',
		iconUrl: '/images/food3.jpg',
		author: 'Amy',
		viewCount: 375,
		favCount: 375,
	},
	{
		id: 0,
		name: '地圖名稱',
		iconUrl: '/images/food3.jpg',
		author: 'Amy',
		viewCount: 375,
		favCount: 375,
	},
	{
		id: 0,
		name: '地圖名稱',
		iconUrl: '/images/food3.jpg',
		author: 'Amy',
		viewCount: 375,
		favCount: 375,
	},
	{
		id: 0,
		name: '地圖名稱',
		iconUrl: '/images/food3.jpg',
		author: 'Amy',
		viewCount: 375,
		favCount: 375,
	},
	{
		id: 0,
		name: '地圖名稱',
		iconUrl: '/images/food3.jpg',
		author: 'Amy',
		viewCount: 375,
		favCount: 375,
	},
	{
		id: 0,
		name: '地圖名稱',
		iconUrl: '/images/food3.jpg',
		author: 'Amy',
		viewCount: 375,
		favCount: 375,
	},
	{
		id: 0,
		name: '地圖名稱',
		iconUrl: '/images/food3.jpg',
		author: 'Amy',
		viewCount: 375,
		favCount: 375,
	},
	{
		id: 0,
		name: '地圖名稱',
		iconUrl: '/images/food3.jpg',
		author: 'Amy',
		viewCount: 375,
		favCount: 375,
	},
	{
		id: 0,
		name: '地圖名稱',
		iconUrl: '/images/food3.jpg',
		author: 'Amy',
		viewCount: 375,
		favCount: 375,
	},
	{
		id: 0,
		name: '地圖名稱',
		iconUrl: '/images/food3.jpg',
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
			<div className="m-4 flex justify-start pt-4">
				<div className="inline-block w-1/4">
					<Select.Root>
						<Select.Trigger className="rounded-md border border-gray-300 bg-white px-3 py-2 text-black">
							<Select.Value placeholder="收藏排行" />
						</Select.Trigger>
					</Select.Root>
				</div>
				<div className="inline-block w-3/4">
					<Input
						prefix={<SearchOutlined />}
						className="h-full rounded-md border-gray-300"
					/>
				</div>
			</div>

			<div style={{ overflow: 'scroll', height: 'calc(100vh - 183px)' }}>
				{data.map((x, i) => {
					return (
						<Card
							key={i}
							className="mb-4 ml-2.5 mr-2.5 h-24 overflow-hidden rounded-lg bg-white p-4 shadow-md"
						>
							<CardContent className="flex h-full items-center p-0">
								<div className="mr-4 w-1/6">
									<Image
										src={x.iconUrl}
										alt={`${x.name}_icon`}
										height={80}
										width={80}
									/>
								</div>
								<div className="w-1/2">
									<div className="block w-full">{x.name}</div>
									<div className="block text-gray-400">{'@' + x.author}</div>
								</div>
								<div className="mr-4 w-1/5">
									<div className="block text-gray-500 ">
										{x.favCount + '收藏'}
									</div>
									<div className="block text-gray-500">
										{x.viewCount + '瀏覽'}
									</div>
								</div>
								<div>
									<Button className="bg-[#ffcc84] text-black ">收藏</Button>
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
