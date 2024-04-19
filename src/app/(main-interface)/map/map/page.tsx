'use client';

import React, { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

import { SearchOutlined } from '@ant-design/icons';
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import { Input } from 'antd';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Map {
	id: number;
	name: string;
	iconUrl: string;
	author: string;
	viewCount: number;
	favCount: number;
}
function MapOverview() {
	const [sort, setSort] = useState('favCount');
	const [search, setSearch] = useState('');
	const [data, setData] = useState<Array<Map>>([]);
	useEffect(() => {
		const FetchData = async () => {
			try {
				let res = await axios.get(
					`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/maps?orderBy=${sort}`,
				);
				setData(res?.data);
			} catch (error) {
				console.error('Failed to fetch data:', error);
			}
		};
		FetchData();
	}, [sort]);
	return (
		<div className="mb-1 mt-1 h-[calc(100vh-148px)] w-screen">
			<div className="m-4 flex justify-start pt-4">
				<div className="inline-block w-1/4">
					<Select.Root defaultValue="favCount" onValueChange={(v) => setSort(v)}>
						<Select.Trigger className="rounded-md border border-gray-300 bg-white px-3 py-2 text-black">
							<Select.Value placeholder="收藏排行" />
						</Select.Trigger>
						<Select.Portal>
							<Select.Content className="SelectContent">
								<Select.Viewport className="SelectViewport">
									<Select.Item value="favCount" className="SelectItem">
										<Select.ItemText>按收藏排</Select.ItemText>
										<Select.ItemIndicator className="SelectItemIndicator">
											<CheckIcon />
										</Select.ItemIndicator>
									</Select.Item>
									<Select.Item value="createTime" className="SelectItem">
										<Select.ItemText>按日期排</Select.ItemText>
										<Select.ItemIndicator className="SelectItemIndicator">
											<CheckIcon />
										</Select.ItemIndicator>
									</Select.Item>
								</Select.Viewport>
							</Select.Content>
						</Select.Portal>
					</Select.Root>
				</div>
				<div className="inline-block w-3/4">
					<Input
						prefix={<SearchOutlined />}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						className="h-full w-full rounded-md border-gray-300"
					/>
				</div>
			</div>

			<div className="h-[calc(100vh-183px)] overflow-auto">
				{data.map((x, i) => (
					<Card
						key={i}
						className="mx-2.5 mb-4 h-24 overflow-hidden rounded-lg bg-white p-4 shadow-md"
					>
						<CardContent className="flex h-full items-center p-0">
							<div className="mr-4 w-1/6">
								<img
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
								<div className="block text-gray-500 ">{x.favCount + '收藏'}</div>
								<div className="block text-gray-500">{x.viewCount + '瀏覽'}</div>
							</div>
							<div>
								<Button className="bg-[#ffcc84] text-black ">收藏</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}

export default MapOverview;
