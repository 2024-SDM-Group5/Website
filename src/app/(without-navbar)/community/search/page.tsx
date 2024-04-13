'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { ChevronLeftIcon } from '@radix-ui/react-icons';
import axios from 'axios';

import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockDiary: Diary[] = [
	{
		id: 1,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 2,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 3,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 4,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 5,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 6,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 7,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 8,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 9,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 10,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 11,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 12,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 13,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 14,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 15,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 16,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 17,
		imageUrl: '/images/1.jpg',
	},
	{
		id: 18,
		imageUrl: '/images/1.jpg',
	},
];
interface Diary {
	id: number;
	imageUrl: string;
}

interface User {
	id: number;
	imageUrl: string;
	userName: string;
}

const mockUserList: User[] = [
	{
		id: 1,
		imageUrl: '/images/1.jpg',
		userName: 'John',
	},
	{
		id: 2,
		imageUrl: '/images/1.jpg',
		userName: 'John',
	},
	{
		id: 3,
		imageUrl: '/images/1.jpg',
		userName: 'John',
	},
	{
		id: 4,
		imageUrl: '/images/1.jpg',
		userName: 'John',
	},
	{
		id: 5,
		imageUrl: '/images/1.jpg',
		userName: 'John',
	},
	{
		id: 6,
		imageUrl: '/images/1.jpg',
		userName: 'John',
	},
];
export default function Page() {
	const [userDiaries, setUserDiaries] = useState<Diary[]>([]);
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const handleBackClick = () => {
		router.push('/community/overview');
	};
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
				<ChevronLeftIcon className="h-5 w-5 cursor-pointer" onClick={handleBackClick} />
				<Input placeholder="Search..." />
			</div>

			<Tabs defaultValue="diary" className="w-full ">
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
					<div className="flex w-full flex-1 flex-col ">
						<Separator className="m-1" />
						<div className="flex w-full flex-1 overflow-auto">
							<div className="grid min-h-min w-full grid-cols-3 gap-1 bg-white ">
								{userDiaries.map((diary) => (
									<div key={diary.id} className="relative ">
										<Image
											src={diary.imageUrl}
											// src=""
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
				<TabsContent value="user">
					<div className="flex w-full flex-1 flex-col">
						<Separator className="m-1" />
						<div className="flex w-full flex-1 overflow-auto">
							<div className="grid min-h-min w-full grid-cols-3 gap-1 bg-white">
								{userDiaries.map((diary) => (
									<div key={diary.id} className="relative ">
										<Image
											src={diary.imageUrl}
											// src=""
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
				<TabsContent value="account">
					<div className="m-8 flex h-full flex-col">
						{/* <Separator className="m-1" /> */}
						{mockUserList.map((user) => (
							<div key={user.id} className="mt-4 flex items-center ">
								<Image
									src={user.imageUrl}
									alt={`User ${user.id}`}
									width={50}
									height={50}
									className="rounded-full"
								/>
								<p className="ml-2">{user.userName}</p>
							</div>
						))}
					</div>
				</TabsContent>

				<TabsContent value="tags">
					<div className="flex w-full flex-1 flex-col">
						<Separator className="m-1" />
						<div className="flex w-full flex-1 overflow-auto">
							<div className="grid min-h-min w-full grid-cols-3 gap-1 bg-white">
								{userDiaries.map((diary) => (
									<div key={diary.id} className="relative ">
										<Image
											src={diary.imageUrl}
											// src=""
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
