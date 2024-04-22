'use client';

import React, { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import { SearchOutlined } from '@ant-design/icons';
import { CheckIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import { Input, message } from 'antd';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

interface Map {
	id: number;
	name: string;
	iconUrl: string;
	author: string;
	viewCount: number;
	collectCount: number;
	hasCollected: boolean;
}
function MapOverview() {
	const [sort, setSort] = useState('collectCount');
	const [search, setSearch] = useState('');
	const [data, setData] = useState<Array<Map>>([]);
	const [messageApi, contextHolder] = message.useMessage();
	const session = useSession();
	useEffect(() => {
		const FetchData = async () => {
			try {
				let suffix = '';
				if (search) suffix = `&q=${search}`;
				let res = await axios.get(
					`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/maps?orderBy=${sort}` +
						suffix,
				);
				setData(res?.data.maps);
			} catch (error) {
				console.error('Failed to fetch data:', error);
			}
		};
		FetchData();
	}, [sort, search]);
	return (
		<div className="mb-1 mt-1 h-[calc(100vh-148px)] w-screen">
			{contextHolder}
			<div className="m-4 flex justify-start pt-4">
				<div className="inline-block w-1/4">
					<Select.Root defaultValue="collectCount" onValueChange={(v) => setSort(v)}>
						<Select.Trigger className="rounded-md border border-gray-300 bg-white px-3 py-2 text-black">
							<Select.Value placeholder="收藏排行" />
						</Select.Trigger>
						<Select.Portal>
							<Select.Content className="SelectContent">
								<Select.Viewport className="SelectViewport">
									<Select.Item value="collectCount" className="SelectItem">
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

			<div className="max-h-[calc(100vh-219px)] overflow-auto">
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
								<div className="block text-gray-500 ">
									{x.collectCount + '收藏'}
								</div>
								<div className="block text-gray-500">{x.viewCount + '瀏覽'}</div>
							</div>
							<div>
								{x.hasCollected ? (
									<Button
										className="h-15 bg-[#f7a072] text-black"
										onClick={async (e) => {
											const res = await axios.delete(
												`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/maps/${x.id}/collect`,
												{
													headers: {
														Authorization: `Bearer ${session.data?.idToken}`,
													},
												},
											);
											if (res?.data.success) {
												data[i].hasCollected = false;
												setData(Array.from(data));
												messageApi.success('解除收藏成功');
											}
										}}
									>
										解除
										<br />
										收藏
									</Button>
								) : (
									<Button
										className="bg-[#ffcc84] text-black"
										onClick={async (e) => {
											const res = await axios.post(
												`https://mainserver-fdhzgisj6a-de.a.run.app/api/v1/maps/${x.id}/collect`,
												{
													headers: {
														Authorization: `Bearer ${session.data?.idToken}`,
													},
												},
											);
											if (res?.data.success) {
												data[i].hasCollected = true;
												setData(Array.from(data));
												messageApi.success('收藏成功');
											}
										}}
									>
										收藏
									</Button>
								)}
							</div>
						</CardContent>
					</Card>
				))}
			</div>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href="#" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink isActive href="#">1</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
					<PaginationItem>
						<PaginationNext href="#" />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}

export default MapOverview;
