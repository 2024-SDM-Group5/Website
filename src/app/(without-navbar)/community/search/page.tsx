'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import { ChevronLeftIcon } from '@radix-ui/react-icons';
import axios from 'axios';

import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockDiary: Diary[] = [
	{
		id: 1,
		imageUrl: '',
	},
	{
		id: 2,
		imageUrl: '',
	},
	{
		id: 3,
		imageUrl: '',
	},
	{
		id: 4,
		imageUrl: '',
	},
	{
		id: 5,
		imageUrl: '',
	},
	{
		id: 6,
		imageUrl: '',
	},
	{
		id: 7,
		imageUrl: '',
	},
	{
		id: 8,
		imageUrl: '',
	},
	{
		id: 9,
		imageUrl: '',
	},
	{
		id: 10,
		imageUrl: '',
	},
	{
		id: 11,
		imageUrl: '',
	},
	{
		id: 12,
		imageUrl: '',
	},
	{
		id: 13,
		imageUrl: '',
	},
	{
		id: 14,
		imageUrl: '',
	},
	{
		id: 15,
		imageUrl: '',
	},
];
interface Diary {
	id: number;
	imageUrl: string;
}

export default function Page() {
	const [userDiaries, setUserDiaries] = useState<Diary[]>([]);
	const params = useParams<{ id: string }>();
	useEffect(() => {
		const fetchUserDiaries = async () => {
			try {
				// const response = await axios.get<UserDiariesResponse>(`/api/v1/users/${params.id}/diaries`);
				// setUserDiaries(response.data.diaries);
				setUserDiaries(mockDiary);
			} catch (error) {
				if (axios.isAxiosError(error) && error.response) {
					console.error(`Error fetching diaries: ${error.response.status}`);
				} else {
					console.error('Failed to fetch user diaries:', error);
				}
			}
		};

		fetchUserDiaries();
	}, [params.id]);
	return (
		<div className="flex w-full flex-1 flex-col">
			<div className="flex items-center space-x-2">
				<ChevronLeftIcon className="h-5 w-5 cursor-pointer" />
				<Input placeholder="Search..." />
			</div>

			<Tabs defaultValue="diary" className="w-full">
				<TabsList className="w-full rounded-none bg-transparent p-0">
					<TabsTrigger
						value="diary"
						className="text-muted-foreground relative flex-1 rounded-none border-b-2 border-b-transparent bg-transparent pb-3 pt-2 font-semibold shadow-none transition-none focus-visible:ring-0"
					>
						日記
					</TabsTrigger>
					<TabsTrigger
						value="account"
						className="text-muted-foreground relative flex-1 rounded-none border-b-2 border-b-transparent bg-transparent pb-3 pt-2 font-semibold shadow-none transition-none focus-visible:ring-0"
					>
						帳號
					</TabsTrigger>
					<TabsTrigger
						value="tags"
						className="text-muted-foreground relative flex-1 rounded-none border-b-2 border-b-transparent bg-transparent pb-3 pt-2 font-semibold shadow-none transition-none focus-visible:ring-0"
					>
						標籤
					</TabsTrigger>
				</TabsList>

				<TabsContent value="diary">
					<div className="flex w-full flex-1 flex-col">
						<Separator className="m-1" />
						<div className="flex w-full flex-1 overflow-auto">
							<div className="grid min-h-min w-full grid-cols-3 gap-1 bg-white">
								{userDiaries.map((diary) => (
									<div key={diary.id} className="relative ">
										<Image
											// src={diary.imageUrl}
											src=""
											alt={`Diary ${diary.id}`}
											width={500}
											height={500}
											// fill={true}
											layout="responsive"
											className="rounded-md bg-[#D9D9D9] "
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="account"></TabsContent>

				<TabsContent value="tags">
					<div className="flex w-full flex-1 flex-col">
						<Separator className="m-1" />
						<div className="flex w-full flex-1 overflow-auto">
							<div className="grid min-h-min w-full grid-cols-3 gap-1 bg-white">
								{userDiaries.map((diary) => (
									<div key={diary.id} className="relative ">
										<Image
											// src={diary.imageUrl}
											src=""
											alt={`Diary ${diary.id}`}
											width={500}
											height={500}
											// fill={true}
											layout="responsive"
											className="rounded-md bg-[#D9D9D9] "
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
